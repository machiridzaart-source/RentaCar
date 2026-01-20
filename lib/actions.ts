'use server'

import { prisma } from './db'

export type CarWithFeatures = {
    id: number
    name: string
    category: string
    image: string
    price: number
    seats: number
    transmission: string
    fuel: string
    rating: number
    reviews: number
    features: string[]
}

export async function getCars(searchParams?: {
    pickupDate?: string
    returnDate?: string
}): Promise<CarWithFeatures[]> {
    const { pickupDate, returnDate } = searchParams || {}

    // If dates are provided, find cars that are NOT available
    let unavailableCarIds: number[] = []

    if (pickupDate && returnDate) {
        const start = new Date(pickupDate)
        const end = new Date(returnDate)

        const conflictingReservations = await prisma.reservation.findMany({
            where: {
                OR: [
                    // Reservation starts within the search range
                    {
                        pickupDate: { gte: start, lte: end }
                    },
                    // Reservation ends within the search range
                    {
                        returnDate: { gte: start, lte: end }
                    },
                    // Reservation spans the entire search range
                    {
                        AND: [
                            { pickupDate: { lte: start } },
                            { returnDate: { gte: end } }
                        ]
                    }
                ],
                status: {
                    not: "cancelled" // Ignore cancelled reservations
                }
            },
            select: {
                carId: true
            }
        })

        unavailableCarIds = conflictingReservations.map(r => r.carId)
    }

    const cars = await prisma.car.findMany({
        where: {
            id: {
                notIn: unavailableCarIds
            }
        }
    })

    return cars.map((car) => ({
        ...car,
        features: JSON.parse(car.features),
    }))
}

import { getSession } from './auth'

export type ReservationInput = {
    carId: number
    pickupDate: Date
    returnDate: Date
    pickupLocation: string
    extras: string[]
    totalPrice: number
}

export async function createReservation(data: ReservationInput) {
    const session = await getSession()
    if (!session?.userId) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({ where: { id: session.userId } })

    // If user is approved, status is 'upcoming', otherwise 'Pending Approval'
    const status = user?.status === 'APPROVED' ? 'upcoming' : 'Pending Approval'

    return await prisma.reservation.create({
        data: {
            ...data,
            userId: session?.userId, // Link to user if logged in
            extras: JSON.stringify(data.extras),
            status: status,
        },
    })
}

export async function getReservations(userId?: string) {
    const where = userId ? { userId } : {}

    const reservations = await prisma.reservation.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            car: true
        }
    })

    return reservations.map(res => ({
        ...res,
        extras: JSON.parse(res.extras) as string[],
        status: res.status as "upcoming" | "active" | "completed" | "cancelled" | "Pending Approval"
    }))
}

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function confirmBookingPayment(reservationId: string) {
    await prisma.reservation.update({
        where: { id: reservationId },
        data: { status: 'upcoming' }
    })

    revalidatePath('/profile')
    redirect(`/booking/success/${reservationId}`)
}

export async function deleteReservation(reservationId: string) {
    const session = await getSession()
    if (!session?.userId) throw new Error('Unauthorized')

    const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId }
    })

    if (!reservation || reservation.userId !== session.userId) {
        throw new Error('Unauthorized')
    }

    await prisma.reservation.delete({
        where: { id: reservationId }
    })

    revalidatePath('/profile')
}

export async function upgradeToPremium() {
    const session = await getSession()
    if (!session?.userId) throw new Error('Unauthorized')

    await prisma.user.update({
        where: { id: session.userId },
        data: { isPremium: true }
    })

    revalidatePath('/profile')
    redirect('/profile')
}

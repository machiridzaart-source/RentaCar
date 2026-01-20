'use server'

import { getCurrentUser } from './auth'
import { prisma } from './db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function checkAdmin() {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }
}

export async function createCar(formData: FormData) {
    await checkAdmin()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const price = parseInt(formData.get('price') as string)
    const seats = parseInt(formData.get('seats') as string)
    const transmission = formData.get('transmission') as string
    const fuel = formData.get('fuel') as string
    const features = formData.get('features') as string
    // Retrieve image path or assume default for now - proper image upload for cars would be ideal
    // but user didn't explicitly ask for car image upload yet, just "add new cars".
    // I'll add an image URL field or basic text input for now.
    const image = formData.get('image') as string

    await prisma.car.create({
        data: {
            name,
            category,
            price,
            seats,
            transmission,
            fuel,
            rating: 5.0, // Default
            reviews: 0,
            features: features, // JSON string
            image: image || '/placeholder-car.jpg'
        }
    })

    revalidatePath('/cars')
    revalidatePath('/admin')
    redirect('/admin')
}

export async function updateCar(id: number, formData: FormData) {
    await checkAdmin()

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const price = parseInt(formData.get('price') as string)
    const seats = parseInt(formData.get('seats') as string)
    const transmission = formData.get('transmission') as string
    const fuel = formData.get('fuel') as string
    const features = formData.get('features') as string
    const image = formData.get('image') as string

    await prisma.car.update({
        where: { id },
        data: {
            name,
            category,
            price,
            seats,
            transmission,
            fuel,
            features,
            image
        }
    })

    revalidatePath('/cars')
    revalidatePath('/admin')
    redirect('/admin')
}

export async function deleteCar(id: number) {
    await checkAdmin()

    // First delete reservations to respect foreign key constraints if cascade isn't set?
    // Prisma schema has cascade? Let's check relation.
    // Schema: reservations Reservation[]
    // Relation in Reservation: car Car @relation(fields: [carId], references: [id])
    // No onDelete: Cascade specified. So we must delete reservations first or add cascade.
    // I'll manually delete reservations for safety.

    await prisma.reservation.deleteMany({
        where: { carId: id }
    })

    await prisma.car.delete({
        where: { id }
    })

    revalidatePath('/cars')
    revalidatePath('/admin')
}

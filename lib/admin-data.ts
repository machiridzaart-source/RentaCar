import { prisma } from './db'

export async function getAdminStats() {
    const [
        totalUsers,
        totalCars,
        reservations
    ] = await Promise.all([
        prisma.user.count(),
        prisma.car.count(),
        prisma.reservation.findMany({ select: { totalPrice: true, status: true } })
    ])

    const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)
    const activeBookings = reservations.filter(r => r.status !== 'cancelled' && r.status !== 'completed').length

    // Calculate growth (mock logic as we don't have historical snapshots easily without complex queries)
    // We'll just return static growth for now or calculate based on 'createdAt' if we wanted to be fancy.

    return {
        totalUsers,
        totalCars,
        totalRevenue,
        activeBookings
    }
}

export async function getUsersWithDetails() {
    return await prisma.user.findMany({
        where: {
            role: { not: 'ADMIN' } // Optionally exclude admins
        },
        include: {
            reservations: {
                where: {
                    status: { not: 'cancelled' },
                    returnDate: { gte: new Date() } // Only active/future
                },
                include: {
                    car: true
                },
                take: 1 // Just get the active one
            }
        },
        orderBy: { createdAt: 'desc' }
    })
}

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Car, Clock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function BookingSuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser()
    if (!user) redirect('/login')

    const { id } = await params

    const reservation = await prisma.reservation.findUnique({
        where: { id },
        include: { car: true }
    })

    if (!reservation || reservation.userId !== user.id) {
        return <div>Reservation not found or unauthorized.</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="max-w-md w-full shadow-lg border-none">
                <CardHeader className="text-center pb-2">
                    <div className={cn("mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full", reservation.status === 'Pending Approval' ? "bg-amber-100" : "bg-emerald-100")}>
                        {reservation.status === 'Pending Approval' ? (
                            <Clock className="h-8 w-8 text-amber-600" />
                        ) : (
                            <CheckCircle className="h-8 w-8 text-emerald-600" />
                        )}
                    </div>
                    <CardTitle className={cn("text-2xl font-bold", reservation.status === 'Pending Approval' ? "text-amber-900" : "text-emerald-900")}>
                        {reservation.status === 'Pending Approval' ? "Booking Received" : "Booking Confirmed!"}
                    </CardTitle>
                    <CardDescription>
                        {reservation.status === 'Pending Approval'
                            ? `Your reservation for ${reservation.car.name} is pending document approval.`
                            : `Your reservation for ${reservation.car.name} is complete.`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="rounded-xl border bg-white p-4 shadow-sm">
                        <div className="flex gap-4">
                            <div className="h-16 w-24 rounded-lg bg-gray-100 overflow-hidden">
                                <img src={reservation.car.image} alt={reservation.car.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{reservation.car.name}</h3>
                                <p className="text-sm text-gray-500">{reservation.car.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between border-b pb-3">
                            <span className="flex items-center gap-2 text-gray-500">
                                <Calendar className="h-4 w-4" /> Dates
                            </span>
                            <span className="font-medium">
                                {new Date(reservation.pickupDate).toLocaleDateString()} - {new Date(reservation.returnDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-3">
                            <span className="flex items-center gap-2 text-gray-500">
                                <MapPin className="h-4 w-4" /> Location
                            </span>
                            <span className="font-medium">{reservation.pickupLocation}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-lg">${reservation.totalPrice}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-2">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10 text-base" asChild>
                        <Link href="/profile">Go to My Profile</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/cars">Book Another Car</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

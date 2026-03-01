import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Lock, Calendar, MapPin } from "lucide-react"
import { confirmBookingPayment } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser()
    if (!user) redirect('/login')

    const { id } = await params

    // Fetch reservation
    const reservation = await prisma.reservation.findUnique({
        where: { id },
        include: { car: true }
    })

    if (!reservation || reservation.userId !== user.id) {
        return <div>Reservation not found or unauthorized.</div>
    }

    if (reservation.status !== 'Pending Approval') {
        return (
            <div className="container p-10 text-center">
                <h1 className="text-xl font-bold">Booking already processed</h1>
                <p>Status: {reservation.status}</p>
                <Button className="mt-4" asChild><a href="/profile">Back to Profile</a></Button>
            </div>
        )
    }

    const payAction = confirmBookingPayment.bind(null, reservation.id)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-emerald-600" />
                        Secure Checkout
                    </CardTitle>
                    <CardDescription>Complete your booking for {reservation.car.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="rounded-xl border bg-white p-4 space-y-3">
                        <div className="flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span className="text-lg">${reservation.totalPrice}</span>
                        </div>
                        <div className="text-sm text-muted-foreground border-t pt-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(reservation.pickupDate).toLocaleDateString()} - {new Date(reservation.returnDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {reservation.pickupLocation}
                            </div>
                        </div>
                    </div>

                    {/* Fake Payment Form */}
                    <form action={payAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Card Holder Name</Label>
                            <Input placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Card Number</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="0000 0000 0000 0000" className="pl-10" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                                <Label>CVC</Label>
                                <Input placeholder="123" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 text-base mt-2">
                            Pay ${reservation.totalPrice} & Confirm
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-xs text-muted-foreground">
                    <Lock className="h-3 w-3 mr-1" /> Payments are secure and encrypted.
                </CardFooter>
            </Card>
        </div>
    )
}

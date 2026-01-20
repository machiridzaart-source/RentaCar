"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock, Calendar, MapPin } from "lucide-react"
import { confirmBookingPayment } from "@/lib/actions"
// We need the type for Reservation to safely pass it. 
// We can define a local interface or import if available.
// For now, defining local interface based on usage.

interface PaymentModalProps {
    reservation: any // Using any for flexibility or we should import the type from actions/prisma
    isOpen: boolean
    onClose: () => void
}

export function PaymentModal({ reservation, isOpen, onClose }: PaymentModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!reservation) return null

    const handlePayment = async (formData: FormData) => {
        setIsLoading(true)
        try {
            await confirmBookingPayment(reservation.id)
            onClose()
        } catch (error) {
            console.error("Payment failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-emerald-600" />
                        Secure Checkout
                    </DialogTitle>
                    <DialogDescription>
                        Complete your booking for {reservation.car.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Summary */}
                    <div className="rounded-xl border bg-muted/50 p-4 space-y-3">
                        <div className="flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span className="text-lg">${reservation.totalPrice}</span>
                        </div>
                        <div className="text-sm text-muted-foreground border-t border-border pt-2">
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
                    <form action={handlePayment} className="space-y-4" id="payment-form">
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
                    </form>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="payment-form" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto" disabled={isLoading}>
                        {isLoading ? "Processing..." : `Pay $${reservation.totalPrice} & Confirm`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

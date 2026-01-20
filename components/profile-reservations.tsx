"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PaymentModal } from "@/components/payment-modal"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { deleteReservation } from "@/lib/actions"

interface ProfileReservationsProps {
    reservations: any[]
    userStatus: string
}

export function ProfileReservations({ reservations, userStatus }: ProfileReservationsProps) {
    const [selectedReservation, setSelectedReservation] = useState<any>(null)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState("")

    const handlePayClick = (reservation: any) => {
        setSelectedReservation(reservation)
        setIsPaymentOpen(true)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        if (!confirm("Are you sure you want to cancel this booking?")) return

        setIsDeleting(id)
        try {
            await deleteReservation(id)
        } catch (error) {
            console.error("Failed to delete", error)
            alert("Failed to delete reservation")
        } finally {
            setIsDeleting("")
        }
    }

    if (reservations.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
    }

    return (
        <div className="space-y-4">
            {reservations.map(res => (
                <div key={res.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                            <img src={res.car.image} alt={res.car.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <div className="font-medium">{res.car.name}</div>
                            <div className="text-sm text-muted-foreground">
                                {new Date(res.pickupDate).toLocaleDateString()} - {new Date(res.returnDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <div className="font-bold">${res.totalPrice}</div>
                            {res.status === 'Pending Approval' && userStatus === 'APPROVED' ? (
                                <Button
                                    size="sm"
                                    className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => handlePayClick(res)}
                                >
                                    Approved • Pay Now
                                </Button>
                            ) : (
                                <div className={cn(
                                    "text-xs uppercase font-medium",
                                    res.status === 'Pending Approval' ? "text-amber-600" : "text-muted-foreground"
                                )}>
                                    {res.status === 'Pending Approval' ? "Waiting Document Approval & Payment" : res.status}
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={(e) => handleDelete(res.id, e)}
                            disabled={isDeleting === res.id}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}

            <PaymentModal
                reservation={selectedReservation}
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
            />
        </div>
    )
}

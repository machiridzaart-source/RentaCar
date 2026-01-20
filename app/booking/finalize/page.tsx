'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createReservation } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function FinalizeBookingPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const finalize = async () => {
            const pending = localStorage.getItem('pending_booking')
            if (!pending) {
                // No pending booking, redirect to cars
                router.push('/cars')
                return
            }

            try {
                const bookingData = JSON.parse(pending)

                // Convert date strings back to Date objects
                const dataToSubmit = {
                    ...bookingData,
                    pickupDate: new Date(bookingData.pickupDate),
                    returnDate: new Date(bookingData.returnDate)
                }

                // Call server action
                const reservation = await createReservation(dataToSubmit)

                // Clear local storage
                localStorage.removeItem('pending_booking')

                // Redirect to success
                router.push(`/booking/success/${reservation.id}`)
            } catch (err) {
                console.error("Booking failed:", err)
                setError("Failed to finalize booking. Please try again.")
                setIsLoading(false)
            }
        }

        finalize()
    }, [router])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardHeader><CardTitle className="text-destructive">Error</CardTitle></CardHeader>
                    <CardContent>
                        <p className="mb-4">{error}</p>
                        <Button onClick={() => router.push('/cars')}>Return to Catalogue</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold">Finalizing your booking...</h2>
                <p className="text-muted-foreground">Please wait while we secure your car.</p>
            </div>
        </div>
    )
}

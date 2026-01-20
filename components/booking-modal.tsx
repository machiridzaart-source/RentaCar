"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { format, differenceInDays, addDays } from "date-fns"
import { CalendarIcon, Check, Shield, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReservations } from "@/contexts/reservations-context"

interface Car {
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

import { useRouter } from "next/navigation"

interface BookingModalProps {
  car: Car
  isOpen: boolean
  onClose: () => void
  user?: {
    name: string
    email: string
    status: "PENDING" | "APPROVED"
  } | null
}

const extras = [
  { id: "insurance", label: "Full Insurance", price: 15 },
  { id: "gps", label: "GPS Navigation", price: 8 },
  { id: "child-seat", label: "Child Seat", price: 10 },
  { id: "additional-driver", label: "Additional Driver", price: 12 },
]

export function BookingModal({ car, isOpen, onClose, user }: BookingModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [pickupDate, setPickupDate] = useState<Date>(new Date())
  const [returnDate, setReturnDate] = useState<Date>(addDays(new Date(), 3))
  const [pickupLocation, setPickupLocation] = useState("")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [isConfirmed, setIsConfirmed] = useState(false)

  const { addReservation } = useReservations()

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Optional: reset steps? Keep logic simple for now.
    }
  }, [isOpen])

  const days = differenceInDays(returnDate, pickupDate) || 1
  const basePrice = car.price * days
  const extrasPrice = selectedExtras.reduce((acc, extraId) => {
    const extra = extras.find((e) => e.id === extraId)
    return acc + (extra ? extra.price * days : 0)
  }, 0)
  const totalPrice = basePrice + extrasPrice

  const handleConfirm = async () => {
    // Unauthenticated User Flow
    if (!user) {
      const pendingBooking = {
        carId: car.id,
        pickupDate,
        returnDate,
        pickupLocation,
        extras: selectedExtras,
        totalPrice,
      }
      localStorage.setItem('pending_booking', JSON.stringify(pendingBooking))

      // Redirect to register, knowing that register/login logic usually naturally lands on /profile or home.
      // Ideally we want to land on /booking/finalize.
      // Since we can't easily pass query params through the existing server actions without modifying them,
      // We will rely on the user navigating or we can just redirect to register and hope they come back?
      // BETTER: Redirect to a special url that handles the flow?
      // Let's assume standard register flow. We will add a small query param 'redirect=/booking/finalize' 
      // just in case we update auth later, but for now the user acts manually or we check 'pending_booking' on mount of other pages?
      // Actually, if we just push to /register, the user registers, then gets redirected to /profile.
      // We can add a check on /profile to see if 'pending_booking' exists?
      // Let's try explicit redirect first.
      router.push('/register')
      return
    }

    // if (user.status !== 'APPROVED') { ... } check removed to allow pending bookings


    // Authenticated User Flow
    try {
      // We need the ID to redirect, so we use the server action directly or update context to return ID
      // Context addReservation currently returns void. Let's call server action directly here for simplicity
      // and bypass context refresh delay, or update context. 
      // Direct call is safer for ID retrieval.
      const { createReservation } = await import('@/lib/actions')
      const reservation = await createReservation({
        carId: car.id,
        pickupDate,
        returnDate,
        pickupLocation,
        extras: selectedExtras,
        totalPrice,
      })

      setIsConfirmed(true)
      setTimeout(() => {
        setIsConfirmed(false)
        setStep(1)
        setPickupLocation("")
        setSelectedExtras([])
        onClose()
        router.push(`/booking/success/${reservation.id}`)
      }, 1000)
    } catch (e) {
      console.error("Booking error", e)
      alert("Failed to book car. Please try again.")
    }
  }

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]))
  }

  // Auth check for step 1? Or let them browse steps until "Book"?
  // Allowing them to fill details then blocking is typical ("Guest Checkout" flow usually asks later),
  // but since we want approval gate, blocking at "Confirm" is fine.

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <Check className="h-8 w-8 text-accent-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Your {car.name} has been reserved. Check your reservations for details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Book {car.name}</DialogTitle>
        </DialogHeader>

        <div className="mb-6 flex items-center gap-4">
          <div className="h-20 w-28 overflow-hidden rounded-xl bg-muted">
            <img src={car.image || "/placeholder.svg"} alt={car.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.category}</p>
            <p className="text-lg font-bold">${car.price}/day</p>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn("h-1.5 flex-1 rounded-full transition-colors", step >= s ? "bg-accent" : "bg-muted")}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent rounded-xl"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(pickupDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={(date) => date && setPickupDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent rounded-xl"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(returnDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={(date) => date && setReturnDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="rounded-xl bg-accent/50 p-4">
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span className="font-medium">
                  {days} day{days > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <Button className="w-full rounded-xl" onClick={() => setStep(2)} disabled={!pickupLocation}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium">Add extras</h3>
            <div className="space-y-3">
              {extras.map((extra) => (
                <label
                  key={extra.id}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedExtras.includes(extra.id)}
                      onCheckedChange={() => toggleExtra(extra.id)}
                    />
                    <div>
                      <p className="font-medium">{extra.label}</p>
                      <p className="text-sm text-muted-foreground">${extra.price}/day</p>
                    </div>
                  </div>
                  {extra.id === "insurance" && <Shield className="h-5 w-5 text-muted-foreground" />}
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1 rounded-xl">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">Booking Summary</h3>

            <div className="space-y-3 rounded-xl border border-border p-4">
              <div className="flex justify-between text-sm">
                <span>Pickup</span>
                <span>{format(pickupDate, "PPP")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Return</span>
                <span>{format(returnDate, "PPP")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Location</span>
                <span>{pickupLocation}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-sm">
                  <span>
                    {car.name} x {days} days
                  </span>
                  <span>${basePrice}</span>
                </div>
                {selectedExtras.map((extraId) => {
                  const extra = extras.find((e) => e.id === extraId)
                  if (!extra) return null
                  return (
                    <div key={extraId} className="flex justify-between text-sm">
                      <span>
                        {extra.label} x {days} days
                      </span>
                      <span>${extra.price * days}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">{"You won't be charged yet"}</p>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl">
                Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1 rounded-xl">
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

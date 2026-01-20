"use client"

import { format } from "date-fns"
import { MapPin, Calendar, MoreHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useReservations, type Reservation } from "@/contexts/reservations-context"
import { cn } from "@/lib/utils"

const statusStyles = {
  upcoming: "bg-accent text-accent-foreground",
  active: "bg-green-100 text-green-800",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-red-100 text-red-800",
}

export function ReservationsList() {
  const { reservations, cancelReservation } = useReservations()

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
        <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No reservations yet</h3>
        <p className="mb-4 text-muted-foreground">Book your first car rental to see it here</p>
        <Button asChild className="rounded-full">
          <a href="/">Browse Cars</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCancel={() => cancelReservation(reservation.id)}
        />
      ))}
    </div>
  )
}

function ReservationCard({
  reservation,
  onCancel,
}: {
  reservation: Reservation
  onCancel: () => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
      {/* Car Image */}
      <div className="h-24 w-36 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src={reservation.carImage || "/placeholder.svg"}
          alt={reservation.carName}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{reservation.carName}</h3>
            <p className="text-sm text-muted-foreground">{reservation.carCategory}</p>
          </div>
          <span
            className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", statusStyles[reservation.status])}
          >
            {reservation.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {reservation.pickupLocation}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(reservation.pickupDate), "MMM d")} -{" "}
            {format(new Date(reservation.returnDate), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-2xl font-bold">${reservation.totalPrice}</p>
          <p className="text-sm text-muted-foreground">total</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Modify Booking</DropdownMenuItem>
            {reservation.status === "upcoming" && (
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel Reservation
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

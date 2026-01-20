"use client"

import { useState } from "react"
import { Star, Users, Fuel, Settings, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"
import { cn } from "@/lib/utils"

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

interface CarCardProps {
  car: Car
  user?: any
}

export function CarCard({ car, user }: CarCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
              )}
            />
          </button>
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {car.category}
          </span>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-semibold">{car.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{car.rating}</span>
              <span className="text-sm text-muted-foreground">({car.reviews})</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {car.seats}
            </span>
            <span className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              {car.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              {car.fuel}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold">${car.price}</span>
              <span className="text-sm text-muted-foreground">/day</span>
            </div>
            <Button onClick={() => setIsBookingOpen(true)} className="rounded-full">
              Book now
            </Button>
          </div>
        </div>
      </div>
      <BookingModal car={car} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} user={user} />
    </>
  )
}

"use client"

import { useState } from "react"
import { CarCard } from "@/components/car-card"
import { CarFilters } from "@/components/car-filters"
import type { CarWithFeatures } from "@/lib/actions"

interface CarGridProps {
  initialCars: CarWithFeatures[]
  user?: any // Using any to avoid importing User type explicitly for speed, or better import return type of getCurrentUser
}

export function CarGrid({ initialCars, user }: CarGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState<number[]>([0, 150])
  const [transmission, setTransmission] = useState("All")

  const filteredCars = initialCars.filter((car) => {
    const categoryMatch = selectedCategory === "All" || car.category === selectedCategory
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1]
    const transmissionMatch = transmission === "All" || car.transmission === transmission

    return categoryMatch && priceMatch && transmissionMatch
  })

  return (
    <div className="space-y-6">
      <CarFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        transmission={transmission}
        setTransmission={setTransmission}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} user={user} />
        ))}
      </div>
    </div>
  )
}

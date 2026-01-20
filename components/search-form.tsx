"use client"

import { useState } from "react"
import { MapPin, Calendar, ChevronDown, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"

export function SearchForm() {
  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupDate, setPickupDate] = useState<Date>(new Date())
  const [returnDate, setReturnDate] = useState<Date>(addDays(new Date(), 3))
  const [driverAge, setDriverAge] = useState("30+")
  const [sameReturn, setSameReturn] = useState(true)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">Find rentals near</h2>

      <div className="space-y-4">
        <button
          onClick={() => setSameReturn(!sameReturn)}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/80"
        >
          {sameReturn ? "Same return location" : "Different return location"}
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80">
              <Users className="h-4 w-4" />
              {"Main driver's age: " + driverAge}
              <ChevronDown className="ml-auto h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              {["18-24", "25-29", "30+", "65+"].map((age) => (
                <button
                  key={age}
                  onClick={() => setDriverAge(age)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                    driverAge === age && "bg-accent font-medium",
                  )}
                >
                  {age}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Pickup location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="City, airport, or address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Pickup & Return</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex w-full items-center gap-2 rounded-xl border border-input bg-background px-3 py-3 text-left text-sm transition-colors hover:bg-accent">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>
                  {format(pickupDate, "MMM d, h:mm a")} - {format(returnDate, "MMM d, h:mm a")}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex">
                <CalendarComponent
                  mode="single"
                  selected={pickupDate}
                  onSelect={(date) => date && setPickupDate(date)}
                  initialFocus
                />
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={(date) => date && setReturnDate(date)}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="w-full rounded-xl gap-2"
          size="lg"
          disabled={!pickupLocation}
          onClick={() => {
            const params = new URLSearchParams()
            if (pickupLocation) params.set("location", pickupLocation)
            if (pickupDate) params.set("pickupDate", pickupDate.toISOString())
            if (returnDate) params.set("returnDate", returnDate.toISOString())

            // Redirect to /cars for search results
            window.location.href = `/cars?${params.toString()}`
          }}
        >
          <Search className="h-4 w-4" />
          Search Cars
        </Button>
      </div>
    </div>
  )
}

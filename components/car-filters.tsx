"use client"

import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const categories = ["All", "Economy", "Sedan", "SUV", "Luxury", "Sports", "Electric"]
const transmissions = ["All", "Automatic", "Manual"]

interface CarFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  transmission: string
  setTransmission: (transmission: string) => void
}

export function CarFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  transmission,
  setTransmission,
}: CarFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 4).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent rounded-full">
            <Filter className="h-4 w-4" />
            More filters
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 rounded-xl">
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-medium">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium">
                Price range: ${priceRange[0]} - ${priceRange[1]}/day
              </h4>
              <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={150} step={5} className="w-full" />
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium">Transmission</h4>
              <div className="flex gap-2">
                {transmissions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransmission(t)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      transmission === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

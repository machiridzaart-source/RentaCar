"use client"

import { TrendingUp, Car, DollarSign, Calendar } from "lucide-react"
import { useReservations } from "@/contexts/reservations-context"

export function StatsCards() {
  const { getReservationStats } = useReservations()
  const stats = getReservationStats()

  const cards = [
    {
      label: "Total Bookings",
      value: stats.total.toString(),
      change: "+12%",
      icon: Calendar,
      accent: true,
    },
    {
      label: "Upcoming Trips",
      value: stats.upcoming.toString(),
      subtitle: "Next 30 days",
      icon: Car,
      accent: false,
    },
    {
      label: "Total Spent",
      value: `$${stats.totalSpent}`,
      change: "+8%",
      icon: DollarSign,
      accent: true,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className={cn(
            "rounded-2xl p-5 transition-shadow hover:shadow-md",
            card.accent ? "bg-accent" : "bg-card border border-border",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              {card.label}
            </div>
            <card.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{card.value}</span>
            {card.change && (
              <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium">{card.change}</span>
            )}
          </div>
          {card.subtitle && <p className="mt-1 text-sm text-muted-foreground">{card.subtitle}</p>}
        </div>
      ))}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

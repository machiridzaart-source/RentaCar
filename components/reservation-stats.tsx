"use client"

import { Calendar, Car, Clock, DollarSign } from "lucide-react"
import { useReservations } from "@/contexts/reservations-context"

export function ReservationStats() {
  const { getReservationStats } = useReservations()
  const stats = getReservationStats()

  const statCards = [
    {
      label: "Total Bookings",
      value: stats.total,
      icon: Calendar,
      accent: true,
    },
    {
      label: "Upcoming",
      value: stats.upcoming,
      icon: Clock,
      accent: false,
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: Car,
      accent: false,
    },
    {
      label: "Total Spent",
      value: `$${stats.totalSpent}`,
      icon: DollarSign,
      accent: true,
    },
  ]

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <div key={index} className={`rounded-2xl p-5 ${stat.accent ? "bg-accent" : "bg-card border border-border"}`}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-2xl font-bold">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

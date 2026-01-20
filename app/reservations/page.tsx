import { Suspense } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ReservationsList } from "@/components/reservations-list"
import { ReservationStats } from "@/components/reservation-stats"

export default function ReservationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Suspense fallback={null}>
          <Header />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">My Reservations</h1>
              <p className="text-muted-foreground">Manage your car rentals and bookings</p>
            </div>

            <ReservationStats />
            <ReservationsList />
          </main>
        </Suspense>
      </div>
    </div>
  )
}

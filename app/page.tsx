import { Suspense } from "react"
import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"
import { FeatureCards } from "@/components/feature-cards"
import { CarGrid } from "@/components/car-grid"
import { Footer } from "@/components/footer"

import { getCurrentUser } from '@/lib/auth'
import { getCars } from "@/lib/actions"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const cars = await getCars()
  const user = await getCurrentUser()

  // Show only 1 row (4 cars) on the home page
  const featuredCars = cars.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Header user={user} />
        <main className="container mx-auto p-6">
          <div className="mb-6 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight">Find Your Perfect Ride</h1>
            <p className="mt-2 text-lg text-muted-foreground">Search, compare, and book rental cars with ease</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside>
              <SearchForm />
            </aside>

            <div className="space-y-6">
              <FeatureCards />
              <CarGrid initialCars={featuredCars} user={user} />
            </div>
          </div>
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

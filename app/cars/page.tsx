
import { Suspense } from "react"
import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"
import { CarGrid } from "@/components/car-grid"
import { Footer } from "@/components/footer"

import { getCurrentUser } from '@/lib/auth'
import { getCars } from "@/lib/actions"

export const dynamic = 'force-dynamic'

export default async function CarsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const cars = await getCars({
        pickupDate: params?.pickupDate as string,
        returnDate: params?.returnDate as string,
    })
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={null}>
                <Header user={user} />
                <main className="container mx-auto p-6">
                    <div className="mb-6 flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tight">Our Fleet</h1>
                        <p className="mt-2 text-lg text-muted-foreground">Explore our wide range of premium vehicles</p>
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
                        <aside>
                            <SearchForm />
                        </aside>

                        <div className="space-y-6">
                            <CarGrid initialCars={cars} user={user} />
                        </div>
                    </div>
                </main>
                <Footer />
            </Suspense>
        </div>
    )
}

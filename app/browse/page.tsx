import { Suspense } from "react"
import { Header } from "@/components/header"
import { CarGrid } from "@/components/car-grid"
import { Footer } from "@/components/footer"
import { getCurrentUser } from '@/lib/auth'
import { getCars } from "@/lib/actions"

export default async function BrowsePage() {
    const cars = await getCars()
    const user = await getCurrentUser()

    // Extract brands and group cars
    const brands = Array.from(new Set(cars.map(c => c.name.split(' ')[0]))).sort()

    const carsByBrand = brands.reduce((acc, brand) => {
        acc[brand] = cars.filter(c => c.name.startsWith(brand))
        return acc
    }, {} as Record<string, typeof cars>)

    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={null}>
                <Header user={user} />
                <main className="container mx-auto p-6 space-y-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Browse by Brand</h1>
                        <p className="text-muted-foreground mt-2">Explore our premium collection arranged by manufacturer</p>
                    </div>

                    <div className="space-y-16">
                        {brands.map((brand) => (
                            <section key={brand} className="scroll-mt-20" id={brand}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-2xl font-semibold">{brand}</h2>
                                    <div className="h-px flex-1 bg-border" />
                                </div>
                                <CarGrid initialCars={carsByBrand[brand]} user={user} />
                            </section>
                        ))}
                    </div>
                </main>
                <Footer />
            </Suspense>
        </div>
    )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function PressPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Latest news, updates, and resources for the media.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="border rounded-xl p-6">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Press Release</span>
                        <div className="mt-2 text-sm text-muted-foreground">October 15, 2024</div>
                        <h3 className="mt-3 text-xl font-semibold">RentCar Expands to 50 New Cities</h3>
                        <p className="mt-2 text-muted-foreground">
                            We are excited to announce our biggest expansion yet, bringing transparent car rental to more users across the globe.
                        </p>
                    </div>

                    <div className="border rounded-xl p-6">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">News</span>
                        <div className="mt-2 text-sm text-muted-foreground">September 01, 2024</div>
                        <h3 className="mt-3 text-xl font-semibold">RentCar Raises Series B Funding</h3>
                        <p className="mt-2 text-muted-foreground">
                            Investment led by TopTier Capital to fuel our mission of simplifying global mobility.
                        </p>
                    </div>

                    <div className="border rounded-xl p-6">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Feature</span>
                        <div className="mt-2 text-sm text-muted-foreground">August 20, 2024</div>
                        <h3 className="mt-3 text-xl font-semibold">CEO Interview on TechDaily</h3>
                        <p className="mt-2 text-muted-foreground">
                            Our CEO discusses the future of car ownership and the rise of the sharing economy.
                        </p>
                    </div>
                </div>

                <div className="mt-16 border-t pt-8">
                    <h2 className="text-2xl font-semibold mb-4">Media Contact</h2>
                    <p className="text-muted-foreground">
                        For press inquiries, please contact: <br />
                        <a href="mailto:press@rentcar.com" className="text-primary hover:underline">press@rentcar.com</a>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

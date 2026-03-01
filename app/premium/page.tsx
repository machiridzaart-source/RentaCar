import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Crown, Shield, Zap } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function PremiumPage() {
    const user = await getCurrentUser()

    const benefits = [
        {
            icon: Crown,
            title: "Priority Support",
            description: "Skip the queue with dedicated 24/7 concierge support."
        },
        {
            icon: Zap,
            title: "Free Upgrades",
            description: "Get automatically upgraded to the next car class when available."
        },
        {
            icon: Shield,
            title: "Zero Cancellation Fees",
            description: "Change your plans up to 1 hour before pickup with no penalty."
        },
        {
            icon: Sparkles,
            title: "Exclusive Deals",
            description: "Access members-only rates and seasonal discounts."
        }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            <Sparkles className="h-4 w-4" />
                            <span>RentCar Pro</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-6">
                            Unlock the Ultimate <br /> Rental Experience
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Join RentCar Pro today and enjoy exclusive benefits designed to make every trip smoother, faster, and more rewarding.
                        </p>
                        <Button size="lg" className="rounded-full px-8 h-12 text-lg gap-2 shadow-lg hover:shadow-primary/20" asChild>
                            <Link href="/premium/checkout">
                                Join RentCar Pro
                            </Link>
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">Only $9.99/month. Cancel anytime.</p>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="py-20 container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonial / Trust */}
                <section className="py-20 bg-muted/30 border-y border-border">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <h2 className="text-3xl font-bold mb-8">Trusted by Elite Travelers</h2>
                        <blockquote className="text-2xl italic font-medium text-muted-foreground mb-6">
                            "RentCar Pro has saved me countless hours and dollars. The free upgrades alone make it worth every penny."
                        </blockquote>
                        <div className="font-semibold">— Alex Chen, Business Traveler</div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 text-center container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to upgrade?</h2>
                    <Button size="lg" className="rounded-full px-8 h-12 text-lg" asChild>
                        <Link href="/premium/checkout">
                            Get RentCar Pro Now
                        </Link>
                    </Button>
                </section>
            </main>
            <Footer />
        </div>
    )
}

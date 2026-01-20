import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function HelpPage() {
    const user = await getCurrentUser()

    const categories = [
        { title: "Getting Started", count: 5 },
        { title: "Booking & Payments", count: 12 },
        { title: "Account Management", count: 8 },
        { title: "During Your Trip", count: 6 },
        { title: "Safety & Insurance", count: 4 },
        { title: "Partners", count: 3 }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <div className="bg-muted py-16">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-10 h-12 rounded-xl bg-background" placeholder="Search for answers..." />
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat, i) => (
                        <div key={i} className="border p-6 rounded-xl hover:border-primary cursor-pointer transition-colors bg-card">
                            <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
                            <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-primary hover:underline">How do I cancel my booking?</a></li>
                        <li><a href="#" className="text-primary hover:underline">What documents do I need to rent a car?</a></li>
                        <li><a href="#" className="text-primary hover:underline">When will my security deposit be refunded?</a></li>
                        <li><a href="#" className="text-primary hover:underline">Can I add an additional driver?</a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

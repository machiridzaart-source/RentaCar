import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function BlogPage() {
    const user = await getCurrentUser()

    const posts = [
        {
            title: "Top 10 Road Trip Destinations for Summer 2025",
            excerpt: "Discover the most scenic drives and hidden gems to explore this summer.",
            date: "Jan 15, 2026",
            author: "Sarah Jenkins",
            category: "Travel"
        },
        {
            title: "How to Save Money on Your Next Car Rental",
            excerpt: "Insider tips and tricks to get the best deals and avoid hidden fees.",
            date: "Jan 02, 2026",
            author: "Mike Thompson",
            category: "Tips"
        },
        {
            title: "Electric vs. Gas: Which Should You Rent?",
            excerpt: "A comprehensive guide to help you choose the right vehicle for your needs.",
            date: "Dec 20, 2025",
            author: "Alex Rivera",
            category: "Guides"
        }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-2">The RentCar Blog</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Stories, travel guides, and tips for the modern traveler.
                </p>

                <div className="space-y-12">
                    {posts.map((post, i) => (
                        <article key={i} className="flex flex-col gap-4 border-b pb-12 last:border-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <span className="text-primary font-medium">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h2 className="text-2xl font-bold hover:text-primary cursor-pointer transition-colors">{post.title}</h2>
                            <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                            <div className="text-sm font-medium">By {post.author}</div>
                        </article>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

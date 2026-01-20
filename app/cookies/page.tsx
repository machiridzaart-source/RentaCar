import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function CookiesPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                <div className="prose dark:prose-invert max-w-none space-y-4 text-sm text-muted-foreground">
                    <p>Last updated: January 20, 2026</p>
                    <p>This Cookie Policy explains how RentCar uses cookies and similar technologies to recognize you when you visit our website.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">1. What are cookies?</h2>
                    <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">2. Why do we use cookies?</h2>
                    <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">3. Types of Cookies</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site.</li>
                        <li><strong>Preferences Cookies:</strong> Allow the site to remember your choices.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

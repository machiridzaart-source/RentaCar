import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function PrivacyPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none space-y-4 text-sm text-muted-foreground">
                    <p>Last updated: January 20, 2026</p>
                    <p>Your privacy is important to us. It is RentCar's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">1. Information We Collect</h2>
                    <p>We may ask for personal information, such as your name, email, address, contact details, and payment information. We collect it by fair and lawful means, with your knowledge and consent.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">2. How We Use Information</h2>
                    <p>We use the collected information to provide, operate, and maintain our website, improve your experience, and process your bookings.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">3. Data Security</h2>
                    <p>We protect the data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">4. Third-Party Sharing</h2>
                    <p>We do not share any personally identifying information publicly or with third-parties, except when required to by law.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

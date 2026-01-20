import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function TermsPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none space-y-4 text-sm text-muted-foreground">
                    <p>Last updated: January 20, 2026</p>
                    <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the RentCar website.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">1. Agreement to Terms</h2>
                    <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">2. Accounts</h2>
                    <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">3. Rental Services</h2>
                    <p>RentCar acts as an intermediary between renters and vehicle providers. We are not responsible for the condition of vehicles or the actions of rental providers, although we vet all partners rigorously.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">4. Intellectual Property</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of RentCar and its licensors.</p>

                    <h2 className="text-xl font-semibold text-foreground mt-6">5. Termination</h2>
                    <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

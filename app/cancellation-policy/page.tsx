import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function CancellationPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg">
                        We understand that plans change. Our cancellation policy is designed to be flexible and fair.
                    </p>

                    <h3 className="text-xl font-semibold">Free Cancellation</h3>
                    <p>
                        You can cancel your reservation for free up to <strong>48 hours</strong> before your scheduled pickup time. You will receive a full refund to your original payment method.
                    </p>

                    <h3 className="text-xl font-semibold">Late Cancellation</h3>
                    <p>
                        If you cancel within 48 hours of your pickup time, a cancellation fee equivalent to <strong>1 day of rental</strong> will be charged. The remaining balance will be refunded.
                    </p>

                    <h3 className="text-xl font-semibold">No-Show Policy</h3>
                    <p>
                        If you do not show up to pick up your vehicle at the scheduled time and have not cancelled your reservation, you will be charged the full amount of the rental duration.
                    </p>

                    <h3 className="text-xl font-semibold">Early Returns</h3>
                    <p>
                        There are no refunds for unused days if you return the vehicle earlier than scheduled.
                    </p>

                    <h3 className="text-xl font-semibold">How to Cancel</h3>
                    <p>
                        To cancel your reservation, please go to your Profile, find the booking in your history, and click the "Cancel" button. Alternatively, you can contact our support team.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

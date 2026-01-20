import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"

export default async function AboutPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-6">About RentCar</h1>
                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <p className="text-xl text-muted-foreground">
                        We are redefining the car rental experience with a focus on simplicity, transparency, and customer satisfaction.
                    </p>
                    <p>
                        Founded in 2024, RentCar started with a simple mission: to make renting a car as easy as ordering a pizza. We noticed that the traditional car rental industry was plagued with hidden fees, confusing contracts, and outdated technology. We set out to change that.
                    </p>
                    <p>
                        Our platform connects verified renters with a curated fleet of high-quality vehicles. Whether you need a compact car for a city trip, a luxury sedan for a business meeting, or an SUV for a family vacation, we have you covered.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
                    <p>
                        To enable freedom of movement by providing accessible, reliable, and affordable transportation solutions to everyone, everywhere.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8">Why Choose Us?</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Transparent Pricing:</strong> What you see is what you pay. No surprise fees at the counter.</li>
                        <li><strong>Verified Quality:</strong> Every car in our fleet is inspected and maintained to the highest standards.</li>
                        <li><strong>24/7 Support:</strong> Our dedicated customer support team is always here to help you.</li>
                        <li><strong>Seamless Technology:</strong> From booking to unlocking the car, everything happens through our app.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

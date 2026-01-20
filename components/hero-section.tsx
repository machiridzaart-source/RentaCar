import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <div className="flex flex-col gap-6">
            {/* Pro Banner */}
            <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] p-8 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold tracking-wide uppercase text-sm">Premium Feature</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Unlock RentCar Pro</h2>
                    <p className="text-gray-400 mb-6 max-w-lg">
                        Get priority support, exclusive deals, and unlimited free cancellations.
                    </p>
                    <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-medium px-6">
                        Learn More
                    </Button>
                </div>
                {/* Abstract background blobs could go here */}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group rounded-xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src="/travel_easier_card_1768591235432.png"
                            alt="Travel just got easier"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">Travel just got easier</h3>
                        <p className="text-sm text-muted-foreground">Rent a car for a weekend getaway or even a month</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group rounded-xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src="/app_rental_card_1768591249878.png"
                            alt="Car rental, made easy"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">Car rental, made easy</h3>
                        <p className="text-sm text-muted-foreground">Compare and book a rental car in minutes</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="group rounded-xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src="/flexible_booking_card_1768591264940.png"
                            alt="Flexible booking"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">Flexible booking</h3>
                        <p className="text-sm text-muted-foreground">Book same day or months in advance with free cancellation</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

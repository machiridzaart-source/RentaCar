import { Car, Smartphone, CalendarCheck, Sparkles } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Car,
    title: "Travel just got easier",
    description: "Rent a car for a weekend getaway or even a month",
    image: "/scenic-mountain-road-trip-view-from-car.jpg",
  },
  {
    icon: Smartphone,
    title: "Car rental, made easy",
    description: "Compare and book a rental car in minutes",
    image: "/hand-holding-phone-with-car-rental-app.jpg",
  },
  {
    icon: CalendarCheck,
    title: "Flexible booking",
    description: "Book same day or months in advance with free cancellation",
    image: "/calendar-with-checkmark-and-car-keys.jpg",
  },
]

export function FeatureCards() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 text-sidebar-foreground">
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-sidebar-primary" />
            <span className="text-sidebar-primary">Premium Feature</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Unlock RentCar Pro</h3>
          <p className="mb-4 text-sm text-sidebar-foreground/70">
            Get priority support, exclusive deals, and unlimited free cancellations
          </p>
          <Link href="/premium" className="inline-block rounded-full bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-card/90">
            Learn More
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-sidebar-primary/20 to-transparent" />
      </div>

      {/* Feature cards grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

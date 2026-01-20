import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default async function FAQPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What do I need to rent a car?</AccordionTrigger>
                        <AccordionContent>
                            You will need a valid driver's license held for at least 1 year, a valid ID or passport, and a credit card in the main driver's name for the security deposit.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is there a mileage limit?</AccordionTrigger>
                        <AccordionContent>
                            Most of our rentals come with unlimited mileage. However, some special categories or promotional rates may have a daily limit. This will be clearly stated during the booking process.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I rent a car with a debit card?</AccordionTrigger>
                        <AccordionContent>
                            We generally require a credit card for the security deposit. In some locations, debit cards may be accepted with additional identity verification and proof of return travel.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Is insurance included?</AccordionTrigger>
                        <AccordionContent>
                            Basic third-party liability coverage is included. We offer comprehensive insurance packages (CDW, Theft Protection) as optional extras during booking for your peace of mind.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Can I cross borders with the rental car?</AccordionTrigger>
                        <AccordionContent>
                            Cross-border travel is permitted to selected countries within the EU. You must inform us in advance, and an additional fee may apply for cross-border insurance coverage.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
            <Footer />
        </div>
    )
}

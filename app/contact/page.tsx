import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

export default async function ContactPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-5xl">
                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <h1 className="text-4xl font-bold mb-6">Get in touch</h1>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Chat to us</h3>
                                    <p className="text-sm text-muted-foreground mb-1">Our friendly team is here to help.</p>
                                    <a href="mailto:support@rentcar.com" className="text-primary font-medium">support@rentcar.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Visit us</h3>
                                    <p className="text-sm text-muted-foreground mb-1">Come say hello at our office HQ.</p>
                                    <p className="text-muted-foreground">100 Smith Street<br />Collingwood VIC 3066 AU</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Call us</h3>
                                    <p className="text-sm text-muted-foreground mb-1">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+15550000000" className="text-primary font-medium">+1 (555) 000-0000</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-8 bg-card">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

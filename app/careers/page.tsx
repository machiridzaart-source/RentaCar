import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function CareersPage() {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header user={user} />
            <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl text-muted-foreground">
                        Help us shape the future of mobility.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="rounded-xl border p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Senior Software Engineer</h3>
                                <p className="text-muted-foreground mb-4">Remote • Engineering</p>
                                <p className="text-sm">We are looking for an experienced full-stack engineer to help build our core booking engine.</p>
                            </div>
                            <Button>Apply Now</Button>
                        </div>
                    </div>

                    <div className="rounded-xl border p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Product Designer</h3>
                                <p className="text-muted-foreground mb-4">New York, NY • Design</p>
                                <p className="text-sm">Shape the user experience of our digital products across web and mobile.</p>
                            </div>
                            <Button>Apply Now</Button>
                        </div>
                    </div>

                    <div className="rounded-xl border p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Customer Success Manager</h3>
                                <p className="text-muted-foreground mb-4">London, UK • Operations</p>
                                <p className="text-sm">Ensure our customers have the best possible experience with every rental.</p>
                            </div>
                            <Button>Apply Now</Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">Don't see a role that fits? <a href="mailto:careers@rentcar.com" className="text-primary hover:underline">Email us</a>.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}

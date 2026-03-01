import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Lock, Sparkles, Check } from "lucide-react"
import { upgradeToPremium } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const dynamic = 'force-dynamic'

export default async function PremiumCheckoutPage() {
    const user = await getCurrentUser()
    if (!user) redirect('/login?redirectTo=/premium/checkout')

    if (user.isPremium) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-primary/10 p-6 rounded-full mb-6">
                    <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-2">You are already a Pro Member!</h1>
                <p className="text-muted-foreground mb-6">Enjoy your exclusive benefits.</p>
                <Button asChild><a href="/profile">Go to Profile</a></Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-xl border-primary/20">
                <CardHeader className="bg-primary/5 text-center border-b border-border pb-8 pt-8">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Upgrade to RentCar Pro</CardTitle>
                    <CardDescription className="text-lg mt-2">
                        $9.99 <span className="text-sm font-normal">/ month</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm">Priority 24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm">Free Automatic Upgrades</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm">Zero Cancellation Fees</span>
                        </div>
                    </div>

                    <div className="my-6 border-t border-border" />

                    {/* Fake Payment Form */}
                    <form action={upgradeToPremium} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Card Holder Name</Label>
                            <Input placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Card Number</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="0000 0000 0000 0000" className="pl-10" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                                <Label>CVC</Label>
                                <Input placeholder="123" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11 text-base mt-4">
                            Confirm Subscription
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-xs text-muted-foreground pb-6">
                    <Lock className="h-3 w-3 mr-1" /> detailed-payment-encrypted
                </CardFooter>
            </Card>
        </div>
    )
}

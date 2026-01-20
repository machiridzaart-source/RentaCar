'use client'

import { useState } from 'react'
import { register } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Car } from 'lucide-react'

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        try {
            await register(formData)
        } catch (e) {
            if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
                throw e;
            }
            if (e instanceof Error) setError(e.message)
            else setError("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Car className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground">Join us to book your premium ride</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" required placeholder="John Doe" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="m@example.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required className="rounded-xl" />
                </div>

                {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}

                <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            </div>
        </div>
    )
}

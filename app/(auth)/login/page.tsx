'use client'

import { useState } from 'react'
import { login } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Car } from 'lucide-react'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        try {
            await login(formData)
        } catch (e) {
            // Next.js redirects throw errors, so we need to check if it's a redirect-like error (digest property) 
            // or just let it bubble if it's a redirect? 
            // Actually, checking "NEXT_REDIRECT" is tricky in client components if wrapping like this.
            // It's cleaner to let the server action return status, but `lib/auth.ts` does redirect.
            // If `redirect` is called in Server Action, the fetch call in client throws.
            // But let's see. If it fails, I'll catch it. 
            // "NEXT_REDIRECT" usually manifests as an error. 
            // I will assume standard error for now, if it redirects, the page will unload anyway.
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to manage your bookings</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email or Username</Label>
                    <Input id="email" name="email" type="text" required placeholder="Email or Username" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required className="rounded-xl" />
                </div>

                {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}

                <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/register" className="font-medium text-primary hover:underline">Sign up</Link>
            </div>
        </div>
    )
}

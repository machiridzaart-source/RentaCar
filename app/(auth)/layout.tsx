import { Header } from "@/components/header"
import { getCurrentUser } from "@/lib/auth"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Header user={user} />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    )
}

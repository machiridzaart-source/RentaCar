import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Car,
    Users,
    Settings,
    LogOut,
    Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') redirect('/login')

    return (
        <div className="flex min-h-screen w-full bg-[#f4f4f5]">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#09090b] text-white md:flex">
                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                            <span className="text-lg">R</span>
                        </div>
                        RentCar Admin
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-6">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-400 transition-all hover:text-white hover:bg-white/10"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Overview
                        </Link>
                        <Link
                            href="/admin/cars"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-400 transition-all hover:text-white hover:bg-white/10"
                        >
                            <Car className="h-4 w-4" />
                            Fleet / Cars
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-400 transition-all hover:text-white hover:bg-white/10"
                        >
                            <Users className="h-4 w-4" />
                            Users & Rentals
                        </Link>
                    </nav>
                </div>
                <div className="p-4">
                    <div className="rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#D4F476] to-emerald-400" />
                            <div className="text-xs">
                                <div className="font-medium text-white">Admin User</div>
                                <div className="text-zinc-500">admin@rentcar.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:pl-64">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

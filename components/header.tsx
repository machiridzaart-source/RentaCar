"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Car, User, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from '@/lib/auth'
// We can use a specialized hook or just props. Props is safer for server component passing.
export interface HeaderProps {
  user?: {
    name: string
    email: string
    role?: string
  } | null
}

const baseTabs = [
  { label: "Browse", href: "/cars", icon: Car },
]

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()

  const tabs = [...baseTabs]
  if (user?.role === 'ADMIN') {
    tabs.push({ label: "Admin", href: "/admin", icon: LayoutDashboard })
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/rentcar-logo.png"
            alt="RentCar"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1">
          {(() => {
            const tabs = [...baseTabs]
            if (user?.role === 'ADMIN') {
              tabs.push({ label: "Admin", href: "/admin", icon: LayoutDashboard })
            }

            return tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              )
            })
          })()}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="gap-2 rounded-full">
                <User className="h-4 w-4" />
                {user.name}
              </Button>
            </Link>
            <form action={logout}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

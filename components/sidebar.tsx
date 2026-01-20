"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Home, CalendarCheck, Heart, Settings, HelpCircle, TrendingUp, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: CalendarCheck, label: "Reservations", href: "/reservations" },
  { icon: Heart, label: "Favorites", href: "#" },
  { icon: TrendingUp, label: "Deals", href: "#" },
  { icon: CreditCard, label: "Payments", href: "#" },
]

const bottomItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-screen w-16 flex-col items-center bg-sidebar py-6 lg:flex">
      {/* Logo */}
      <Link href="/" className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
        <Car className="h-5 w-5 text-sidebar-primary-foreground" />
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <nav className="flex flex-col items-center gap-2">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </nav>
    </aside>
  )
}

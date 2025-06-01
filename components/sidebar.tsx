"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Heart,
  LayoutDashboard,
  FileText,
  Target,
  Bell,
  Footprints,
  Droplets,
  Activity,
  Flame,
  Droplet,
  TrendingUp,
  Moon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/reminders", label: "Reminders", icon: Bell, badge: 6 },
    { href: "/steps", label: "Steps taken", icon: Footprints },
    { href: "/water", label: "Hydration Tracking", icon: Droplets },
    { href: "/heart-rate", label: "Heart Rate", icon: Activity },
    { href: "/nutrition", label: "Calories burned", icon: Flame },
    { href: "/blood-sugar", label: "Blood Sugar", icon: Droplet },
    { href: "/blood-pressure", label: "Blood Pressure", icon: TrendingUp },
    { href: "/sleep", label: "Sleep Monitoring", icon: Moon },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Toggle button for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        onClick={toggle}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div
        className={cn(
          "h-screen bg-[#1a237e] text-white flex flex-col fixed left-0 top-0 z-40 transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          "md:translate-x-0",
          !isOpen && !isOpen ? "-translate-x-full md:translate-x-0" : "",
        )}
      >
        {/* Logo */}
        <div className={cn("p-6 border-b border-[#3949ab]/20", !isOpen && "p-4")}>
          <Link href="/" className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-white" />
            {isOpen && <span className="text-xl font-bold">Health Pulse</span>}
          </Link>
        </div>

        {/* Toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 bg-[#3949ab] text-white rounded-full h-6 w-6 p-1 shadow-md hidden md:flex"
          onClick={toggle}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-lg transition-all duration-200",
                      isOpen ? "px-4 py-3" : "px-2 py-3",
                      isActive
                        ? "bg-[#3949ab] text-white shadow-lg"
                        : "text-gray-300 hover:bg-[#3949ab]/50 hover:text-white",
                    )}
                    title={!isOpen ? item.label : undefined}
                  >
                    <div className={cn("flex items-center", isOpen ? "space-x-3" : "justify-center w-full")}>
                      <item.icon className="h-5 w-5" />
                      {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </div>
                    {isOpen && item.badge && (
                      <Badge className="bg-[#ff4444] text-white text-xs px-2 py-1 rounded-full">{item.badge}</Badge>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className={cn("p-4 border-t border-[#3949ab]/20", !isOpen && "p-2")}>
          <Button
            variant="ghost"
            className={cn(
              "text-gray-300 hover:bg-[#3949ab]/50 hover:text-white",
              isOpen ? "w-full justify-start" : "w-full justify-center",
            )}
            onClick={() => {
              localStorage.removeItem("user")
              localStorage.removeItem("authToken")
              window.location.href = "/"
            }}
            title={!isOpen ? "Log out" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-3">Log out</span>}
          </Button>
        </div>
      </div>
    </>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Heart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/nutrition", label: t("nav.nutrition") },
    { href: "/activity", label: t("nav.activity") },
    { href: "/sleep", label: t("nav.sleep") },
    { href: "/water", label: t("nav.water") },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <nav className="bg-[#03045e] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Heart className="h-8 w-8 text-[#00b4de]" />
            <span className="text-xl font-bold">Health Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#00b4de] ${
                  pathname === item.href ? "text-[#00b4de]" : "text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00b4de]"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Auth */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:text-[#00b4de] hover:bg-[#0077b6]"
            >
              <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === "en" ? "العربية" : "English"}
            </Button>
            <Link href="/auth">
              <Button className="bg-[#0077b6] hover:bg-[#00b4de] text-white">{t("nav.login")}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#00b4de]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#0077b6]"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-[#00b4de] bg-[#0077b6]"
                      : "text-white hover:text-[#00b4de] hover:bg-[#0077b6]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-[#0077b6]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-white hover:text-[#00b4de] hover:bg-[#0077b6]"
                >
                  <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === "en" ? "العربية" : "English"}
                </Button>
                <Link href="/auth">
                  <Button className="bg-[#0077b6] hover:bg-[#00b4de] text-white">{t("nav.login")}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

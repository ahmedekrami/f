"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { href: "#home", label: language === "en" ? "Home" : "الرئيسية" },
    { href: "#about", label: language === "en" ? "About" : "حول" },
    { href: "#features", label: language === "en" ? "Features" : "الميزات" },
    { href: "#contact", label: language === "en" ? "Contact" : "اتصل بنا" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <header className="bg-[#1a237e] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-[#1a237e]" />
            </div>
            <span className="text-xl font-bold">Health Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#00b4de] transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-white hover:text-[#00b4de] hover:bg-[#3949ab] flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>

            {/* Sign Up Button */}
            <Link href="/auth">
              <Button className="bg-[#00b4de] hover:bg-[#0077b6] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200">
                {language === "en" ? "Sign Up" : "إنشاء حساب"}
              </Button>
            </Link>

            {/* Login Button */}
            <Link href="/auth">
              <Button
                variant="ghost"
                className="text-white hover:text-[#00b4de] hover:bg-white/10 px-6 py-2 rounded-md font-medium transition-colors duration-200 border border-transparent hover:border-white/20"
              >
                {language === "en" ? "Login" : "تسجيل الدخول"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#00b4de]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#3949ab]"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[#00b4de] transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:text-[#00b4de] hover:bg-[#3949ab] justify-start"
              >
                <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === "en" ? "العربية" : "English"}
              </Button>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-[#3949ab]">
                <Link href="/auth">
                  <Button className="w-full bg-[#00b4de] hover:bg-[#0077b6] text-white">
                    {language === "en" ? "Sign Up" : "إنشاء حساب"}
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:text-[#00b4de] hover:bg-white/10 border border-white/20"
                  >
                    {language === "en" ? "Login" : "تسجيل الدخول"}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

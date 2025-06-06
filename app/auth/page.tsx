"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { t } = useLanguage()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem(
        "healthPulseUser",
        JSON.stringify({
          name: "Demo User", // Default name for login
          email: formData.email,
          isLoggedIn: true,
        }),
      )

      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage with the provided name
      localStorage.setItem(
        "healthPulseUser",
        JSON.stringify({
          name: formData.name || "New User", // Use provided name or default
          email: formData.email,
          isLoggedIn: true,
        }),
      )

      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#caf0f8] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 rtl:space-x-reverse">
            <Heart className="h-10 w-10 text-[#0077b6]" />
            <span className="text-2xl font-bold text-[#03045e]">Health Pulse</span>
          </Link>
          <p className="text-gray-600 mt-2">Your health journey starts here</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-[#03045e] text-white rounded-t-lg">
            <CardTitle className="text-center text-xl">Welcome</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-[#0077b6] data-[state=active]:text-white">
                  {t("auth.login")}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-[#0077b6] data-[state=active]:text-white"
                >
                  {t("auth.register")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("auth.email")}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="pl-10 rtl:pl-3 rtl:pr-10 form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("auth.password")}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 rtl:pl-10 rtl:pr-10 form-input"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 rtl:right-auto rtl:left-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0077b6] hover:bg-[#00b4de] btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="spinner mx-auto"></div> : t("auth.signin")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("auth.name")}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="pl-10 rtl:pl-3 rtl:pr-10 form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("auth.email")}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="pl-10 rtl:pl-3 rtl:pr-10 form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t("auth.password")}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="pl-10 pr-10 rtl:pl-10 rtl:pr-10 form-input"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 rtl:right-auto rtl:left-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0077b6] hover:bg-[#00b4de] btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="spinner mx-auto"></div> : t("auth.signup")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">{t("auth.social")}</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2 rtl:ml-0 rtl:mr-2">Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="ml-2 rtl:ml-0 rtl:mr-2">Facebook</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

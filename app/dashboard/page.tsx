"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Footprints,
  Droplets,
  Heart,
  Flame,
  Droplet,
  TrendingUp,
  ArrowRight,
  Clock,
  Brain,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"
import { useSidebar } from "@/contexts/sidebar-context"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const { isOpen } = useSidebar()
  const { t } = useLanguage()
  const [userName, setUserName] = useState("User")

  // Get user name from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("healthPulseUser")
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setUserName(user.name || "User")
      } catch (error) {
        console.error("Error parsing user data:", error)
        setUserName("User")
      }
    }
  }, [])

  const healthMetrics = [
    {
      value: "202",
      total: "2000",
      label: t("metrics.steps"),
      icon: Footprints,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      value: "87",
      total: "liters",
      label: t("metrics.water"),
      icon: Droplets,
      color: "bg-cyan-400",
      textColor: "text-cyan-600",
    },
    {
      value: "98",
      total: "bpm",
      label: t("metrics.heart_rate"),
      icon: Heart,
      color: "bg-pink-500",
      textColor: "text-pink-600",
    },
    {
      value: "408",
      total: "kcal",
      label: t("metrics.calories"),
      icon: Flame,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      value: "80",
      total: "mg/dl",
      label: t("metrics.blood_sugar"),
      icon: Droplet,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
    {
      value: "102/72",
      total: "mmHg",
      label: t("metrics.blood_pressure"),
      icon: TrendingUp,
      color: "bg-teal-500",
      textColor: "text-teal-600",
    },
  ]

  const fitnessData = [
    { day: "Jan", value: 45 },
    { day: "Feb", value: 65 },
    { day: "Mar", value: 35 },
    { day: "Apr", value: 80 },
    { day: "May", value: 55 },
    { day: "Jun", value: 75 },
    { day: "Jul", value: 45 },
    { day: "Aug", value: 90 },
    { day: "Sep", value: 65 },
    { day: "Oct", value: 50 },
    { day: "Nov", value: 40 },
    { day: "Dec", value: 30 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={cn("transition-all duration-300", isOpen ? "ml-64" : "ml-16")}>
        <DashboardHeader />

        <div className="p-6">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 overflow-hidden relative">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-sm font-medium text-blue-100 mb-2">{t("dashboard.overview")}</h2>
                    <h1 className="text-2xl font-bold mb-2">
                      {t("dashboard.greeting")} {userName},
                    </h1>
                    <p className="text-blue-100 mb-4 max-w-md">{t("dashboard.subtitle")}</p>
                    <Button variant="ghost" className="text-white hover:bg-white/20 p-0">
                      {t("dashboard.learn_more")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      src="/dashboard-illustration.png"
                      alt="Health Dashboard Illustration"
                      className="w-48 h-32 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${metric.color}`}>
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline space-x-2">
                          <span className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</span>
                          <span className="text-sm text-gray-500">/{metric.total}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts and Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fitness Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {t("dashboard.fitness_activity")}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">{t("dashboard.bike")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-600">{t("dashboard.run")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{t("dashboard.walking")}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-48 px-4">
                    {fitnessData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div className="relative h-32 w-6">
                          <div
                            className="absolute bottom-0 w-full bg-blue-500 rounded-t transition-all duration-500"
                            style={{ height: `${data.value}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sleep Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col justify-center items-center text-center h-full">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="12, 88"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">12%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{t("dashboard.yesterday")}</p>
                  <h3 className="text-lg font-semibold text-gray-800">{t("dashboard.hours_sleep")}</h3>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Reminders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">{t("dashboard.reminders")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">48min</p>
                      <p className="text-sm text-gray-600">{t("dashboard.stretching")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">32min</p>
                      <p className="text-sm text-gray-600">{t("dashboard.mind_training")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">{t("dashboard.reports")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t("dashboard.weight_loss")}</p>
                        <p className="text-sm text-green-600">22% {t("dashboard.decrease")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{t("dashboard.general_health")}</p>
                        <p className="text-sm text-blue-600">70% {t("dashboard.increase")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col justify-center items-center text-center h-full">
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeDasharray="86, 14"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">86%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{t("dashboard.goals_achievement")}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

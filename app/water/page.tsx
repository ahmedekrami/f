"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Droplets, Plus, Target, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

export default function WaterPage() {
  const [waterIntake, setWaterIntake] = useState(6) // glasses consumed today
  const [dailyGoal] = useState(8) // daily goal in glasses
  const [waterHistory, setWaterHistory] = useState([
    { time: "08:00", glasses: 1 },
    { time: "10:30", glasses: 1 },
    { time: "12:15", glasses: 2 },
    { time: "14:45", glasses: 1 },
    { time: "16:20", glasses: 1 },
  ])

  const weeklyData = [
    { day: "Mon", glasses: 8, goal: 8 },
    { day: "Tue", glasses: 7, goal: 8 },
    { day: "Wed", glasses: 9, goal: 8 },
    { day: "Thu", glasses: 6, goal: 8 },
    { day: "Fri", glasses: 8, goal: 8 },
    { day: "Sat", glasses: 10, goal: 8 },
    { day: "Sun", glasses: 6, goal: 8 },
  ]

  const addWater = () => {
    if (waterIntake < 15) {
      // Limit to prevent unrealistic intake
      setWaterIntake(waterIntake + 1)
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setWaterHistory([...waterHistory, { time: currentTime, glasses: 1 }])
    }
  }

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1)
      setWaterHistory(waterHistory.slice(0, -1))
    }
  }

  const progressPercentage = (waterIntake / dailyGoal) * 100
  const remainingGlasses = Math.max(0, dailyGoal - waterIntake)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <DashboardHeader />

        <div className="p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Water Intake Tracking</h1>
            <p className="text-gray-600">Stay hydrated and track your daily water consumption</p>
          </motion.div>

          {/* Main Water Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Water Progress */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Droplets className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2 text-blue-600" />
                    Today's Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative mb-8">
                    {/* Water Bottle Visualization */}
                    <div className="mx-auto w-32 h-64 border-4 border-[#0077b6] rounded-b-full rounded-t-lg relative overflow-hidden bg-white">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00b4de] to-[#90e0ef] rounded-b-full"
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.min(progressPercentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Droplets className="h-8 w-8 text-[#0077b6] opacity-20" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-baseline justify-center space-x-2 rtl:space-x-reverse">
                      <span className="text-4xl font-bold text-[#03045e]">{waterIntake}</span>
                      <span className="text-lg text-gray-600">/ {dailyGoal} glasses</span>
                    </div>

                    <Progress value={progressPercentage} className="h-3" />

                    <div className="text-sm text-gray-600">
                      {remainingGlasses > 0
                        ? `${remainingGlasses} glasses remaining to reach your goal`
                        : "🎉 Daily goal achieved! Great job staying hydrated!"}
                    </div>

                    <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-6">
                      <Button
                        onClick={removeWater}
                        variant="outline"
                        size="lg"
                        disabled={waterIntake === 0}
                        className="hover:bg-red-50 hover:border-red-300"
                      >
                        Remove Glass
                      </Button>
                      <Button
                        onClick={addWater}
                        size="lg"
                        className="bg-[#1a237e] hover:bg-[#3949ab]"
                        disabled={waterIntake >= 15}
                      >
                        <Plus className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                        Add Glass
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Daily Goal Card */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                    Daily Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{dailyGoal} glasses</p>
                      <p className="text-sm text-gray-600">Recommended daily intake</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#0077b6]">{progressPercentage.toFixed(0)}%</p>
                      <p className="text-sm text-gray-600">Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hydration Benefits */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Hydration Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-[#00b4de] rounded-full"></div>
                      <span className="text-sm text-gray-700">Improves brain function</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-[#00b4de] rounded-full"></div>
                      <span className="text-sm text-gray-700">Boosts energy levels</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-[#00b4de] rounded-full"></div>
                      <span className="text-sm text-gray-700">Supports healthy skin</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-[#00b4de] rounded-full"></div>
                      <span className="text-sm text-gray-700">Aids digestion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement */}
              {waterIntake >= dailyGoal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-[#90e0ef] to-[#caf0f8] border-[#00b4de]">
                    <CardContent className="p-4 text-center">
                      <Award className="h-8 w-8 text-[#0077b6] mx-auto mb-2" />
                      <h3 className="font-semibold text-[#03045e]">Daily Goal Achieved!</h3>
                      <p className="text-sm text-gray-600">Keep up the great hydration habits!</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Today's Water Log */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Today's Water Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {waterHistory.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-[#90e0ef] rounded-lg"
                    >
                      <Droplets className="h-5 w-5 text-[#0077b6]" />
                      <div>
                        <p className="font-medium text-[#03045e]">{entry.glasses} glass(es)</p>
                        <p className="text-sm text-gray-600">{entry.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-end justify-between h-48 px-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div className="relative h-32 w-8 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0077b6] to-[#00b4de] rounded-full"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.glasses / 12) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          {day.glasses >= day.goal && (
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                              <Award className="h-3 w-3 text-yellow-500" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{day.glasses}</p>
                          <p className="text-xs text-gray-500">{day.day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    <p>
                      Daily goal: {dailyGoal} glasses | Weekly average:{" "}
                      {(weeklyData.reduce((sum, day) => sum + day.glasses, 0) / 7).toFixed(1)} glasses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

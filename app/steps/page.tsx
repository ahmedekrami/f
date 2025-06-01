"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Footprints, TrendingUp, Calendar, Award, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

export default function StepsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [currentSteps] = useState(8750)
  const [dailyGoal] = useState(10000)

  const weeklyData = [
    { day: "Mon", steps: 8500, goal: 10000 },
    { day: "Tue", steps: 9200, goal: 10000 },
    { day: "Wed", steps: 7800, goal: 10000 },
    { day: "Thu", steps: 11500, goal: 10000 },
    { day: "Fri", steps: 9800, goal: 10000 },
    { day: "Sat", steps: 12000, goal: 10000 },
    { day: "Sun", steps: 8750, goal: 10000 },
  ]

  const monthlyStats = [
    { metric: "Total Steps", value: "287,450", change: "+12.5%" },
    { metric: "Daily Average", value: "9,248", change: "+8.3%" },
    { metric: "Goals Met", value: "18/30", change: "+15%" },
    { metric: "Best Day", value: "15,420", change: "New Record!" },
  ]

  const achievements = [
    { title: "Step Master", description: "Reached 10,000 steps for 7 consecutive days", icon: "🏆", earned: true },
    { title: "Weekend Warrior", description: "Exceeded goal on both weekend days", icon: "⚡", earned: true },
    { title: "Consistency King", description: "Maintained daily activity for 30 days", icon: "👑", earned: false },
    { title: "Distance Walker", description: "Walked 100km in a month", icon: "🚶‍♂️", earned: true },
  ]

  const progressPercentage = (currentSteps / dailyGoal) * 100
  const remainingSteps = Math.max(0, dailyGoal - currentSteps)

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Steps Tracking</h1>
                <p className="text-gray-600">Monitor your daily activity and walking progress</p>
              </div>
              <div className="flex space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Today's Progress</h2>
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-5xl font-bold">{currentSteps.toLocaleString()}</span>
                      <span className="text-xl text-blue-100">/ {dailyGoal.toLocaleString()} steps</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-4 bg-blue-800" />
                    <div className="flex justify-between text-blue-100">
                      <span>{progressPercentage.toFixed(1)}% complete</span>
                      <span>{remainingSteps.toLocaleString()} steps remaining</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto">
                      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={`${progressPercentage}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Footprints className="h-12 w-12 mb-2" />
                        <span className="text-lg font-semibold">{progressPercentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {monthlyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">{stat.metric}</h3>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Weekly Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Footprints className="h-5 w-5 mr-2" />
                  Weekly Steps Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-end justify-between h-64 px-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative h-48 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.steps / 15000) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          {day.steps >= day.goal && (
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                              <Award className="h-4 w-4 text-yellow-500" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{day.steps.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{day.day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Daily Steps</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-gray-600">Goal Achieved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Step Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${achievement.earned ? "text-yellow-800" : "text-gray-600"}`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${achievement.earned ? "text-yellow-700" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Earned
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

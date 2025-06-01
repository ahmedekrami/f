"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Calendar, Download, BarChart3, PieChart, Activity, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [reportType, setReportType] = useState("overview")

  const healthTrends = [
    {
      metric: "Weight Loss",
      value: "22%",
      trend: "decrease",
      icon: TrendingDown,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Excellent progress towards your weight goal",
    },
    {
      metric: "General Health",
      value: "70%",
      trend: "increase",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Overall health metrics showing improvement",
    },
    {
      metric: "Activity Level",
      value: "45%",
      trend: "increase",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Daily activity has increased significantly",
    },
    {
      metric: "Sleep Quality",
      value: "15%",
      trend: "increase",
      icon: Heart,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      description: "Sleep patterns are improving steadily",
    },
  ]

  const weeklyData = [
    { week: "Week 1", steps: 8500, calories: 2100, water: 7, sleep: 7.2 },
    { week: "Week 2", steps: 9200, calories: 2050, water: 8, sleep: 7.8 },
    { week: "Week 3", steps: 10100, calories: 1980, water: 8.5, sleep: 8.1 },
    { week: "Week 4", steps: 11500, calories: 1920, water: 9, sleep: 8.3 },
  ]

  const monthlyGoals = [
    { goal: "Daily Steps", target: 10000, achieved: 8750, percentage: 87.5 },
    { goal: "Water Intake", target: 8, achieved: 7.2, percentage: 90 },
    { goal: "Sleep Hours", target: 8, achieved: 7.6, percentage: 95 },
    { goal: "Workout Days", target: 20, achieved: 16, percentage: 80 },
  ]

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Reports</h1>
                <p className="text-gray-600">Comprehensive analysis of your health progress and trends</p>
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
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Health Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${trend.bgColor}`}>
                        <trend.icon className={`h-6 w-6 ${trend.color}`} />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className={`text-2xl font-bold ${trend.color}`}>{trend.value}</span>
                          {trend.trend === "increase" ? (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 capitalize">{trend.trend}</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{trend.metric}</h3>
                    <p className="text-sm text-gray-600">{trend.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Weekly Progress Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Daily Steps</h4>
                      <div className="flex items-end space-x-4 h-32">
                        {weeklyData.map((week, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-blue-500 rounded-t transition-all duration-500"
                              style={{ height: `${(week.steps / 12000) * 100}%` }}
                            />
                            <span className="text-xs text-gray-500 mt-2">{week.week}</span>
                            <span className="text-xs font-medium">{week.steps}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goal Achievement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Monthly Goal Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyGoals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{goal.goal}</span>
                          <span className="text-sm text-gray-500">
                            {goal.achieved}/{goal.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${goal.percentage}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{goal.percentage.toFixed(0)}% achieved</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Detailed Health Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Metric</th>
                        <th className="text-left py-3 px-4">Current</th>
                        <th className="text-left py-3 px-4">Previous</th>
                        <th className="text-left py-3 px-4">Change</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Average Steps</td>
                        <td className="py-3 px-4">9,837</td>
                        <td className="py-3 px-4">8,542</td>
                        <td className="py-3 px-4 text-green-600">+15.2%</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Improving</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Water Intake</td>
                        <td className="py-3 px-4">7.8 L</td>
                        <td className="py-3 px-4">7.2 L</td>
                        <td className="py-3 px-4 text-green-600">+8.3%</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Good</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Sleep Quality</td>
                        <td className="py-3 px-4">7.9 hrs</td>
                        <td className="py-3 px-4">7.3 hrs</td>
                        <td className="py-3 px-4 text-green-600">+8.2%</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Excellent</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">Heart Rate</td>
                        <td className="py-3 px-4">72 bpm</td>
                        <td className="py-3 px-4">75 bpm</td>
                        <td className="py-3 px-4 text-green-600">-4.0%</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Healthy</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

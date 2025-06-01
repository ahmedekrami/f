"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Droplet, TrendingUp, AlertTriangle, Plus, Calendar, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface BloodSugarReading {
  id: number
  value: number
  timestamp: string
  type: "fasting" | "post-meal" | "random" | "bedtime"
  notes?: string
}

export default function BloodSugarPage() {
  const [readings, setReadings] = useState<BloodSugarReading[]>([
    { id: 1, value: 95, timestamp: "2024-01-15 08:00", type: "fasting", notes: "Morning reading" },
    { id: 2, value: 140, timestamp: "2024-01-15 10:30", type: "post-meal", notes: "2 hours after breakfast" },
    { id: 3, value: 110, timestamp: "2024-01-15 14:00", type: "random" },
    { id: 4, value: 125, timestamp: "2024-01-15 16:30", type: "post-meal", notes: "After lunch" },
    { id: 5, value: 88, timestamp: "2024-01-15 22:00", type: "bedtime" },
  ])

  const [newReading, setNewReading] = useState({
    value: "",
    type: "random",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const currentReading = 95
  const targetRange = { min: 70, max: 140 }

  const weeklyData = [
    { day: "Mon", fasting: 92, postMeal: 135, avg: 108 },
    { day: "Tue", fasting: 88, postMeal: 142, avg: 112 },
    { day: "Wed", fasting: 95, postMeal: 138, avg: 115 },
    { day: "Thu", fasting: 90, postMeal: 145, avg: 118 },
    { day: "Fri", fasting: 87, postMeal: 132, avg: 105 },
    { day: "Sat", fasting: 93, postMeal: 140, avg: 110 },
    { day: "Sun", fasting: 95, postMeal: 138, avg: 112 },
  ]

  const handleAddReading = () => {
    if (newReading.value) {
      const reading: BloodSugarReading = {
        id: Date.now(),
        value: Number.parseInt(newReading.value),
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
        type: newReading.type as "fasting" | "post-meal" | "random" | "bedtime",
        notes: newReading.notes,
      }
      setReadings([reading, ...readings])
      setNewReading({ value: "", type: "random", notes: "" })
      setIsDialogOpen(false)
    }
  }

  const getBloodSugarStatus = (value: number, type: string) => {
    if (type === "fasting") {
      if (value < 70) return { status: "Low", color: "bg-blue-100 text-blue-800", alert: true }
      if (value <= 100) return { status: "Normal", color: "bg-green-100 text-green-800", alert: false }
      if (value <= 125) return { status: "Prediabetic", color: "bg-yellow-100 text-yellow-800", alert: true }
      return { status: "Diabetic", color: "bg-red-100 text-red-800", alert: true }
    } else if (type === "post-meal") {
      if (value < 70) return { status: "Low", color: "bg-blue-100 text-blue-800", alert: true }
      if (value <= 140) return { status: "Normal", color: "bg-green-100 text-green-800", alert: false }
      if (value <= 199) return { status: "Prediabetic", color: "bg-yellow-100 text-yellow-800", alert: true }
      return { status: "Diabetic", color: "bg-red-100 text-red-800", alert: true }
    }
    // Random/bedtime
    if (value < 70) return { status: "Low", color: "bg-blue-100 text-blue-800", alert: true }
    if (value <= 140) return { status: "Normal", color: "bg-green-100 text-green-800", alert: false }
    return { status: "High", color: "bg-yellow-100 text-yellow-800", alert: true }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fasting":
        return "bg-blue-100 text-blue-800"
      case "post-meal":
        return "bg-orange-100 text-orange-800"
      case "random":
        return "bg-purple-100 text-purple-800"
      case "bedtime":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const averageReading = readings.reduce((sum, reading) => sum + reading.value, 0) / readings.length

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Sugar Monitoring</h1>
                <p className="text-gray-600">Track your glucose levels and maintain healthy ranges</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reading
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record Blood Sugar</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Blood sugar (mg/dL)"
                      value={newReading.value}
                      onChange={(e) => setNewReading({ ...newReading, value: e.target.value })}
                    />
                    <Select
                      value={newReading.type}
                      onValueChange={(value) => setNewReading({ ...newReading, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Reading type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fasting">Fasting</SelectItem>
                        <SelectItem value="post-meal">Post-Meal</SelectItem>
                        <SelectItem value="random">Random</SelectItem>
                        <SelectItem value="bedtime">Bedtime</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Notes (optional)"
                      value={newReading.notes}
                      onChange={(e) => setNewReading({ ...newReading, notes: e.target.value })}
                    />
                    <Button onClick={handleAddReading} className="w-full bg-[#1a237e] hover:bg-[#3949ab]">
                      Record Reading
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Latest Reading</h2>
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-5xl font-bold">{currentReading}</span>
                      <span className="text-xl text-orange-100">mg/dL</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-orange-100">Target Range:</span>
                        <span className="font-semibold">
                          {targetRange.min}-{targetRange.max} mg/dL
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-100">Average (7 days):</span>
                        <span className="font-semibold">{averageReading.toFixed(0)} mg/dL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-100">Status:</span>
                        <span className="font-semibold">Normal</span>
                      </div>
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
                          strokeDasharray={`${(currentReading / 200) * 100}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Droplet className="h-12 w-12 mb-2" />
                        <span className="text-lg font-semibold">{((currentReading / 200) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      readings.filter((r) => {
                        const status = getBloodSugarStatus(r.value, r.type)
                        return status.status === "Normal"
                      }).length
                    }
                  </h3>
                  <p className="text-sm text-gray-600">Normal Readings</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{averageReading.toFixed(0)}</h3>
                  <p className="text-sm text-gray-600">Average mg/dL</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      readings.filter((r) => {
                        const status = getBloodSugarStatus(r.value, r.type)
                        return status.alert
                      }).length
                    }
                  </h3>
                  <p className="text-sm text-gray-600">Alert Readings</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{readings.length}</h3>
                  <p className="text-sm text-gray-600">Total Readings</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Weekly Blood Sugar Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-end justify-between h-64 px-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative h-48 w-16 bg-gray-200 rounded overflow-hidden">
                          {/* Post-meal */}
                          <motion.div
                            className="absolute bottom-0 left-0 w-1/3 bg-orange-500 rounded-l"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.postMeal / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          {/* Average */}
                          <motion.div
                            className="absolute bottom-0 left-1/3 w-1/3 bg-purple-500"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.avg / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                          />
                          {/* Fasting */}
                          <motion.div
                            className="absolute bottom-0 right-0 w-1/3 bg-blue-500 rounded-r"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.fasting / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">{day.day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600">Post-Meal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">Average</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Fasting</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Readings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {readings.map((reading, index) => {
                    const status = getBloodSugarStatus(reading.value, reading.type)
                    return (
                      <motion.div
                        key={reading.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Droplet className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-2xl font-bold text-gray-900">{reading.value} mg/dL</span>
                              <Badge className={getTypeColor(reading.type)}>{reading.type}</Badge>
                              <Badge className={status.color}>{status.status}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>📅 {reading.timestamp}</span>
                              {reading.notes && <span>📝 {reading.notes}</span>}
                            </div>
                          </div>
                        </div>
                        {status.alert && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

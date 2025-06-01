"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Activity, TrendingUp, AlertTriangle, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface HeartRateReading {
  id: number
  value: number
  timestamp: string
  type: "resting" | "active" | "recovery"
  notes?: string
}

export default function HeartRatePage() {
  const [heartRateReadings, setHeartRateReadings] = useState<HeartRateReading[]>([
    { id: 1, value: 72, timestamp: "2024-01-15 08:00", type: "resting", notes: "Morning reading" },
    { id: 2, value: 145, timestamp: "2024-01-15 10:30", type: "active", notes: "During workout" },
    { id: 3, value: 85, timestamp: "2024-01-15 11:00", type: "recovery", notes: "Post-workout" },
    { id: 4, value: 68, timestamp: "2024-01-15 14:00", type: "resting" },
    { id: 5, value: 75, timestamp: "2024-01-15 18:00", type: "resting" },
  ])

  const [newReading, setNewReading] = useState({
    value: "",
    type: "resting",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const currentHeartRate = 72
  const restingHeartRate = 68
  const maxHeartRate = 188 // 220 - age (assuming age 32)

  const weeklyData = [
    { day: "Mon", resting: 70, max: 165, avg: 85 },
    { day: "Tue", resting: 68, max: 172, avg: 82 },
    { day: "Wed", resting: 72, max: 158, avg: 88 },
    { day: "Thu", resting: 69, max: 180, avg: 90 },
    { day: "Fri", resting: 71, max: 145, avg: 78 },
    { day: "Sat", resting: 67, max: 175, avg: 85 },
    { day: "Sun", resting: 72, max: 160, avg: 83 },
  ]

  const heartRateZones = [
    { zone: "Resting", range: "60-70 bpm", color: "bg-blue-500", percentage: 15 },
    { zone: "Fat Burn", range: "70-130 bpm", color: "bg-green-500", percentage: 35 },
    { zone: "Cardio", range: "130-155 bpm", color: "bg-yellow-500", percentage: 30 },
    { zone: "Peak", range: "155-188 bpm", color: "bg-red-500", percentage: 20 },
  ]

  const handleAddReading = () => {
    if (newReading.value) {
      const reading: HeartRateReading = {
        id: Date.now(),
        value: Number.parseInt(newReading.value),
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
        type: newReading.type as "resting" | "active" | "recovery",
        notes: newReading.notes,
      }
      setHeartRateReadings([reading, ...heartRateReadings])
      setNewReading({ value: "", type: "resting", notes: "" })
      setIsDialogOpen(false)
    }
  }

  const getHeartRateStatus = (value: number, type: string) => {
    if (type === "resting") {
      if (value < 60) return { status: "Low", color: "bg-blue-100 text-blue-800" }
      if (value <= 100) return { status: "Normal", color: "bg-green-100 text-green-800" }
      return { status: "High", color: "bg-red-100 text-red-800" }
    }
    return { status: "Active", color: "bg-yellow-100 text-yellow-800" }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "resting":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-red-100 text-red-800"
      case "recovery":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Heart Rate Monitoring</h1>
                <p className="text-gray-600">Track your cardiovascular health and fitness levels</p>
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
                    <DialogTitle>Record Heart Rate</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      placeholder="Heart rate (bpm)"
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
                        <SelectItem value="resting">Resting</SelectItem>
                        <SelectItem value="active">During Exercise</SelectItem>
                        <SelectItem value="recovery">Post-Exercise</SelectItem>
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
            <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Current Heart Rate</h2>
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-5xl font-bold">{currentHeartRate}</span>
                      <span className="text-xl text-red-100">bpm</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-red-100">Resting HR:</span>
                        <span className="font-semibold">{restingHeartRate} bpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-100">Max HR:</span>
                        <span className="font-semibold">{maxHeartRate} bpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-100">Status:</span>
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
                          strokeDasharray={`${(currentHeartRate / maxHeartRate) * 100}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Heart className="h-12 w-12 mb-2 animate-pulse" />
                        <span className="text-lg font-semibold">
                          {((currentHeartRate / maxHeartRate) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Heart Rate Zones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Heart Rate Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {heartRateZones.map((zone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-16 h-16 ${zone.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-lg">{zone.percentage}%</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{zone.zone}</h3>
                      <p className="text-sm text-gray-600">{zone.range}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Weekly Heart Rate Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-end justify-between h-64 px-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative h-48 w-16 bg-gray-200 rounded overflow-hidden">
                          {/* Max HR */}
                          <motion.div
                            className="absolute bottom-0 left-0 w-1/3 bg-red-500 rounded-l"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.max / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          {/* Average HR */}
                          <motion.div
                            className="absolute bottom-0 left-1/3 w-1/3 bg-yellow-500"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.avg / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                          />
                          {/* Resting HR */}
                          <motion.div
                            className="absolute bottom-0 right-0 w-1/3 bg-blue-500 rounded-r"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.resting / 200) * 100}%` }}
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
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Max HR</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Average HR</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Resting HR</span>
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
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heartRateReadings.map((reading, index) => (
                    <motion.div
                      key={reading.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-2xl font-bold text-gray-900">{reading.value} bpm</span>
                            <Badge className={getTypeColor(reading.type)}>{reading.type}</Badge>
                            <Badge className={getHeartRateStatus(reading.value, reading.type).color}>
                              {getHeartRateStatus(reading.value, reading.type).status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 {reading.timestamp}</span>
                            {reading.notes && <span>📝 {reading.notes}</span>}
                          </div>
                        </div>
                      </div>
                      {reading.value > 100 && reading.type === "resting" && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
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

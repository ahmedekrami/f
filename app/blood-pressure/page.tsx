"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, Plus, Target, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface BloodPressureReading {
  id: number
  systolic: number
  diastolic: number
  pulse: number
  timestamp: string
  notes?: string
}

export default function BloodPressurePage() {
  const [readings, setReadings] = useState<BloodPressureReading[]>([
    { id: 1, systolic: 120, diastolic: 80, pulse: 72, timestamp: "2024-01-15 08:00", notes: "Morning reading" },
    { id: 2, systolic: 118, diastolic: 78, pulse: 68, timestamp: "2024-01-15 14:00" },
    { id: 3, systolic: 125, diastolic: 82, pulse: 75, timestamp: "2024-01-15 20:00", notes: "Evening reading" },
    { id: 4, systolic: 115, diastolic: 75, pulse: 70, timestamp: "2024-01-14 08:00" },
    { id: 5, systolic: 122, diastolic: 79, pulse: 73, timestamp: "2024-01-14 20:00" },
  ])

  const [newReading, setNewReading] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const currentSystolic = 120
  const currentDiastolic = 80
  const currentPulse = 72

  const weeklyData = [
    { day: "Mon", systolic: 118, diastolic: 78, pulse: 70 },
    { day: "Tue", systolic: 122, diastolic: 80, pulse: 72 },
    { day: "Wed", systolic: 115, diastolic: 75, pulse: 68 },
    { day: "Thu", systolic: 125, diastolic: 82, pulse: 75 },
    { day: "Fri", systolic: 120, diastolic: 79, pulse: 71 },
    { day: "Sat", systolic: 117, diastolic: 77, pulse: 69 },
    { day: "Sun", systolic: 120, diastolic: 80, pulse: 72 },
  ]

  const handleAddReading = () => {
    if (newReading.systolic && newReading.diastolic && newReading.pulse) {
      const reading: BloodPressureReading = {
        id: Date.now(),
        systolic: Number.parseInt(newReading.systolic),
        diastolic: Number.parseInt(newReading.diastolic),
        pulse: Number.parseInt(newReading.pulse),
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
        notes: newReading.notes,
      }
      setReadings([reading, ...readings])
      setNewReading({ systolic: "", diastolic: "", pulse: "", notes: "" })
      setIsDialogOpen(false)
    }
  }

  const getBloodPressureCategory = (systolic: number, diastolic: number) => {
    if (systolic < 90 || diastolic < 60) {
      return { category: "Low", color: "bg-blue-100 text-blue-800", alert: true }
    } else if (systolic < 120 && diastolic < 80) {
      return { category: "Normal", color: "bg-green-100 text-green-800", alert: false }
    } else if (systolic < 130 && diastolic < 80) {
      return { category: "Elevated", color: "bg-yellow-100 text-yellow-800", alert: true }
    } else if (systolic < 140 || diastolic < 90) {
      return { category: "Stage 1", color: "bg-orange-100 text-orange-800", alert: true }
    } else if (systolic < 180 || diastolic < 120) {
      return { category: "Stage 2", color: "bg-red-100 text-red-800", alert: true }
    } else {
      return { category: "Crisis", color: "bg-red-200 text-red-900", alert: true }
    }
  }

  const averageSystolic = readings.reduce((sum, reading) => sum + reading.systolic, 0) / readings.length
  const averageDiastolic = readings.reduce((sum, reading) => sum + reading.diastolic, 0) / readings.length
  const averagePulse = readings.reduce((sum, reading) => sum + reading.pulse, 0) / readings.length

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Pressure Monitoring</h1>
                <p className="text-gray-600">Track your cardiovascular health and blood pressure trends</p>
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
                    <DialogTitle>Record Blood Pressure</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Systolic (mmHg)"
                        value={newReading.systolic}
                        onChange={(e) => setNewReading({ ...newReading, systolic: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Diastolic (mmHg)"
                        value={newReading.diastolic}
                        onChange={(e) => setNewReading({ ...newReading, diastolic: e.target.value })}
                      />
                    </div>
                    <Input
                      type="number"
                      placeholder="Pulse (bpm)"
                      value={newReading.pulse}
                      onChange={(e) => setNewReading({ ...newReading, pulse: e.target.value })}
                    />
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
            <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Latest Reading</h2>
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-5xl font-bold">{currentSystolic}</span>
                      <span className="text-3xl font-bold">/{currentDiastolic}</span>
                      <span className="text-xl text-teal-100">mmHg</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-teal-100">Pulse:</span>
                        <span className="font-semibold">{currentPulse} bpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-100">Category:</span>
                        <span className="font-semibold">
                          {getBloodPressureCategory(currentSystolic, currentDiastolic).category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-100">Status:</span>
                        <span className="font-semibold">Normal Range</span>
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
                          strokeDasharray={`${(currentSystolic / 200) * 100}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Activity className="h-12 w-12 mb-2" />
                        <span className="text-lg font-semibold">{((currentSystolic / 200) * 100).toFixed(0)}%</span>
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
                        const category = getBloodPressureCategory(r.systolic, r.diastolic)
                        return category.category === "Normal"
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
                  <h3 className="text-2xl font-bold text-gray-900">
                    {averageSystolic.toFixed(0)}/{averageDiastolic.toFixed(0)}
                  </h3>
                  <p className="text-sm text-gray-600">Average BP</p>
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
                  <Activity className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{averagePulse.toFixed(0)}</h3>
                  <p className="text-sm text-gray-600">Average Pulse</p>
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
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      readings.filter((r) => {
                        const category = getBloodPressureCategory(r.systolic, r.diastolic)
                        return category.alert
                      }).length
                    }
                  </h3>
                  <p className="text-sm text-gray-600">Alert Readings</p>
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
                  Weekly Blood Pressure Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-end justify-between h-64 px-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative h-48 w-16 bg-gray-200 rounded overflow-hidden">
                          {/* Systolic */}
                          <motion.div
                            className="absolute bottom-0 left-0 w-1/2 bg-teal-500 rounded-l"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.systolic / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          {/* Diastolic */}
                          <motion.div
                            className="absolute bottom-0 right-0 w-1/2 bg-cyan-500 rounded-r"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.diastolic / 200) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-900">
                            {day.systolic}/{day.diastolic}
                          </p>
                          <p className="text-xs text-gray-500">{day.day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-600">Systolic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="text-gray-600">Diastolic</span>
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
                    const category = getBloodPressureCategory(reading.systolic, reading.diastolic)
                    return (
                      <motion.div
                        key={reading.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <Activity className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-2xl font-bold text-gray-900">
                                {reading.systolic}/{reading.diastolic} mmHg
                              </span>
                              <span className="text-lg text-gray-600">| {reading.pulse} bpm</span>
                              <Badge className={category.color}>{category.category}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>📅 {reading.timestamp}</span>
                              {reading.notes && <span>📝 {reading.notes}</span>}
                            </div>
                          </div>
                        </div>
                        {category.alert && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
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

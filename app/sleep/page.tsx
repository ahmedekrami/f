"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Moon, Sun, TrendingUp, Target, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import Sidebar from "@/components/sidebar"
import DashboardHeader from "@/components/dashboard-header"

interface SleepEntry {
  id: number
  bedtime: string
  wakeTime: string
  duration: number
  quality: string
  date: string
  notes?: string
}

export default function SleepPage() {
  const { t } = useLanguage()
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    {
      id: 1,
      bedtime: "22:30",
      wakeTime: "06:30",
      duration: 8.0,
      quality: "Good",
      date: "Today",
      notes: "Felt refreshed",
    },
    {
      id: 2,
      bedtime: "23:15",
      wakeTime: "06:45",
      duration: 7.5,
      quality: "Fair",
      date: "Yesterday",
      notes: "Woke up once during night",
    },
    {
      id: 3,
      bedtime: "22:00",
      wakeTime: "06:00",
      duration: 8.0,
      quality: "Excellent",
      date: "2 days ago",
      notes: "Perfect sleep",
    },
  ])

  const [newSleep, setNewSleep] = useState({
    bedtime: "",
    wakeTime: "",
    quality: "",
    notes: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const todaySleep = sleepEntries.find((entry) => entry.date === "Today")
  const averageSleep = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0) / sleepEntries.length
  const sleepGoal = 8.0 // hours

  const weeklyData = [
    { day: "Mon", duration: 7.5, quality: "Good" },
    { day: "Tue", duration: 8.0, quality: "Excellent" },
    { day: "Wed", duration: 6.5, quality: "Poor" },
    { day: "Thu", duration: 7.8, quality: "Good" },
    { day: "Fri", duration: 7.2, quality: "Fair" },
    { day: "Sat", duration: 9.0, quality: "Excellent" },
    { day: "Sun", duration: 8.0, quality: "Good" },
  ]

  const calculateDuration = (bedtime: string, wakeTime: string): number => {
    const bed = new Date(`2024-01-01 ${bedtime}`)
    let wake = new Date(`2024-01-01 ${wakeTime}`)

    // If wake time is earlier than bedtime, it's the next day
    if (wake < bed) {
      wake = new Date(`2024-01-02 ${wakeTime}`)
    }

    const diffMs = wake.getTime() - bed.getTime()
    return Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10 // Round to 1 decimal
  }

  const handleAddSleep = () => {
    if (newSleep.bedtime && newSleep.wakeTime && newSleep.quality) {
      const duration = calculateDuration(newSleep.bedtime, newSleep.wakeTime)
      const sleep: SleepEntry = {
        id: Date.now(),
        bedtime: newSleep.bedtime,
        wakeTime: newSleep.wakeTime,
        duration,
        quality: newSleep.quality,
        date: "Today",
        notes: newSleep.notes,
      }
      setSleepEntries([sleep, ...sleepEntries.filter((entry) => entry.date !== "Today")])
      setNewSleep({ bedtime: "", wakeTime: "", quality: "", notes: "" })
      setIsDialogOpen(false)
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Excellent":
        return "text-green-600 bg-green-100"
      case "Good":
        return "text-blue-600 bg-blue-100"
      case "Fair":
        return "text-yellow-600 bg-yellow-100"
      case "Poor":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <DashboardHeader />
        <div className="min-h-screen bg-[#caf0f8] py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#03045e] mb-2">Sleep Tracking</h1>
                  <p className="text-lg text-gray-600">Monitor your sleep patterns and improve your rest quality</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#0077b6] hover:bg-[#00b4de]">
                      <Plus className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      Log Sleep
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Log Sleep Session</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Bedtime</label>
                          <Input
                            type="time"
                            value={newSleep.bedtime}
                            onChange={(e) => setNewSleep({ ...newSleep, bedtime: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Wake Time</label>
                          <Input
                            type="time"
                            value={newSleep.wakeTime}
                            onChange={(e) => setNewSleep({ ...newSleep, wakeTime: e.target.value })}
                          />
                        </div>
                      </div>

                      <Select
                        value={newSleep.quality}
                        onValueChange={(value) => setNewSleep({ ...newSleep, quality: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How was your sleep quality?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Notes (optional)"
                        value={newSleep.notes}
                        onChange={(e) => setNewSleep({ ...newSleep, notes: e.target.value })}
                      />

                      <Button onClick={handleAddSleep} className="w-full bg-[#0077b6] hover:bg-[#00b4de]">
                        Log Sleep
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Sleep Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                      <Moon className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      Last Night
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                        <span className="text-2xl font-bold text-[#03045e]">
                          {todaySleep ? todaySleep.duration : "0"}h
                        </span>
                        <span className="text-sm text-gray-500">/ {sleepGoal}h</span>
                      </div>
                      <Progress value={todaySleep ? (todaySleep.duration / sleepGoal) * 100 : 0} className="h-2" />
                      <div className="text-xs text-gray-500">
                        {todaySleep ? `Quality: ${todaySleep.quality}` : "No sleep logged"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Sleep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                        <span className="text-2xl font-bold text-[#03045e]">{averageSleep.toFixed(1)}h</span>
                        <span className="text-sm text-gray-500">per night</span>
                      </div>
                      <Progress value={(averageSleep / sleepGoal) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Sleep Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                        <span className="text-2xl font-bold text-[#03045e]">{sleepGoal}h</span>
                        <span className="text-sm text-gray-500">target</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {todaySleep && todaySleep.duration >= sleepGoal
                          ? "Goal achieved!"
                          : "Keep working towards your goal"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">Sleep Debt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                        <span className="text-2xl font-bold text-[#03045e]">
                          {Math.max(0, sleepGoal * 7 - weeklyData.reduce((sum, day) => sum + day.duration, 0)).toFixed(
                            1,
                          )}
                          h
                        </span>
                        <span className="text-sm text-gray-500">this week</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {weeklyData.reduce((sum, day) => sum + day.duration, 0) >= sleepGoal * 7
                          ? "No sleep debt!"
                          : "Try to catch up on sleep"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sleep Pattern Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#03045e] flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                    Weekly Sleep Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Duration Chart */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Sleep Duration (hours)</h4>
                      <div className="flex items-end space-x-2 rtl:space-x-reverse h-32">
                        {weeklyData.map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-[#0077b6] rounded-t transition-all duration-500 hover:bg-[#00b4de] relative"
                              style={{ height: `${(day.duration / 10) * 100}%` }}
                            >
                              {day.duration >= sleepGoal && (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                  <Target className="h-3 w-3 text-green-500" />
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                            <span className="text-xs font-medium text-[#03045e]">{day.duration}h</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-600">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <div className="w-3 h-3 bg-[#0077b6] rounded"></div>
                            <span>Sleep Duration</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Target className="h-3 w-3 text-green-500" />
                            <span>Goal Achieved</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quality Overview */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Sleep Quality This Week</h4>
                      <div className="grid grid-cols-7 gap-2">
                        {weeklyData.map((day, index) => (
                          <div key={index} className="text-center">
                            <div
                              className={`w-full h-8 rounded flex items-center justify-center text-xs font-medium ${getQualityColor(day.quality)}`}
                            >
                              {day.quality.charAt(0)}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sleep History */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#03045e] flex items-center">
                    <Clock className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                    Recent Sleep Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sleepEntries.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-[#90e0ef] rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <span className="font-semibold text-[#03045e]">{entry.date}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getQualityColor(entry.quality)}`}>
                              {entry.quality}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Moon className="h-4 w-4 text-gray-600" />
                              <span className="text-gray-600">Bedtime:</span>
                              <span className="font-medium text-[#03045e]">{entry.bedtime}</span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Sun className="h-4 w-4 text-gray-600" />
                              <span className="text-gray-600">Wake:</span>
                              <span className="font-medium text-[#03045e]">{entry.wakeTime}</span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium text-[#03045e]">{entry.duration}h</span>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                              {entry.notes && (
                                <div>
                                  <span className="text-gray-600">Notes:</span>
                                  <span className="font-medium text-[#03045e] ml-1 rtl:ml-0 rtl:mr-1">
                                    {entry.notes}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sleep Tips */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#03045e]">Sleep Improvement Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#90e0ef] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Moon className="h-6 w-6 text-[#0077b6]" />
                      </div>
                      <h3 className="font-semibold text-[#03045e] mb-2">Consistent Schedule</h3>
                      <p className="text-sm text-gray-600">Go to bed and wake up at the same time every day</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#90e0ef] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-[#0077b6]" />
                      </div>
                      <h3 className="font-semibold text-[#03045e] mb-2">Sleep Environment</h3>
                      <p className="text-sm text-gray-600">Keep your bedroom cool, dark, and quiet</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#90e0ef] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-6 w-6 text-[#0077b6]" />
                      </div>
                      <h3 className="font-semibold text-[#03045e] mb-2">Wind Down Routine</h3>
                      <p className="text-sm text-gray-600">Establish a relaxing pre-sleep routine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

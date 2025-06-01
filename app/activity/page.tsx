"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Activity, TrendingUp, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"

interface WorkoutEntry {
  id: number
  type: string
  duration: number
  calories: number
  intensity: string
  time: string
  date: string
}

export default function ActivityPage() {
  const { t } = useLanguage()
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([
    {
      id: 1,
      type: "Running",
      duration: 30,
      calories: 300,
      intensity: "Moderate",
      time: "07:00",
      date: "Today",
    },
    {
      id: 2,
      type: "Weight Training",
      duration: 45,
      calories: 250,
      intensity: "High",
      time: "18:30",
      date: "Today",
    },
    {
      id: 3,
      type: "Yoga",
      duration: 60,
      calories: 180,
      intensity: "Low",
      time: "19:30",
      date: "Yesterday",
    },
  ])

  const [newWorkout, setNewWorkout] = useState({
    type: "",
    duration: "",
    calories: "",
    intensity: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const todayWorkouts = workouts.filter((workout) => workout.date === "Today")
  const totalDuration = todayWorkouts.reduce((sum, workout) => sum + workout.duration, 0)
  const totalCalories = todayWorkouts.reduce((sum, workout) => sum + workout.calories, 0)
  const dailyGoal = 60 // minutes
  const calorieGoal = 400

  const weeklyData = [
    { day: "Mon", duration: 45, calories: 350 },
    { day: "Tue", duration: 60, calories: 420 },
    { day: "Wed", duration: 30, calories: 280 },
    { day: "Thu", duration: 75, calories: 500 },
    { day: "Fri", duration: 40, calories: 320 },
    { day: "Sat", duration: 90, calories: 600 },
    { day: "Sun", duration: 75, calories: 550 },
  ]

  const handleAddWorkout = () => {
    if (newWorkout.type && newWorkout.duration && newWorkout.calories && newWorkout.intensity) {
      const workout: WorkoutEntry = {
        id: Date.now(),
        type: newWorkout.type,
        duration: Number.parseInt(newWorkout.duration),
        calories: Number.parseInt(newWorkout.calories),
        intensity: newWorkout.intensity,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        date: "Today",
      }
      setWorkouts([...workouts, workout])
      setNewWorkout({ type: "", duration: "", calories: "", intensity: "" })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteWorkout = (id: number) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  return (
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
              <h1 className="text-3xl lg:text-4xl font-bold text-[#03045e] mb-2">Activity Tracking</h1>
              <p className="text-lg text-gray-600">Monitor your workouts and physical activities</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#0077b6] hover:bg-[#00b4de]">
                  <Plus className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                  Log Workout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log New Workout</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select
                    value={newWorkout.type}
                    onValueChange={(value) => setNewWorkout({ ...newWorkout, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Running">Running</SelectItem>
                      <SelectItem value="Cycling">Cycling</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                      <SelectItem value="Weight Training">Weight Training</SelectItem>
                      <SelectItem value="Yoga">Yoga</SelectItem>
                      <SelectItem value="Walking">Walking</SelectItem>
                      <SelectItem value="Dancing">Dancing</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Duration (minutes)"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Calories burned"
                      value={newWorkout.calories}
                      onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
                    />
                  </div>

                  <Select
                    value={newWorkout.intensity}
                    onValueChange={(value) => setNewWorkout({ ...newWorkout, intensity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Very High">Very High</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={handleAddWorkout} className="w-full bg-[#0077b6] hover:bg-[#00b4de]">
                    Log Workout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Timer className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                  Duration Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold text-[#03045e]">{totalDuration}</span>
                    <span className="text-sm text-gray-500">/ {dailyGoal} min</span>
                  </div>
                  <Progress value={(totalDuration / dailyGoal) * 100} className="h-2" />
                  <div className="text-xs text-gray-500">
                    {dailyGoal - totalDuration > 0
                      ? `${dailyGoal - totalDuration} min remaining`
                      : "Daily goal achieved!"}
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
                <CardTitle className="text-sm font-medium text-gray-600">Calories Burned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold text-[#03045e]">{totalCalories}</span>
                    <span className="text-sm text-gray-500">/ {calorieGoal} kcal</span>
                  </div>
                  <Progress value={(totalCalories / calorieGoal) * 100} className="h-2" />
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
                <CardTitle className="text-sm font-medium text-gray-600">Workouts Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold text-[#03045e]">{todayWorkouts.length}</span>
                    <span className="text-sm text-gray-500">sessions</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {todayWorkouts.length > 0 ? "Great job staying active!" : "Start your first workout today"}
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
                <CardTitle className="text-sm font-medium text-gray-600">Weekly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold text-[#03045e]">
                      {Math.round(weeklyData.reduce((sum, day) => sum + day.duration, 0) / 7)}
                    </span>
                    <span className="text-sm text-gray-500">min/day</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / 7)} kcal/day
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#03045e] flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                Weekly Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Duration Chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Daily Duration (minutes)</h4>
                  <div className="flex items-end space-x-2 rtl:space-x-reverse h-32">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-[#0077b6] rounded-t transition-all duration-500 hover:bg-[#00b4de]"
                          style={{ height: `${(day.duration / 100) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                        <span className="text-xs font-medium text-[#03045e]">{day.duration}m</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calories Chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Daily Calories Burned</h4>
                  <div className="flex items-end space-x-2 rtl:space-x-reverse h-32">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-[#00b4de] rounded-t transition-all duration-500 hover:bg-[#90e0ef]"
                          style={{ height: `${(day.calories / 700) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                        <span className="text-xs font-medium text-[#03045e]">{day.calories}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workouts List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#03045e] flex items-center">
                <Activity className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                Recent Workouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-[#90e0ef] rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <span className="font-semibold text-[#03045e]">{workout.type}</span>
                        <span className="text-sm text-gray-600">{workout.time}</span>
                        <span className="text-xs bg-[#0077b6] text-white px-2 py-1 rounded-full">
                          {workout.intensity}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium text-[#03045e] ml-1 rtl:ml-0 rtl:mr-1">
                            {workout.duration} min
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Calories:</span>
                          <span className="font-medium text-[#03045e] ml-1 rtl:ml-0 rtl:mr-1">
                            {workout.calories} kcal
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-[#03045e] ml-1 rtl:ml-0 rtl:mr-1">{workout.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button size="sm" variant="outline" className="hover:bg-[#0077b6] hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeleteWorkout(workout.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

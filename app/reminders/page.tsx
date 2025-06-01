"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Bell, Clock, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface Reminder {
  id: number
  title: string
  description: string
  time: string
  frequency: string
  category: string
  isActive: boolean
  nextDue: string
  icon: string
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      title: "Stretching Session",
      description: "48 minutes of stretching exercises",
      time: "08:00",
      frequency: "daily",
      category: "exercise",
      isActive: true,
      nextDue: "Today at 8:00 AM",
      icon: "🧘‍♀️",
    },
    {
      id: 2,
      title: "Mind Training",
      description: "32 minutes of meditation and mindfulness",
      time: "19:00",
      frequency: "daily",
      category: "mental",
      isActive: true,
      nextDue: "Today at 7:00 PM",
      icon: "🧠",
    },
    {
      id: 3,
      title: "Water Break",
      description: "Drink a glass of water",
      time: "10:00",
      frequency: "every 2 hours",
      category: "hydration",
      isActive: true,
      nextDue: "In 2 hours",
      icon: "💧",
    },
    {
      id: 4,
      title: "Take Vitamins",
      description: "Daily vitamin supplements",
      time: "09:00",
      frequency: "daily",
      category: "medication",
      isActive: true,
      nextDue: "Tomorrow at 9:00 AM",
      icon: "💊",
    },
    {
      id: 5,
      title: "Evening Walk",
      description: "30 minutes outdoor walk",
      time: "18:30",
      frequency: "daily",
      category: "exercise",
      isActive: false,
      nextDue: "Paused",
      icon: "🚶‍♂️",
    },
    {
      id: 6,
      title: "Sleep Preparation",
      description: "Wind down routine before bed",
      time: "22:00",
      frequency: "daily",
      category: "sleep",
      isActive: true,
      nextDue: "Today at 10:00 PM",
      icon: "😴",
    },
  ])

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    time: "",
    frequency: "daily",
    category: "general",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now(),
        title: newReminder.title,
        description: newReminder.description,
        time: newReminder.time,
        frequency: newReminder.frequency,
        category: newReminder.category,
        isActive: true,
        nextDue: `Today at ${newReminder.time}`,
        icon: getCategoryIcon(newReminder.category),
      }
      setReminders([...reminders, reminder])
      setNewReminder({ title: "", description: "", time: "", frequency: "daily", category: "general" })
      setIsDialogOpen(false)
    }
  }

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              isActive: !reminder.isActive,
              nextDue: !reminder.isActive ? `Today at ${reminder.time}` : "Paused",
            }
          : reminder,
      ),
    )
  }

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exercise":
        return "🏃‍♂️"
      case "mental":
        return "🧠"
      case "hydration":
        return "💧"
      case "medication":
        return "💊"
      case "sleep":
        return "😴"
      case "nutrition":
        return "🥗"
      default:
        return "⏰"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "exercise":
        return "bg-blue-100 text-blue-800"
      case "mental":
        return "bg-purple-100 text-purple-800"
      case "hydration":
        return "bg-cyan-100 text-cyan-800"
      case "medication":
        return "bg-red-100 text-red-800"
      case "sleep":
        return "bg-indigo-100 text-indigo-800"
      case "nutrition":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeReminders = reminders.filter((r) => r.isActive)
  const upcomingReminders = reminders.filter((r) => r.isActive && r.nextDue.includes("Today"))

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Reminders</h1>
                <p className="text-gray-600">Stay on track with your health routine</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reminder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Reminder</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Reminder title"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    />
                    <Input
                      placeholder="Description (optional)"
                      value={newReminder.description}
                      onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    />
                    <Input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    />
                    <Select
                      value={newReminder.frequency}
                      onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="every 2 hours">Every 2 hours</SelectItem>
                        <SelectItem value="every 4 hours">Every 4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={newReminder.category}
                      onValueChange={(value) => setNewReminder({ ...newReminder, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="mental">Mental Health</SelectItem>
                        <SelectItem value="hydration">Hydration</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="sleep">Sleep</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddReminder} className="w-full bg-[#1a237e] hover:bg-[#3949ab]">
                      Create Reminder
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{activeReminders.length}</h3>
                  <p className="text-sm text-gray-600">Active Reminders</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{upcomingReminders.length}</h3>
                  <p className="text-sm text-gray-600">Due Today</p>
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
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">12</h3>
                  <p className="text-sm text-gray-600">Completed Today</p>
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
                  <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  <p className="text-sm text-gray-600">Missed</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Reminders List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>All Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder, index) => (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        reminder.isActive ? "bg-white border-gray-200" : "bg-gray-50 border-gray-100 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{reminder.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="font-semibold text-gray-900">{reminder.title}</h3>
                              <Badge className={getCategoryColor(reminder.category)}>{reminder.category}</Badge>
                              {reminder.nextDue.includes("Today") && reminder.isActive && (
                                <Badge className="bg-orange-100 text-orange-800">Due Today</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>⏰ {reminder.time}</span>
                              <span>🔄 {reminder.frequency}</span>
                              <span>📅 {reminder.nextDue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Switch checked={reminder.isActive} onCheckedChange={() => toggleReminder(reminder.id)} />
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Target, Edit, Trash2, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface Goal {
  id: number
  title: string
  category: string
  target: number
  current: number
  unit: string
  deadline: string
  status: "active" | "completed" | "paused"
  priority: "high" | "medium" | "low"
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Daily Steps Goal",
      category: "fitness",
      target: 10000,
      current: 8750,
      unit: "steps",
      deadline: "2024-12-31",
      status: "active",
      priority: "high",
    },
    {
      id: 2,
      title: "Weight Loss Target",
      category: "weight",
      target: 75,
      current: 78,
      unit: "kg",
      deadline: "2024-06-30",
      status: "active",
      priority: "high",
    },
    {
      id: 3,
      title: "Water Intake Goal",
      category: "hydration",
      target: 8,
      current: 7.2,
      unit: "glasses",
      deadline: "2024-12-31",
      status: "active",
      priority: "medium",
    },
    {
      id: 4,
      title: "Sleep Quality",
      category: "sleep",
      target: 8,
      current: 7.6,
      unit: "hours",
      deadline: "2024-12-31",
      status: "active",
      priority: "medium",
    },
  ])

  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "",
    target: "",
    unit: "",
    deadline: "",
    priority: "medium",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.target && newGoal.unit && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        category: newGoal.category,
        target: Number.parseFloat(newGoal.target),
        current: 0,
        unit: newGoal.unit,
        deadline: newGoal.deadline,
        status: "active",
        priority: newGoal.priority as "high" | "medium" | "low",
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", category: "", target: "", unit: "", deadline: "", priority: "medium" })
      setIsDialogOpen(false)
    }
  }

  const getProgressPercentage = (goal: Goal) => {
    if (goal.category === "weight") {
      // For weight loss, calculate differently
      const totalLoss = 85 - goal.target // Assuming starting weight of 85kg
      const currentLoss = 85 - goal.current
      return Math.min((currentLoss / totalLoss) * 100, 100)
    }
    return Math.min((goal.current / goal.target) * 100, 100)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fitness":
        return "🏃‍♂️"
      case "weight":
        return "⚖️"
      case "hydration":
        return "💧"
      case "sleep":
        return "😴"
      case "nutrition":
        return "🥗"
      default:
        return "🎯"
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Goals</h1>
                <p className="text-gray-600">Set and track your health and fitness objectives</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Goal title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="weight">Weight</SelectItem>
                        <SelectItem value="hydration">Hydration</SelectItem>
                        <SelectItem value="sleep">Sleep</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Target value"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                      />
                      <Input
                        placeholder="Unit (e.g., steps, kg)"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                      />
                    </div>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value) => setNewGoal({ ...newGoal, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddGoal} className="w-full bg-[#1a237e] hover:bg-[#3949ab]">
                      Create Goal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {goals.filter((g) => g.status === "active").length}
                  </h3>
                  <p className="text-sm text-gray-600">Active Goals</p>
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
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {goals.filter((g) => g.status === "completed").length}
                  </h3>
                  <p className="text-sm text-gray-600">Completed</p>
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
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {Math.round(goals.reduce((sum, goal) => sum + getProgressPercentage(goal), 0) / goals.length)}%
                  </h3>
                  <p className="text-sm text-gray-600">Avg Progress</p>
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
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {goals.filter((g) => g.priority === "high").length}
                  </h3>
                  <p className="text-sm text-gray-600">High Priority</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Goals List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)}`}>
                                {goal.priority} priority
                              </span>
                              <span className="text-sm text-gray-500">Due: {goal.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium">
                            {goal.current} / {goal.target} {goal.unit}
                          </span>
                        </div>
                        <Progress value={getProgressPercentage(goal)} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {getProgressPercentage(goal).toFixed(1)}% complete
                          </span>
                          <span className="text-sm text-gray-500">
                            {goal.category === "weight"
                              ? `${(goal.current - goal.target).toFixed(1)} ${goal.unit} to go`
                              : `${(goal.target - goal.current).toFixed(1)} ${goal.unit} remaining`}
                          </span>
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

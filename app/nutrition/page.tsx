"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Utensils, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"

interface Meal {
  id: number
  type: string
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      type: "Breakfast",
      food: "Oatmeal with berries",
      calories: 350,
      protein: 12,
      carbs: 65,
      fat: 8,
      time: "08:30",
    },
    {
      id: 2,
      type: "Lunch",
      food: "Grilled chicken salad",
      calories: 450,
      protein: 35,
      carbs: 20,
      fat: 25,
      time: "12:45",
    },
    {
      id: 3,
      type: "Dinner",
      food: "Salmon with vegetables",
      calories: 520,
      protein: 40,
      carbs: 30,
      fat: 28,
      time: "19:15",
    },
  ])

  const [newMeal, setNewMeal] = useState({
    type: "",
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const calorieGoal = 2200
  const proteinGoal = 150
  const carbsGoal = 275
  const fatGoal = 73

  const handleAddMeal = () => {
    if (newMeal.type && newMeal.food && newMeal.calories) {
      const meal: Meal = {
        id: Date.now(),
        type: newMeal.type,
        food: newMeal.food,
        calories: Number.parseInt(newMeal.calories),
        protein: Number.parseInt(newMeal.protein) || 0,
        carbs: Number.parseInt(newMeal.carbs) || 0,
        fat: Number.parseInt(newMeal.fat) || 0,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMeals([...meals, meal])
      setNewMeal({ type: "", food: "", calories: "", protein: "", carbs: "", fat: "" })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id))
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Tracking</h1>
                <p className="text-gray-600">Monitor your daily food intake and nutritional goals</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1a237e] hover:bg-[#3949ab]">
                    <Plus className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    Add Meal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Meal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Select value={newMeal.type} onValueChange={(value) => setNewMeal({ ...newMeal, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      placeholder="Food description"
                      value={newMeal.food}
                      onChange={(e) => setNewMeal({ ...newMeal, food: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Calories"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Protein (g)"
                        value={newMeal.protein}
                        onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Carbs (g)"
                        value={newMeal.carbs}
                        onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Fat (g)"
                        value={newMeal.fat}
                        onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleAddMeal} className="w-full bg-[#1a237e] hover:bg-[#3949ab]">
                      Add Meal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Nutrition Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Target className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                    Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <span className="text-2xl font-bold text-gray-900">{totalCalories}</span>
                      <span className="text-sm text-gray-500">/ {calorieGoal} kcal</span>
                    </div>
                    <Progress value={(totalCalories / calorieGoal) * 100} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {calorieGoal - totalCalories > 0
                        ? `${calorieGoal - totalCalories} kcal remaining`
                        : "Goal achieved!"}
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
                  <CardTitle className="text-sm font-medium text-gray-600">Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <span className="text-2xl font-bold text-gray-900">{totalProtein}g</span>
                      <span className="text-sm text-gray-500">/ {proteinGoal}g</span>
                    </div>
                    <Progress value={(totalProtein / proteinGoal) * 100} className="h-2" />
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
                  <CardTitle className="text-sm font-medium text-gray-600">Carbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <span className="text-2xl font-bold text-gray-900">{totalCarbs}g</span>
                      <span className="text-sm text-gray-500">/ {carbsGoal}g</span>
                    </div>
                    <Progress value={(totalCarbs / carbsGoal) * 100} className="h-2" />
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
                  <CardTitle className="text-sm font-medium text-gray-600">Fat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <span className="text-2xl font-bold text-gray-900">{totalFat}g</span>
                      <span className="text-sm text-gray-500">/ {fatGoal}g</span>
                    </div>
                    <Progress value={(totalFat / fatGoal) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Meals List */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Utensils className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <span className="font-semibold text-gray-900">{meal.type}</span>
                          <span className="text-sm text-gray-600">{meal.time}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{meal.food}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Calories:</span>
                            <span className="font-medium text-gray-900 ml-1 rtl:ml-0 rtl:mr-1">{meal.calories}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Protein:</span>
                            <span className="font-medium text-gray-900 ml-1 rtl:ml-0 rtl:mr-1">{meal.protein}g</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Carbs:</span>
                            <span className="font-medium text-gray-900 ml-1 rtl:ml-0 rtl:mr-1">{meal.carbs}g</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Fat:</span>
                            <span className="font-medium text-gray-900 ml-1 rtl:ml-0 rtl:mr-1">{meal.fat}g</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline" className="hover:bg-[#1a237e] hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-500 hover:text-white"
                          onClick={() => handleDeleteMeal(meal.id)}
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
    </div>
  )
}

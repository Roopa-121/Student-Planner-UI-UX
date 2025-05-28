"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Clock } from "lucide-react"

export function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState([
    { id: 1, title: "Math Assignment", time: "14:00", category: "Study", priority: "high", color: "purple" },
    { id: 2, title: "History Reading", time: "16:30", category: "Study", priority: "medium", color: "blue" },
    { id: 3, title: "Gym Workout", time: "18:00", category: "Personal", priority: "low", color: "green" },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    category: "Study",
    priority: "medium",
    color: "purple",
  })

  const addTask = () => {
    if (newTask.title && newTask.time) {
      setTasks([...tasks, { ...newTask, id: Date.now() }])
      setNewTask({ title: "", time: "", category: "Study", priority: "medium", color: "purple" })
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Study Planner
          </h1>
          <p className="text-gray-600 mt-1">Organize your academic journey</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-purple-700">Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Study">📚 Study</SelectItem>
                    <SelectItem value="Personal">👤 Personal</SelectItem>
                    <SelectItem value="Work">💼 Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">🔴 High</SelectItem>
                    <SelectItem value="medium">🟡 Medium</SelectItem>
                    <SelectItem value="low">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addTask} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-purple-50 border border-purple-200">
          <TabsTrigger value="daily" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Daily View
          </TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Weekly View
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Monthly View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-5 h-5" />
                {formatDate(selectedDate)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                  >
                    <div className={`w-4 h-4 rounded-full bg-${task.color}-400`}></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{task.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-sm text-gray-500">{task.time}</span>
                        <Badge variant="outline" className="text-xs">
                          {task.category === "Study" ? "📚" : task.category === "Personal" ? "👤" : "💼"}{" "}
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center p-4 rounded-lg bg-purple-50">
                    <h3 className="font-medium text-purple-700 mb-2">{day}</h3>
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-purple-200 rounded"></div>
                      <div className="w-full h-2 bg-pink-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">
                {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center p-2 font-medium text-purple-700">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(selectedDate).map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square p-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${
                      day ? "bg-purple-50 hover:bg-purple-100 text-gray-800" : "bg-transparent"
                    }`}
                  >
                    {day && (
                      <div>
                        <span className="text-sm font-medium">{day}</span>
                        {day <= 15 && (
                          <div className="mt-1 space-y-1">
                            <div className="w-full h-1 bg-purple-300 rounded"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

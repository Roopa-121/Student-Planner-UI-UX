"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Filter, CheckCircle, Trash2, GripVertical } from "lucide-react"

interface Task {
  id: number
  title: string
  completed: boolean
  category: string
  priority: "high" | "medium" | "low"
  dueDate?: string
}

export function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete Math Assignment",
      completed: false,
      category: "Study",
      priority: "high",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Read History Chapter 5",
      completed: true,
      category: "Study",
      priority: "medium",
      dueDate: "2024-01-14",
    },
    {
      id: 3,
      title: "Prepare for Science Quiz",
      completed: false,
      category: "Study",
      priority: "high",
      dueDate: "2024-01-16",
    },
    { id: 4, title: "Buy groceries", completed: false, category: "Personal", priority: "low" },
    { id: 5, title: "Call dentist", completed: true, category: "Personal", priority: "medium" },
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
        category: "Study",
        priority: "medium",
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.completed) return false
    if (filter === "pending" && task.completed) return false
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const totalCount = tasks.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const motivationalMessages = [
    "You're doing amazing! Keep it up! 🌟",
    "Every task completed is a step closer to your goals! 💪",
    "You're on fire today! 🔥",
    "Great job staying organized! ✨",
    "You've got this! One task at a time! 🎯",
  ]

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            To-Do List
          </h1>
          <p className="text-gray-600 mt-1">Stay organized and productive</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-purple-700">
            {completedCount}/{totalCount}
          </div>
          <div className="text-sm text-gray-500">Tasks completed</div>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-700">Today's Progress</h3>
            <span className="text-purple-600 font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          {completedCount > 0 && <p className="text-purple-600 text-center italic">{getRandomMessage()}</p>}
        </CardContent>
      </Card>

      {/* Add New Task */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
        <CardContent className="p-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1 border-purple-200 focus:border-purple-400"
            />
            <Button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Filter className="w-4 h-4 text-purple-600" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 border-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 border-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Study">📚 Study</SelectItem>
                <SelectItem value="Personal">👤 Personal</SelectItem>
                <SelectItem value="Work">💼 Work</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-700">
            {filter === "all" && "All Tasks"}
            {filter === "pending" && "Pending Tasks"}
            {filter === "completed" && "Completed Tasks"}
            {categoryFilter !== "all" && ` - ${categoryFilter}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-300" />
              <p>
                No tasks found.{" "}
                {filter === "pending" ? "Great job! All tasks completed!" : "Add some tasks to get started."}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  task.completed
                    ? "bg-green-50 border-green-200 opacity-75"
                    : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                }`}
              >
                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />

                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />

                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {task.category === "Study" ? "📚" : task.category === "Personal" ? "👤" : "💼"} {task.category}
                    </Badge>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className="text-xs capitalize"
                    >
                      {task.priority}
                    </Badge>
                    {task.dueDate && <span className="text-xs text-gray-500">Due: {task.dueDate}</span>}
                  </div>
                </div>

                <Button
                  onClick={() => deleteTask(task.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

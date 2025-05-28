"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target, Flame, Play, Pause, RotateCcw, CheckSquare, Timer } from "lucide-react"

export function Dashboard() {
  const [time, setTime] = useState(new Date())
  const [timerActive, setTimerActive] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1)
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1)
          setTimerSeconds(59)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, timerMinutes, timerSeconds])

  const resetTimer = () => {
    setTimerActive(false)
    setTimerMinutes(25)
    setTimerSeconds(0)
  }

  const upcomingTasks = [
    { title: "Math Assignment", time: "2:00 PM", priority: "high" },
    { title: "History Reading", time: "4:30 PM", priority: "medium" },
    { title: "Science Lab Report", time: "6:00 PM", priority: "low" },
  ]

  const quotes = [
    "The future belongs to those who believe in the beauty of their dreams. ✨",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. 🌟",
    "Education is the most powerful weapon which you can use to change the world. 📚",
    "The only way to do great work is to love what you do. 💫",
  ]

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Greeting Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Hello, Luna! ✨
        </h1>
        <p className="text-xl text-gray-600">Ready to conquer today?</p>
        <p className="text-lg text-gray-500 mt-2">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">8</p>
                <p className="text-sm text-purple-600">Tasks Left</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">4.5h</p>
                <p className="text-sm text-pink-600">Study Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <Flame className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">12</p>
                <p className="text-sm text-blue-600">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">85%</p>
                <p className="text-sm text-green-600">Goal Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <BookOpen className="w-5 h-5" />
              Upcoming Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.time}</p>
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
          </CardContent>
        </Card>

        {/* Mini Pomodoro Timer */}
        <Card className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <Timer className="w-5 h-5" />
              Focus Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 to-purple-200"></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setTimerActive(!timerActive)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button onClick={resetTimer} variant="outline" className="border-pink-200 hover:bg-pink-50">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Affirmation */}
      <Card className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Daily Inspiration</h3>
          <p className="text-gray-700 text-lg italic">{currentQuote}</p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Calendar, Flame, BookOpen, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export function ProgressPage() {
  const weeklyData = [
    { day: "Mon", hours: 4.5, tasks: 8 },
    { day: "Tue", hours: 3.2, tasks: 6 },
    { day: "Wed", hours: 5.1, tasks: 10 },
    { day: "Thu", hours: 2.8, tasks: 5 },
    { day: "Fri", hours: 4.0, tasks: 7 },
    { day: "Sat", hours: 6.2, tasks: 12 },
    { day: "Sun", hours: 3.5, tasks: 6 },
  ]

  const monthlyGoals = [
    { subject: "Mathematics", progress: 85, target: 40, completed: 34 },
    { subject: "Science", progress: 72, target: 35, completed: 25 },
    { subject: "History", progress: 90, target: 30, completed: 27 },
    { subject: "English", progress: 68, target: 25, completed: 17 },
  ]

  const streakData = [
    { week: "Week 1", days: 5 },
    { week: "Week 2", days: 7 },
    { week: "Week 3", days: 6 },
    { week: "Week 4", days: 7 },
  ]

  const achievements = [
    { title: "First Week Streak", description: "Completed 7 days in a row", icon: "🔥", unlocked: true },
    { title: "Early Bird", description: "Started studying before 8 AM", icon: "🌅", unlocked: true },
    { title: "Night Owl", description: "Studied past 10 PM", icon: "🦉", unlocked: false },
    { title: "Marathon Runner", description: "Studied for 8+ hours in a day", icon: "🏃", unlocked: true },
    { title: "Consistency King", description: "30-day study streak", icon: "👑", unlocked: false },
    { title: "Goal Crusher", description: "Exceeded monthly goal", icon: "💪", unlocked: true },
  ]

  const moodData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 4 },
  ]

  const getMoodEmoji = (mood: number) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"]
    return emojis[mood - 1] || "😐"
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Progress Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Track your academic journey and celebrate achievements</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700">28.3h</p>
                <p className="text-sm text-purple-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                <Target className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">54</p>
                <p className="text-sm text-pink-600">Tasks Done</p>
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
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">+15%</p>
                <p className="text-sm text-green-600">vs Last Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-50 border border-purple-200">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Goals
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-white data-[state=active]:text-purple-700"
          >
            Achievements
          </TabsTrigger>
          <TabsTrigger value="mood" className="data-[state=active]:bg-white data-[state=active]:text-purple-700">
            Mood
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Study Hours Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="day" stroke="#8b5cf6" />
                    <YAxis stroke="#8b5cf6" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tasks Completed Chart */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <BookOpen className="w-5 h-5" />
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="day" stroke="#8b5cf6" />
                    <YAxis stroke="#8b5cf6" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="tasks" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Streak Calendar */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Calendar className="w-5 h-5" />
                Study Streak Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                      i < 20
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                        : i < 25
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  <span>Study day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-100"></div>
                  <span>Partial day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-100"></div>
                  <span>No study</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Target className="w-5 h-5" />
                Monthly Subject Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {monthlyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{goal.subject}</h\

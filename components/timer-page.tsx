"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Coffee, BookOpen } from "lucide-react"

export function TimerPage() {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [sessionLength, setSessionLength] = useState(25)
  const [isBreak, setIsBreak] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [sessions, setSessions] = useState(0)

  const totalTime = sessionLength * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Session completed
      setIsActive(false)
      setSessions(sessions + 1)

      if (!isBreak) {
        // Start break
        setIsBreak(true)
        setTimeLeft(5 * 60) // 5 minute break
      } else {
        // End break, start new session
        setIsBreak(false)
        setTimeLeft(sessionLength * 60)
      }
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, sessionLength, isBreak, sessions])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(sessionLength * 60)
    setIsBreak(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSessionLengthChange = (value: number[]) => {
    const newLength = value[0]
    setSessionLength(newLength)
    if (!isActive) {
      setTimeLeft(newLength * 60)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Focus Timer
        </h1>
        <p className="text-gray-600 mt-1">Stay focused with the Pomodoro Technique</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Display */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 justify-center">
              {isBreak ? <Coffee className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              {isBreak ? "Break Time" : "Focus Session"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-purple-100"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className={`transition-all duration-1000 ${isBreak ? "text-green-400" : "text-purple-400"}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-gray-500">{isBreak ? "Break" : "Focus"}</div>
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={toggleTimer}
                size="lg"
                className={`bg-gradient-to-r ${
                  isBreak
                    ? "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="lg" className="border-purple-200 hover:bg-purple-50">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className={`h-2 ${isBreak ? "bg-green-100" : "bg-purple-100"}`} />
            </div>
          </CardContent>
        </Card>

        {/* Settings & Stats */}
        <div className="space-y-6">
          {/* Settings */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">Timer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Session Length: {sessionLength} minutes</Label>
                <Slider
                  value={[sessionLength]}
                  onValueChange={handleSessionLengthChange}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                  disabled={isActive}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="music" className="text-sm font-medium">
                  Background Music
                </Label>
                <div className="flex items-center gap-2">
                  {musicEnabled ? (
                    <Volume2 className="w-4 h-4 text-purple-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  )}
                  <Switch id="music" checked={musicEnabled} onCheckedChange={setMusicEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-2xl font-bold text-purple-700">{sessions}</div>
                  <div className="text-sm text-purple-600">Sessions</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-pink-50">
                  <div className="text-2xl font-bold text-pink-700">
                    {Math.round(((sessions * sessionLength) / 60) * 10) / 10}h
                  </div>
                  <div className="text-sm text-pink-600">Focus Time</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Goal (4 sessions)</span>
                  <span>{Math.round((sessions / 4) * 100)}%</span>
                </div>
                <Progress value={(sessions / 4) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-purple-700 mb-2">Keep Going! 🌟</h3>
              <p className="text-sm text-purple-600">
                {sessions === 0 && "Ready to start your first focus session?"}
                {sessions === 1 && "Great start! One session down!"}
                {sessions >= 2 && sessions < 4 && "You're on fire! Keep the momentum going!"}
                {sessions >= 4 && "Amazing! You've reached your daily goal! 🎉"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

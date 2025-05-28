"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Volume2, Smartphone, Monitor, Clock, CheckCircle, AlertCircle, Info } from "lucide-react"

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Study Session Reminder",
      message: "Time for your Math study session!",
      time: "2 minutes ago",
      type: "reminder",
      read: false,
    },
    {
      id: 2,
      title: "Goal Achievement",
      message: "Congratulations! You've completed your daily goal!",
      time: "1 hour ago",
      type: "achievement",
      read: false,
    },
    {
      id: 3,
      title: "Break Time",
      message: "You've been studying for 50 minutes. Time for a break!",
      time: "2 hours ago",
      type: "break",
      read: true,
    },
    {
      id: 4,
      title: "Assignment Due",
      message: "Math assignment is due tomorrow",
      time: "3 hours ago",
      type: "deadline",
      read: true,
    },
  ])

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    studyReminders: true,
    breakReminders: true,
    goalNotifications: true,
    deadlineAlerts: true,
    reminderSound: "chime",
    reminderFrequency: "30",
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "achievement":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "break":
        return <Info className="w-5 h-5 text-purple-500" />
      case "deadline":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "reminder":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Reminder
          </Badge>
        )
      case "achievement":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Achievement
          </Badge>
        )
      case "break":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            Break
          </Badge>
        )
      case "deadline":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Deadline
          </Badge>
        )
      default:
        return <Badge variant="outline">Notification</Badge>
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">Manage your study alerts and reminders</p>
        </div>

        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">{unreadCount} unread</Badge>
          )}
          <Button onClick={markAllAsRead} variant="outline" className="border-purple-200 hover:bg-purple-50">
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Bell className="w-5 h-5" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                  <p>No notifications yet. We'll notify you when something important happens!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                      notification.read
                        ? "bg-gray-50 border-gray-200 opacity-75"
                        : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-800"}`}>
                            {notification.title}
                          </h3>
                          {getNotificationBadge(notification.type)}
                        </div>
                        <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-600"}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* General Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">General</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <Label htmlFor="push" className="text-sm">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    <Label htmlFor="email" className="text-sm">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-600" />
                    <Label htmlFor="sound" className="text-sm">
                      Sound
                    </Label>
                  </div>
                  <Switch
                    id="sound"
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                  />
                </div>
              </div>

              {/* Study Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Study Reminders</h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="study-reminders" className="text-sm">
                    Study Session Reminders
                  </Label>
                  <Switch
                    id="study-reminders"
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, studyReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="break-reminders" className="text-sm">
                    Break Reminders
                  </Label>
                  <Switch
                    id="break-reminders"
                    checked={settings.breakReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, breakReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="goal-notifications" className="text-sm">
                    Goal Achievements
                  </Label>
                  <Switch
                    id="goal-notifications"
                    checked={settings.goalNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, goalNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="deadline-alerts" className="text-sm">
                    Deadline Alerts
                  </Label>
                  <Switch
                    id="deadline-alerts"
                    checked={settings.deadlineAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, deadlineAlerts: checked })}
                  />
                </div>
              </div>

              {/* Sound Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Sound & Frequency</h4>

                <div className="space-y-2">
                  <Label className="text-sm">Reminder Sound</Label>
                  <Select
                    value={settings.reminderSound}
                    onValueChange={(value) => setSettings({ ...settings, reminderSound: value })}
                  >
                    <SelectTrigger className="border-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chime">🔔 Chime</SelectItem>
                      <SelectItem value="bell">🛎️ Bell</SelectItem>
                      <SelectItem value="ding">✨ Ding</SelectItem>
                      <SelectItem value="soft">🎵 Soft Tone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Reminder Frequency (minutes)</Label>
                  <Select
                    value={settings.reminderFrequency}
                    onValueChange={(value) => setSettings({ ...settings, reminderFrequency: value })}
                  >
                    <SelectTrigger className="border-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="45">Every 45 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="font-semibold text-purple-700">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-purple-200 hover:bg-white">
                  Test Notification
                </Button>
                <Button variant="outline" className="w-full border-purple-200 hover:bg-white">
                  Clear All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

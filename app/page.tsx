"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { PlannerPage } from "@/components/planner-page"
import { TimerPage } from "@/components/timer-page"
import { TodoPage } from "@/components/todo-page"
import { ProgressPage } from "@/components/progress-page"
import { NotificationsPage } from "@/components/notifications-page"

export default function StudentPlanner() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "planner":
        return <PlannerPage />
      case "timer":
        return <TimerPage />
      case "todo":
        return <TodoPage />
      case "progress":
        return <ProgressPage />
      case "notifications":
        return <NotificationsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-6 transition-all duration-300">{renderPage()}</main>
      </SidebarProvider>
    </div>
  )
}

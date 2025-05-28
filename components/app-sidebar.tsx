"use client"

import { Home, Calendar, Timer, CheckSquare, TrendingUp, Bell, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Planner", icon: Calendar, id: "planner" },
  { title: "Focus Timer", icon: Timer, id: "timer" },
  { title: "To-Do List", icon: CheckSquare, id: "todo" },
  { title: "Progress", icon: TrendingUp, id: "progress" },
  { title: "Notifications", icon: Bell, id: "notifications" },
]

interface AppSidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export function AppSidebar({ currentPage, setCurrentPage }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-purple-100 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">StudyFlow</h2>
            <p className="text-sm text-gray-500">Your study companion</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-600 font-medium mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setCurrentPage(item.id)}
                    isActive={currentPage === item.id}
                    className="w-full justify-start gap-3 rounded-xl hover:bg-purple-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-purple-200 text-purple-700">L</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Luna</p>
            <p className="text-xs text-gray-500">Keep going! 🌟</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

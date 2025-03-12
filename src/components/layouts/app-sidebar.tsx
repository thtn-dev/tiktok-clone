import type React from "react"
import { Home, Compass, Users, Upload, Video, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-800/50",
        active && "text-white font-medium",
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="w-64 border-r border-gray-800 h-full overflow-y-auto py-4 hidden md:block">
      <div className="space-y-1 px-2">
        <SidebarItem icon={<Home className="h-5 w-5" />} label="For You" active />
        <SidebarItem icon={<Compass className="h-5 w-5" />} label="Explore" />
        <SidebarItem icon={<Users className="h-5 w-5" />} label="Following" />
        <SidebarItem icon={<Upload className="h-5 w-5" />} label="Upload" />
        <SidebarItem icon={<Video className="h-5 w-5" />} label="LIVE" />
        <SidebarItem icon={<User className="h-5 w-5" />} label="Profile" />
      </div>

      <div className="mt-6 px-4">
        <p className="text-sm text-gray-400 mb-4">Suggested accounts</p>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-700"></div>
              <div>
                <p className="text-sm font-medium">user_{i + 1}</p>
                <p className="text-xs text-gray-400">User {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-4 pt-4 border-t border-gray-800">
        <p className="text-sm text-gray-400 mb-2">About</p>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Contact</span>
          <span>© 2023 TikTok</span>
        </div>
      </div>
    </div>
  )
}


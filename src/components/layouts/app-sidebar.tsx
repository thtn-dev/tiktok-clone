"use client"

import type * as React from "react"
import Link from "next/link"
import {
  Home,
  Search,
  Compass,
  Users,
  UserCircle,
  Plus,
  MessageCircle,
  Video,
  MoreHorizontal,
  Bell,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function TikTokSidebar() {
  return (
    <div className="hidden w-[240px] flex-col bg-black text-white md:flex border-r border-zinc-800">
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 pb-4">
          <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M38.0914 16.5616C38.0914 16.5616 38.0914 16.5616 38.0914 16.5616C36.6089 16.5616 35.1264 16.2312 33.8262 15.5704C32.8583 15.0769 31.9869 14.4161 31.2119 13.5954C29.8152 12.1129 28.9945 10.1343 28.9945 8.04895V7.27395H23.7243V25.4339C23.7243 25.9274 23.6278 26.4209 23.4348 26.8179C23.2418 27.2149 22.9114 27.6119 22.5144 27.9124C22.1174 28.2129 21.6239 28.4059 21.1304 28.5024C20.6369 28.5989 20.1434 28.5989 19.6499 28.5024C19.1564 28.4059 18.7594 28.2129 18.3624 27.9124C17.9654 27.6119 17.6649 27.2149 17.4719 26.8179C17.2789 26.4209 17.1824 25.9274 17.1824 25.4339C17.1824 24.9404 17.2789 24.4469 17.4719 23.9534C17.6649 23.5564 17.9654 23.1594 18.3624 22.8589C18.7594 22.5584 19.1564 22.3654 19.6499 22.2689C20.1434 22.1724 20.6369 22.1724 21.1304 22.2689V16.9586C20.6369 16.9586 20.1434 16.9586 19.6499 16.9586C17.9654 16.9586 16.3774 17.4521 15.0772 18.3694C13.7769 19.2866 12.7126 20.5869 12.1226 22.0694C11.5326 23.5519 11.3396 25.1399 11.6401 26.7279C11.9406 28.3159 12.6014 29.7019 13.6659 30.8629C14.7304 32.0239 16.1164 32.8446 17.7044 33.2416C19.2924 33.6386 20.9769 33.5421 22.5144 32.9521C24.0519 32.3621 25.3522 31.2976 26.2694 29.9974C27.1867 28.6971 27.6802 27.1091 27.6802 25.4246V16.7656C29.9621 18.3536 32.6299 19.1744 35.2977 19.1744H38.0914V16.5616Z"
              fill="#25F4EE"
            />
            <path
              d="M30.9114 13.5954C31.6864 14.4161 32.5578 15.0769 33.5257 15.5704C34.8259 16.2312 36.3084 16.5616 37.7909 16.5616V13.9924C37.5014 13.9924 37.2119 13.9924 36.9224 13.8959C35.5257 13.6054 34.3259 12.8814 33.4122 11.8169C32.4984 10.7524 31.9084 9.3664 31.8119 7.9804C31.8119 7.6799 31.8119 7.4869 31.8119 7.1864V7.2739H28.9947V8.0489C28.9947 10.1343 29.8154 12.1129 31.2114 13.5954H30.9114Z"
              fill="#25F4EE"
            />
            <path
              d="M36.9224 13.8959C37.2119 13.9924 37.5014 13.9924 37.7909 13.9924V7.27393H35.2977C35.2977 7.37043 35.2977 7.46693 35.2977 7.56343C35.2012 9.14143 34.6112 10.6239 33.6434 11.8169C34.5572 12.8814 35.7569 13.6054 37.1537 13.8959H36.9224Z"
              fill="#FE2C55"
            />
            <path
              d="M17.1824 25.4339C17.1824 25.9274 17.2789 26.4209 17.4719 26.8179C17.6649 27.2149 17.9654 27.6119 18.3624 27.9124C18.7594 28.2129 19.1564 28.4059 19.6499 28.5024C20.1434 28.5989 20.6369 28.5989 21.1304 28.5024C21.6239 28.4059 22.1174 28.2129 22.5144 27.9124C22.9114 27.6119 23.2418 27.2149 23.4348 26.8179C23.6278 26.4209 23.7243 25.9274 23.7243 25.4339C23.7243 24.9404 23.6278 24.4469 23.4348 24.0499C23.2418 23.6529 22.9114 23.2559 22.5144 22.9554C22.1174 22.6549 21.6239 22.4619 21.1304 22.3654C20.6369 22.2689 20.1434 22.2689 19.6499 22.3654C19.1564 22.4619 18.7594 22.6549 18.3624 22.9554C17.9654 23.2559 17.6649 23.6529 17.4719 24.0499C17.2789 24.4469 17.1824 24.9404 17.1824 25.4339Z"
              fill="#FE2C55"
            />
            <path
              d="M35.2977 7.27395C35.2977 7.17745 35.2977 7.08095 35.2977 6.98445C35.2977 6.88795 35.2977 6.79145 35.2977 6.69495C35.2012 4.92695 34.5404 3.25545 33.4122 1.93745C32.2839 0.619453 30.7964 -0.104547 29.1119 -0.104547H23.7243V7.27395H28.9945V7.18695C28.9945 7.48745 28.9945 7.68045 28.9945 7.98095C29.091 9.36695 29.681 10.753 30.5947 11.8175C31.5085 12.882 32.7082 13.606 34.105 13.8965C34.3945 13.993 34.684 13.993 36.9224 13.8965C36.9224 13.8965 36.9224 13.8965 36.9224 13.8965V7.27395H35.2977Z"
              fill="white"
            />
          </svg>
          <span className="text-xl font-bold">TikTok</span>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input className="h-9 rounded-full bg-zinc-900 pl-8 text-sm text-gray-400" placeholder="Tìm kiếm" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-1 px-2">
          <NavItem icon={<Home className="h-5 w-5" />} label="Đề xuất" active />
          <NavItem icon={<Compass className="h-5 w-5" />} label="Khám phá" />
          <NavItem icon={<UserCircle className="h-5 w-5" />} label="Đang Follow" />
          <NavItem icon={<Users className="h-5 w-5" />} label="Bạn bè" />
          <NavItem icon={<Plus className="h-5 w-5" />} label="Tải lên" />
          <NavItem icon={<Bell className="h-5 w-5" />} label="Hoạt động" badge={<Badge count="99+" color="red" />} />
          <NavItem
            icon={<MessageCircle className="h-5 w-5" />}
            label="Tin nhắn"
            badge={<Badge count="43" color="pink" />}
          />
          <NavItem icon={<Video className="h-5 w-5" />} label="LIVE" />
          <NavItem
            icon={
              <Avatar className="h-5 w-5">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            }
            label="Hồ sơ"
          />
          <NavItem icon={<MoreHorizontal className="h-5 w-5" />} label="Thêm" />
        </div>

        <Separator className="my-4 bg-zinc-800" />

        <div className="px-4 text-sm">
          <h3 className="mb-2 font-medium">Các tài khoản Đã follow</h3>
          <p className="text-xs text-gray-400">Những tài khoản bạn follow sẽ xuất hiện tại đây</p>
        </div>

        <Separator className="my-4 bg-zinc-800" />

        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500">Công ty</p>
          <a href="https://www.tiktok.com" className="mt-1 block text-xs text-gray-400 hover:underline">
            https://www.tiktok.com
          </a>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  badge?: React.ReactNode
  active?: boolean
}

function NavItem({ icon, label, badge, active }: NavItemProps) {
  return (
    <Link
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        active ? "text-[#fe2c55]" : "text-white hover:bg-zinc-900",
      )}
    >
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      <span>{label}</span>
      {badge && <div className="ml-auto">{badge}</div>}
    </Link>
  )
}

interface BadgeProps {
  count: string
  color: "red" | "pink"
}

function Badge({ count, color }: BadgeProps) {
  return (
    <div
      className={cn(
        "flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-white",
        color === "red" ? "bg-[#fe2c55]" : "bg-[#fe2c55]",
      )}
    >
      {count}
    </div>
  )
}


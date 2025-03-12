import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopNavbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="flex items-center">
        <svg className="w-8 h-8 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.321 5.562a5.122 5.122 0 01-5.116-5.115h-3.786v13.015a2.5 2.5 0 11-2.5-2.5 2.492 2.492 0 011.357.4V7.467a6.144 6.144 0 00-1.357-.154 6.361 6.361 0 106.361 6.361V8.99a8.949 8.949 0 005.041 1.556V6.76a5.114 5.114 0 01-5.116-1.198" />
        </svg>
        <span className="font-bold text-xl">TikTok</span>
      </div>

      <div className="hidden md:flex relative max-w-md w-full mx-4">
        <Input
          type="text"
          placeholder="Search accounts and videos"
          className="bg-gray-900 border-gray-700 rounded-full pl-4 pr-10 py-2 w-full focus-visible:ring-gray-700"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div>
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full">Log in</Button>
      </div>
    </div>
  )
}


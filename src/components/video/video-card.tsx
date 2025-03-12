import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Video {
  id: number
  username: string
  description: string
  likes: string
  comments: string
  shares: string
  bookmarks: string
  bgColor: string
}

interface VideoCardProps {
  video: Video
  isActive?: boolean
}

export function VideoCard({ video, isActive }: VideoCardProps) {
  return (
    <div className={cn("h-full w-full snap-start snap-always flex flex-col relative", video.bgColor)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl font-bold text-white/70">Video {video.id}</div>
      </div>

      <div className="absolute bottom-0 left-0 p-4 max-w-[80%]">
        <div className="font-bold">{video.username}</div>
        <p className="text-sm mt-2">{video.description}</p>
      </div>

      <div className="absolute bottom-16 right-4 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-1">
            <img src={`/placeholder.svg?height=40&width=40`} alt="User avatar" className="rounded-full" />
          </div>
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs absolute -bottom-1">
            +
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </button>
          <span className="text-xs mt-1">{video.likes}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </button>
          <span className="text-xs mt-1">{video.comments}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
            <Share2 className="w-6 h-6" />
          </button>
          <span className="text-xs mt-1">{video.shares}</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </button>
          <span className="text-xs mt-1">{video.bookmarks}</span>
        </div>
      </div>
    </div>
  )
}


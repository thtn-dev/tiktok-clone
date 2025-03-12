import { forwardRef } from "react"
import { type Video, VideoCard } from "./video-card"

interface VideoFeedProps {
  videos: Video[]
  currentIndex: number
}

export const VideoFeed = forwardRef<HTMLDivElement, VideoFeedProps>(({ videos, currentIndex }, ref) => {
  return (
    <div ref={ref} className="h-full snap-y snap-mandatory overflow-y-scroll">
      {videos.map((video, index) => (
        <div key={video.id} className="h-full w-full">
          <VideoCard video={video} isActive={index === currentIndex} />
        </div>
      ))}
    </div>
  )
})

VideoFeed.displayName = "VideoFeed"


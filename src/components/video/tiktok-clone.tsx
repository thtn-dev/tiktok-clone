"use client"

import { useState, useRef, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Sidebar } from "@/components/layouts/app-sidebar"
import { VideoFeed } from "@/components/video/video-feed"
import { TopNavbar } from "@/components/layouts/top-navbar"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function TikTokClone() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const feedRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const videos = [
    {
      id: 1,
      username: "@user1",
      description: "This is an amazing video #trending",
      likes: "452K",
      comments: "2.1K",
      shares: "3.4K",
      bookmarks: "10.2K",
      bgColor: "bg-gradient-to-br from-pink-500 to-purple-500",
    },
    {
      id: 2,
      username: "@viral_content",
      description: "Check out this cool effect #fyp #foryou",
      likes: "1.2M",
      comments: "8.5K",
      shares: "12K",
      bookmarks: "45K",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      username: "@trending_now",
      description: "Can't believe this happened! #viral",
      likes: "892K",
      comments: "5.7K",
      shares: "7.3K",
      bookmarks: "22K",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      id: 4,
      username: "@dance_queen",
      description: "New dance challenge! Try it out #dance",
      likes: "3.4M",
      comments: "15K",
      shares: "42K",
      bookmarks: "78K",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      id: 5,
      username: "@comedy_central",
      description: "This made me laugh so hard 😂 #comedy",
      likes: "5.1M",
      comments: "23K",
      shares: "67K",
      bookmarks: "112K",
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
  ]

  const scrollToVideo = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentVideoIndex(index)
      if (feedRef.current) {
        const videoElement = feedRef.current.children[index] as HTMLElement
        if (videoElement) {
          videoElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      scrollToVideo(currentVideoIndex - 1)
    } else if (e.key === "ArrowDown") {
      scrollToVideo(currentVideoIndex + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentVideoIndex])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavbar />

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar />}

        <div className="relative flex-1 overflow-hidden">
          <VideoFeed ref={feedRef} videos={videos} currentIndex={currentVideoIndex} />

          <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-700/70"
              onClick={() => scrollToVideo(currentVideoIndex - 1)}
              disabled={currentVideoIndex === 0}
            >
              <ChevronUp className="h-6 w-6" />
              <span className="sr-only">Previous video</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-700/70"
              onClick={() => scrollToVideo(currentVideoIndex + 1)}
              disabled={currentVideoIndex === videos.length - 1}
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Next video</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client";

import * as React from "react";
import { VideoPost } from "./video-post";
// Sample data with more posts for scrolling demo
const POSTS = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=1280&width=720",
    username: "trada.news",
    description:
      "Dù con có xấm trổ hay anh lớn ngoài xã hội thì khi về nhà, con ...",
    caption:
      "Dù con có xấm trổ hay anh lớn ngoài xã hội thì khi về nhà, con vẫn là con của cha 😭",
    likes: "83K",
    comments: "1159",
    bookmarks: "3306",
    shares: "2205",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+2",
    username: "autolover",
    description: "Review xe mới 2023",
    caption: "Đánh giá chi tiết dòng xe mới nhất 🔥",
    likes: "23K",
    comments: "876",
    bookmarks: "1243",
    shares: "789",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+3",
    username: "toloanmazda",
    description: "Việc nhẹ - Áp lực cao",
    caption: "Ưu điểm: Thích bán xe\nNhược điểm: Chưa bán được xe nào 😭",
    likes: "9207",
    comments: "174",
    bookmarks: "397",
    shares: "258",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+4",
    username: "carseller88",
    description: "Ngày đầu đi làm 🚗",
    caption: "Khi khách hỏi: Xe này có mạnh không?",
    likes: "15K",
    comments: "342",
    bookmarks: "567",
    shares: "421",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+5",
    username: "cardealer_vn",
    description: "Mẹo bán hàng hiệu quả",
    caption: "3 bí quyết để bán được nhiều xe hơn",
    likes: "7865",
    comments: "234",
    bookmarks: "567",
    shares: "321",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+6",
    username: "autotrends",
    description: "Xu hướng ô tô 2023",
    caption: "Những mẫu xe được yêu thích nhất năm nay",
    likes: "12K",
    comments: "432",
    bookmarks: "876",
    shares: "543",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "7",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+7",
    username: "funnyvids",
    description: "Khoảnh khắc hài hước 😂",
    caption: "Cười không nhặt được mồm với clip này",
    likes: "45K",
    comments: "1.2K",
    bookmarks: "3.5K",
    shares: "2.1K",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "8",
    imageUrl: "/placeholder.svg?height=1280&width=720&text=Video+8",
    username: "foodlover",
    description: "Ăn sập Sài Gòn 🍜",
    caption: "Quán ăn ngon nhất mình từng thử",
    likes: "32K",
    comments: "987",
    bookmarks: "1.5K",
    shares: "756",
    userAvatar: "/placeholder.svg?height=48&width=48",
  },
];

export function VideoFeed() {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const feedRef = React.useRef<HTMLDivElement>(null);

  const scrollToVideo = (index: number) => {
    if (index >= 0 && index < POSTS.length) {
      setCurrentVideoIndex(index)
      if (feedRef.current) {
        const videoElement = feedRef.current.children[index] as HTMLElement
        console.log(videoElement)
        if (videoElement) {
          console.log("handling scroll");
          videoElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        scrollToVideo(currentVideoIndex - 1)
      } else if (e.key === "ArrowDown") {
        scrollToVideo(currentVideoIndex + 1)
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentVideoIndex])

  return (
    
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 overflow-hidden">
        <div className="relative  flex max-h-screen h-screen flex-col items-center ">
      {/* Video Container - Only this part scrolls */}
      <div
        ref={feedRef}
        className="h-full w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll no-scrollbar"
      >
        {POSTS.map((post) => (
          // <VideoPost
          //   key={post.id}
          //   post={post}
          //   // isActive={index === currentIndex}
          // />
          <div key={post.id} className="h-full w-full snap-start snap-always flex flex-col relative 0 space-y-4 py-4">
            <VideoPost post={post} />
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

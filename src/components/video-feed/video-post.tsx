"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface VideoPostProps {
  post: {
    id: string;
    imageUrl: string;
    username: string;
    description: string;
    caption: string;
    likes: string;
    comments: string;
    bookmarks: string;
    shares: string;
    userAvatar: string;
  };
  isActive?: boolean;
}

export function VideoPost({ post, isActive = false }: VideoPostProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-lg">
      <div className="h-full">
        {/* Main Image */}
        <div className="relative h-full w-full">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.description}
            fill
            className="object-cover"
            priority={isActive}
          />
        </div>

        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 border border-white/20">
              <Image
                src={post.userAvatar || "/placeholder.svg"}
                alt={post.username}
                width={32}
                height={32}
              />
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-white">@{post.username}</h3>
              <p className="mt-1 text-sm text-white/90">{post.description}</p>
              <button className="mt-1 text-sm text-white/60">thêm</button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-lg font-medium text-white">{post.caption}</p>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="absolute bottom-20 right-4 z-10 flex flex-col items-center gap-4">
          {/* Like Button */}
          <button
            className="group flex flex-col items-center gap-1"
            onClick={() => setIsLiked(!isLiked)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60">
              <Heart
                className={cn(
                  "h-6 w-6",
                  isLiked ? "fill-white text-white" : "text-white"
                )}
              />
            </div>
            <span className="text-sm font-medium text-white">{post.likes}</span>
          </button>

          {/* Comment Button */}
          <button className="group flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-white">
              {post.comments}
            </span>
          </button>

          {/* Bookmark Button */}
          <button
            className="group flex flex-col items-center gap-1"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60">
              <Bookmark
                className={cn(
                  "h-6 w-6",
                  isBookmarked ? "fill-white text-white" : "text-white"
                )}
              />
            </div>
            <span className="text-sm font-medium text-white">
              {post.bookmarks}
            </span>
          </button>

          {/* Share Button */}
          <button className="group flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-white">
              {post.shares}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

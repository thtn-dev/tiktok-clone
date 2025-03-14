"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LogOut } from "lucide-react"

interface ProfileData {
  id: string
  full_name?: string
  username?: string
  website?: string
  bio?: string
  avatar_url?: string
  updated_at?: string
}

interface UserProfileProps {
  user: User
  profile?: ProfileData
}

export function UserProfile({ user, profile }: UserProfileProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignOut() {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.refresh()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          {profile?.avatar_url ? (
            <Image src={profile.avatar_url || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-semibold">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div>
          <CardTitle>{profile?.full_name || "User"}</CardTitle>
          {profile?.username && <p className="text-sm text-muted-foreground">@{profile.username}</p>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p>{user.email}</p>
        </div>
        {profile?.bio && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p>{profile.bio}</p>
          </div>
        )}
        {profile?.website && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Website</p>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {profile.website}
            </a>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-muted-foreground">User ID</p>
          <p className="truncate">{user.id}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handleSignOut} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


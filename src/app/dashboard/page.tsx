import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { UserProfile } from "@/components/auth/user-profile"
import { Button } from "@/components/ui/button"
import { UserCog } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/profile/edit">
            <UserCog className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Profile</h2>
          <UserProfile user={user} profile={profile} />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">Welcome to your dashboard. You are now signed in.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


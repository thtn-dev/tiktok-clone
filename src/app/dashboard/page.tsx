import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { UserProfile } from "@/components/auth/user-profile"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Profile</h2>
          <UserProfile user={user} />
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


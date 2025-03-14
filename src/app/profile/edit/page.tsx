import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { ProfileForm } from "@/components/profile/profile-form"
import { Separator } from "@/components/ui/separator"

export default async function ProfileEditPage() {
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
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your profile information and profile picture</p>
        </div>
        <Separator />
        <ProfileForm user={user} profile={profile} />
      </div>
    </div>
  )
}


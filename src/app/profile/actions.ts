"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function updateProfile(formData: FormData) {
  try {
    const supabase = await createClient()
    console.log("Heello");
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    // Prepare profile data
    const profileData: Record<string, any> = {
      id: user.id,
      updated_at: new Date().toISOString(),
    }

    // Add form fields to profile data
    const fields = ["full_name", "username", "website", "bio"]
    fields.forEach((field) => {
      const value = formData.get(field)
      if (value && typeof value === "string") {
        profileData[field] = value
      }
    })

    // Handle avatar upload if present
    const avatarFile = formData.get("avatar") as File | null

    if (avatarFile && avatarFile instanceof Blob) {
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `/avatars/${fileName}`

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("profiles").upload(filePath, avatarFile, {
        upsert: true,
        contentType: avatarFile.type,
      })

      if (uploadError) {
        return { error: `Error uploading file: ${uploadError.message}` }
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from("profiles").getPublicUrl(filePath)

      // Add avatar URL to profile data
      profileData.avatar_url = publicUrlData.publicUrl
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

    let result

    // Update or insert profile
    if (existingProfile) {
      result = await supabase.from("profiles").update(profileData).eq("id", user.id)
    } else {
      result = await supabase.from("profiles").insert([profileData])
    }

    if (result.error) {
      return { error: result.error.message }
    }

    revalidatePath("/profile/edit")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Profile update error:", error)
    return { error: "Failed to update profile" }
  }
}


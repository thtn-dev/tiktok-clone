"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Loader2, Upload } from "lucide-react"
import { ImageCropper } from "./image-cropper"
import { updateProfile } from "@/app/profile/actions"

const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  bio: z.string().max(160, { message: "Bio must be less than 160 characters" }).optional(),
})

type Profile = {
  id: string
  full_name?: string
  username?: string
  website?: string
  bio?: string
  avatar_url?: string
  updated_at?: string
}

interface ProfileFormProps {
  user: User
  profile?: Profile
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(profile?.avatar_url || null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      username: profile?.username || "",
      website: profile?.website || "",
      bio: profile?.bio || "",
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Create FormData to send both profile data and image
      const formData = new FormData()

      // Add profile data
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      // Add image if there's a cropped image
      if (imageFile && croppedImage) {
        // Convert base64 to blob
        const response = await fetch(croppedImage)
        const blob = await response.blob()
        formData.append("avatar", blob, imageFile.name)
      }

      const result = await updateProfile(formData)

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess("Profile updated successfully")
      router.refresh()
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setShowCropper(true)
    }
  }

  function handleCropComplete(croppedImageUrl: string) {
    setCroppedImage(croppedImageUrl)
    setShowCropper(false)
  }

  function handleCropCancel() {
    setShowCropper(false)
    setImageFile(null)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Upload a profile picture. The image will be cropped to a square.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border">
            {croppedImage ? (
              <Image src={croppedImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Button type="button" variant="outline" onClick={() => document.getElementById("avatar-upload")?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              {croppedImage && (
                <Button type="button" variant="outline" onClick={() => setCroppedImage(null)}>
                  Remove
                </Button>
              )}
            </div>
            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. 1MB max.</p>
          </div>
        </div>
      </Card>

      {showCropper && imageFile && (
        <ImageCropper
          image={URL.createObjectURL(imageFile)}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>Your full name as you'd like it to be displayed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>Your unique username that will be visible to others.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Your personal or professional website.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Brief description about yourself. Max 160 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


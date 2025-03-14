"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState("Verifying your email...")
  const [error, setError] = useState(false)

  useEffect(() => {
    const tokenHash = searchParams.get("token_hash")
    const type = searchParams.get("type")

    async function confirmEmail() {
      try {
        if (tokenHash && type) {
          const supabase = createClient()
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type === "email" ? "email" : "recovery",
          })

          if (error) {
            setError(true)
            setMessage("There was an error verifying your email. Please try again.")
            return
          }

          setMessage("Email verified successfully!")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        }
      } catch (err) {
        setError(true)
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    confirmEmail()
  }, [searchParams, router])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>{error ? "Verification failed" : "Verifying your email address"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={error ? "text-destructive" : ""}>{message}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/login")} className="w-full">
            Return to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


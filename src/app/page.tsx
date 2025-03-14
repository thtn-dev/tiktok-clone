import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
            <p className="mt-3 text-lg text-muted-foreground">Sign in to access your account</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/register">Create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return redirect("/dashboard")
}


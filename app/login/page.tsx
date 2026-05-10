```tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { login, googleLogin } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

const BACKGROUND_IMAGE =
  "https://static.independent.co.uk/2022/04/06/10/solar%20panel%20night%20electricity.jpg?width=1200&height=800&crop=1200:800"

export default function LoginPage() {
  const router = useRouter()
  const loginStore = useAuthStore((state) => state.login)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setError("")

    const res = await login(username, password)

    if (res.success && res.user_id) {
      loginStore(res.user_id)
      router.push("/dashboard/fyp")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError("")

    try {
      const result = await signInWithPopup(auth, googleProvider)

      const user = result.user

      const res = await googleLogin({
        google_id: user.uid,
        email: user.email || "",
        full_name: user.displayName || "",
        avatar_url: user.photoURL || "",
      })

      if (res.success && res.user_id) {
        loginStore(res.user_id)
        router.push("/dashboard/fyp")
      } else {
        setError(res.error || "Failed to login with Google")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Google login failed")
    }

    setIsGoogleLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 p-2 rounded-lg hover:bg-background/20 transition-colors"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to About</span>
        </Button>
      </Link>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt="Solar panels at night"
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Dark blur overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <Card className="w-full max-w-md bg-card/95 border-border backdrop-blur-sm relative z-10 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            GreenExchange
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Trade Renewable Energy Certificates & Carbon Credits
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>

                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </Field>
            </FieldGroup>

            {error && (
              <p className="text-destructive text-sm mt-4">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Demo credentials: user1 / pass1
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-border bg-secondary hover:bg-secondary/80"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  Google
                </>
              )}
            </Button>

            <Link href="/register">
              <Button
                type="button"
                variant="outline"
                className="w-full border-border bg-secondary hover:bg-secondary/80"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

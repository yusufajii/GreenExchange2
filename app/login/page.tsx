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
                <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.18 35.091 26.715 36 24 36c-5.176 0-9.625-3.326-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.058 2.997-3.15 5.398-5.894 6.57l6.19 5.238C39.99 35.73 44 30.417 44 24c0-1.341-.138-2.65-.389-3.917z"
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


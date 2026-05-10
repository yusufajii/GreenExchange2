"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2, User, Mail, Phone, Building2, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { createAccount, googleLogin } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

const BACKGROUND_IMAGE =
  "https://static.independent.co.uk/2022/04/06/10/solar%20panel%20night%20electricity.jpg?width=1200&height=800&crop=1200:800"
  
export default function RegisterPage() {
  const router = useRouter()
  const loginStore = useAuthStore((state) => state.login)
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.username.trim()) {
      errors.username = "Username is required"
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters"
    }
    
    if (!formData.password) {
      errors.password = "Password is required"
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    
    if (!formData.full_name.trim()) {
      errors.full_name = "Full name is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format"
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError("")

    const res = await createAccount({
      username: formData.username,
      password: formData.password,
      cash_balance: 0,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      avatar_url: "",
      status: "active",
      kyc_status: "unverified",
      company_name: formData.company_name,
    })
    
    if (res.success && res.user_id) {
      loginStore(res.user_id)
      router.push("/dashboard/fyp")
    } else {
      setError(res.error || "Failed to create account. Please try again.")
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
    <div className="min-h-screen flex items-center justify-center p-4 py-8 relative overflow-hidden">

      {/* Back Button */}
      <Link
        href="/login"
        className="absolute top-4 left-4 z-20 p-2 rounded-lg hover:bg-background/20 transition-colors"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to Login</span>
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
      <Card className="w-full max-w-lg bg-card/95 border-border backdrop-blur-sm relative z-10 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join GreenExchange to trade carbon credits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-border bg-secondary hover:bg-secondary/80"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
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
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Account Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose username"
                      value={formData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                  {fieldErrors.username && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.username}</p>
                  )}
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="pl-10 pr-10 bg-input border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.password}</p>
                  )}
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10 bg-input border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-destructive text-xs mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </Field>
              </div>

              {/* Personal Info */}
              <Field>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className="bg-input border-border"
                />
                {fieldErrors.full_name && (
                  <p className="text-destructive text-xs mt-1">{fieldErrors.full_name}</p>
                )}
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="phone">Phone (Optional)</FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 xxx"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="company_name">Company (Optional)</FieldLabel>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company_name"
                      type="text"
                      placeholder="Company name"
                      value={formData.company_name}
                      onChange={(e) => handleChange("company_name", e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                </Field>
              </div>
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          
          <p className="text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


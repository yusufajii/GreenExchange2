import Image from "next/image"
import { cn } from "@/lib/utils"

// GreenExchange Logo URL from ibb.co
export const LOGO_URL = "https://i.ibb.co.com/Zp4XvhGC/download.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

const sizeMap = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-xl" },
}

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size]
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative" style={{ width: icon, height: icon }}>
        <Image
          src={LOGO_URL}
          alt="GreenExchange Logo"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      {showText && (
        <span className={cn("font-bold text-foreground", text)}>GreenExchange</span>
      )}
    </div>
  )
}

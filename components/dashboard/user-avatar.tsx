"use client"

import Image from "next/image"
import useSWR from "swr"
import { User } from "lucide-react"
import { getAccount } from "@/lib/api"

interface UserAvatarProps {
  userId: string
}

export function UserAvatar({ userId }: UserAvatarProps) {
  const { data } = useSWR(
    ['account', userId],
    () => getAccount(userId)
  )

  return (
    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden relative">
      {data?.avatar_url ? (
        <Image
          src={data.avatar_url}
          alt={`${data.full_name} avatar`}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <User className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </div>
  )
}

export function UserDisplayName({ userId }: { userId: string }) {
  const { data } = useSWR(
    ['account', userId],
    () => getAccount(userId)
  )
  // full_name dari interface Account, fallback ke userId
  return <>{data?.full_name ?? userId}</>
}
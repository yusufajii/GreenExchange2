"use client"

import { useState } from "react"
import { CertificateModal } from "@/components/dashboard/certificate-modal"

export function CertificationBadge({ certification }: { certification: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-primary hover:underline cursor-pointer"
      >
        {certification}
      </button>
      <CertificateModal
        certificationName={certification}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
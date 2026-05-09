"use client"

import Image from "next/image"
import useSWR from "swr"
import { Award, MapPin, Calendar, Building, FileText, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCertificateInfo } from "@/lib/api"

interface CertificateModalProps {
  certificationName: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateModal({ certificationName, open, onOpenChange }: CertificateModalProps) {
  const { data: certData, isLoading } = useSWR(
    certificationName ? ['certificate', certificationName] : null,
    () => getCertificateInfo(certificationName!)
  )

  const certificate = certData?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Award className="h-5 w-5 text-primary" />
            Certificate Information
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : certificate ? (
          <div className="space-y-4">
            {/* Header with Logo and Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden relative flex-shrink-0">
                {certificate.certificate_logo_url ? (
                  <Image
                    src={certificate.certificate_logo_url}
                    alt={certificate.certificate_name}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : (
                  <Award className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{certificate.certificate_name}</h3>
                <p className="text-sm text-muted-foreground">{certificate.certificate_publisher}</p>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Certificate Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium text-foreground">{certificate.certificate_type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Established</p>
                  <p className="text-sm font-medium text-foreground">{certificate.certificate_year}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{certificate.certificate_loc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">ID</p>
                  <Badge variant="outline" className="text-xs">{certificate.certificate_id}</Badge>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* About Section */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {certificate.certificate_desc_about}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Certificate information not found</p>
            {certificationName && (
              <p className="text-sm text-muted-foreground mt-1">
                Looking for: {certificationName}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

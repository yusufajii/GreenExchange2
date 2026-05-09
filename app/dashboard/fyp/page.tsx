"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingTicker } from "@/components/dashboard/trending-ticker"
import { NewsSection } from "@/components/dashboard/news-section"
import { ForumChat } from "@/components/dashboard/forum-chat"
import { CertificateModal } from "@/components/dashboard/certificate-modal"
import { getFYP, type TrendingSymbol } from "@/lib/api"

export default function FYPPage() {
  const router = useRouter()
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null)

  const { data: fypData, isLoading } = useSWR('fyp', () => getFYP(), {
    refreshInterval: 30000,
  })

  const handleSymbolClick = (symbol: TrendingSymbol) => {
    router.push(`/dashboard/symbol/${symbol.symbol}`)
  }

  const handleCertificationClick = (certification: string) => {
    setSelectedCertification(certification)
  }

  return (
    <div className="flex flex-col gap-6 h-full pb-20 lg:pb-0">
      {/* Hero Section - YouTube Embed */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Play className="h-5 w-5 text-primary" />
            About Green Exchange and How to Use It
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary">
            <iframe
              src="https://www.youtube.com/embed/s3zIMNlG4Nk?si=Pgm1YFmiZTHWEC69"
              title="About Green Exchange and How to Use It"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trending Symbols Ticker */}
      {fypData?.trending_symbols && fypData.trending_symbols.length > 0 && (
        <TrendingTicker
          symbols={fypData.trending_symbols}
          onSymbolClick={handleSymbolClick}
          onCertificationClick={handleCertificationClick}
        />
      )}

      {/* News and Forum Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-96">
        {/* News Section - Takes 3/5 of the space */}
        <div className="lg:col-span-3">
          <NewsSection news={fypData?.news || []} isLoading={isLoading} />
        </div>

        {/* Forum/Chat Section - Takes 2/5 of the space */}
        <div className="lg:col-span-2">
          <ForumChat initialMessages={fypData?.forum || []} />
        </div>
      </div>

      {/* Certificate Info Modal */}
      <CertificateModal
        certificationName={selectedCertification}
        open={!!selectedCertification}
        onOpenChange={(open) => !open && setSelectedCertification(null)}
      />
    </div>
  )
}

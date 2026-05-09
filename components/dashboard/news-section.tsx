"use client"

import Image from "next/image"
import { Newspaper, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { NewsItem } from "@/lib/api"

interface NewsSectionProps {
  news: NewsItem[]
  isLoading?: boolean
}

export function NewsSection({ news, isLoading }: NewsSectionProps) {
  if (isLoading) {
    return (
      <Card className="h-full bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Newspaper className="h-5 w-5 text-primary" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-24 h-16 bg-secondary rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-3 bg-secondary rounded w-full" />
                <div className="h-3 bg-secondary rounded w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Newspaper className="h-5 w-5 text-primary" />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No news available</p>
        ) : (
          news.map((item) => (
            <a
              key={item.news_id}
              href={item.news_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="w-24 h-16 rounded-lg bg-secondary flex-shrink-0 overflow-hidden relative">
                {item.news_thumbnail_url ? (
                  <Image
                    src={item.news_thumbnail_url}
                    alt={item.news_title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {item.news_title}
                  <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.news_abstract}</p>
              </div>
            </a>
          ))
        )}
      </CardContent>
    </Card>
  )
}

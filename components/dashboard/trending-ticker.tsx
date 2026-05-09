"use client"

import Image from "next/image"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { TrendingSymbol } from "@/lib/api"

interface TrendingTickerProps {
  symbols: TrendingSymbol[]
  onSymbolClick?: (symbol: TrendingSymbol) => void
  onCertificationClick?: (certification: string) => void
}

export function TrendingTicker({ symbols, onSymbolClick, onCertificationClick }: TrendingTickerProps) {
  // Duplicate the array for seamless loop
  const duplicatedSymbols = [...symbols, ...symbols]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price)
  }

  return (
    <div className="overflow-hidden bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
        <TrendingUp className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Trending Symbols</span>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex animate-ticker">
          {duplicatedSymbols.map((symbol, index) => (
            <div
              key={`${symbol.symbol}-${index}`}
              className="flex items-center gap-3 px-6 py-3 border-r border-border cursor-pointer hover:bg-secondary/30 transition-colors flex-shrink-0"
              onClick={() => onSymbolClick?.(symbol)}
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden relative flex-shrink-0">
                {symbol.logo_url ? (
                  <Image
                    src={symbol.logo_url}
                    alt={symbol.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-xs font-bold text-primary">{symbol.symbol.slice(0, 2)}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{symbol.symbol}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">{symbol.class}</span>
                </div>
                <span className="text-xs text-muted-foreground truncate max-w-32">{symbol.name}</span>
              </div>
              <div className="flex flex-col items-end ml-2">
                <span className="font-mono font-semibold text-foreground">{formatPrice(symbol.last_price)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onCertificationClick?.(symbol.certification)
                  }}
                  className="text-xs text-primary hover:underline"
                >
                  {symbol.certification}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

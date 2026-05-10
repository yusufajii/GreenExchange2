"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { Leaf, Zap, Globe, TrendingUp, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HERO_IMAGE = "/thumbnails.png"
const BG_IMAGE = "https://images.bisnis.com/posts/2025/01/06/1829229/5_-_karbon_kredit_1_1736152074.jpg"

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className={`fade-in-el ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative z-10 min-h-screen bg-transparent">

      {/* ── Animations ── */}
      <style>{`
        .fade-in-el {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-in-el.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ── Fixed blurred background ── */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-background/75" />
      </div>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" />
          <Link href="/login">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">Open Environmental Asset Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Modern Trading Platform for Environmental Assets
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                GreenExchange adalah platform perdagangan digital yang dirancang untuk memodernisasi ekosistem Carbon Credit dan Renewable Energy Certificate melalui sistem bursa terbuka yang transparan dan market-driven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative h-96 rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Green Economy Illustration"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RECs Infographic ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About RECs and Carbon Credits</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding the environmental assets that power sustainable futures
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src="/recs-infographic.png"
                alt="RECs and Carbon Credits Infographic"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Problems ── */}
      <section className="py-20 px-4 bg-secondary/10 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Permasalahan Pasar Saat Ini</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pasar aset lingkungan menghadapi berbagai tantangan struktural yang menghambat pertumbuhan dan aksesibilitas
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Globe, title: "Bursa Bersifat Tertutup", desc: "Akses pasar terbatas bagi organisasi kecil dan individual participant" },
              { icon: TrendingUp, title: "Matching Market Rendah", desc: "Supply dan demand sulit bertemu secara efisien" },
              { icon: Zap, title: "Likuiditas Rendah", desc: "Aset sulit ditransaksikan cepat karena listing terbatas dan market fragmented" },
              { icon: Shield, title: "Transparansi Rendah", desc: "MRV tidak real-time dan potensi greenwashing serta manipulasi valuasi" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <Card className="bg-card/80 border-border hover:border-primary/50 transition-colors h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Solusi GreenExchange</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Platform kami menawarkan solusi komprehensif untuk modernisasi ekosistem perdagangan aset lingkungan
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Bursa Terbuka", items: ["Aksesibilitas untuk semua participant", "Voluntary dan compliance market dalam satu platform"] },
              { title: "Matching Engine Canggih", items: ["Listing dan bidding aktif kontinu", "Frekuensi transaksi lebih tinggi"] },
              { title: "Mekanisme Trading Modern", items: ["Order book dan bid/ask mechanism", "Real-time transaction execution"] },
              { title: "Harga Driven by Market", items: ["Valuasi dari supply-demand terbuka", "Transparan dan anti-monopoli"] },
              { title: "Continuous Quantity Trading", items: ["Perdagangan dalam jumlah parsial", "Fleksibel dan accessible"] },
              { title: "Transparansi Tinggi", items: ["Metadata aset terlihat jelas", "Auditability dan traceability penuh"] },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 70}>
                <Card className="bg-secondary/40 border-border h-full">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.items.map((itemText, idx) => (
                        <li key={idx} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {itemText}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 bg-secondary/10 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fitur Platform</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Platform dilengkapi dengan fitur-fitur modern untuk trading yang efisien
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Marketplace Real-Time", desc: "Temukan dan perdagangkan aset lingkungan secara real-time" },
              { icon: TrendingUp, title: "Order Book & Matching", desc: "Automatic matching dengan market depth dan price priority" },
              { icon: Shield, title: "Portfolio Management", desc: "Monitor kepemilikan, average price, dan unrealized PnL" },
              { icon: Leaf, title: "Project Submission", desc: "Ajukan project sustainability baru dengan approval workflow" },
              { icon: Zap, title: "Notification System", desc: "Real-time notification untuk aktivitas trading dan perubahan" },
              { icon: TrendingUp, title: "Price Analytics", desc: "Analisis tren harga dan performa aset historis" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 70}>
                <Card className="bg-card/80 border-border hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Target Users ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Target Pengguna</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                GreenExchange dirancang untuk berbagai kalangan di ekosistem sustainability
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Perusahaan Berbasis Sustainability",
              "Developer Energi Terbarukan",
              "Issuer Carbon Project",
              "ESG Investor",
              "Voluntary Carbon Participant",
              "Compliance Market Entity",
              "Peneliti Lingkungan",
              "Retail Participant",
              "Financial Institution",
            ].map((user, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{user}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Siap Bergabung dengan GreenExchange?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mulai perdagangkan aset lingkungan dalam ekosistem bursa terbuka yang transparan dan market-driven
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-4 border-t border-border bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo size="sm" />
              </div>
              <p className="text-sm text-muted-foreground">
                Platform perdagangan aset lingkungan modern
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Marketplace</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 GreenExchange. Building the future of environmental asset trading.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
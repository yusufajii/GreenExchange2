"use client"

import Link from "next/link"
import Image from "next/image"
import { Leaf, Zap, Globe, TrendingUp, Shield, Sparkles, ArrowRight, CheckCircle2, BarChart3, RefreshCw } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Fixed background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Image
          src="https://images.bisnis.com/posts/2025/01/06/1829229/5_-_karbon_kredit_1_1736152074.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* subtle green vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary)/.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="md" />
          <Link href="/login">
            <Button size="sm">Sign In <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-6 pb-24 pt-28">
        <div className="mx-auto max-w-6xl">
          {/* pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Open Environmental Asset Marketplace
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h1
                className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Trade the Future of{" "}
                <span className="text-primary">Clean Energy</span>
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
                GreenExchange adalah platform perdagangan digital yang memodernisasi ekosistem Carbon Credit dan
                Renewable Energy Certificate melalui bursa terbuka yang transparan dan market-driven.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>

              {/* stats row */}
              <div className="mt-12 flex flex-wrap gap-8">
                {[
                  { value: "10K+", label: "Assets Listed" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "Real-Time", label: "Price Discovery" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* hero image card */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
                <Image
                  src="/thumbnail.png"
                  alt="GreenExchange Platform"
                  width={720}
                  height={480}
                  className="w-full object-cover"
                  unoptimized
                />
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Market Activity</p>
                  <p className="text-sm font-semibold text-foreground">+24% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-border/50" />

      {/* ── About RECs infographic ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              About RECs & Carbon Credits
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Understanding the environmental assets that power sustainable futures
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-xl">
            <Image
              src="/recs-infographic.png"
              alt="RECs and Carbon Credits Infographic"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── Problems ── */}
      <section className="px-6 py-24 bg-secondary/20 border-y border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Permasalahan Pasar Saat Ini
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Pasar aset lingkungan menghadapi tantangan struktural yang menghambat pertumbuhan
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: Globe, title: "Bursa Bersifat Tertutup", desc: "Akses pasar terbatas bagi organisasi kecil dan individual participant" },
              { icon: TrendingUp, title: "Matching Market Rendah", desc: "Supply dan demand sulit bertemu secara efisien" },
              { icon: Zap, title: "Likuiditas Rendah", desc: "Aset sulit ditransaksikan cepat karena listing terbatas dan market fragmented" },
              { icon: Shield, title: "Transparansi Rendah", desc: "MRV tidak real-time dan potensi greenwashing serta manipulasi valuasi" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Solusi GreenExchange
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Platform kami menawarkan solusi komprehensif untuk modernisasi ekosistem perdagangan aset lingkungan
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Bursa Terbuka", items: ["Aksesibilitas untuk semua participant", "Voluntary dan compliance market dalam satu platform"] },
              { title: "Matching Engine Canggih", items: ["Listing dan bidding aktif kontinu", "Frekuensi transaksi lebih tinggi"] },
              { title: "Mekanisme Trading Modern", items: ["Order book dan bid/ask mechanism", "Real-time transaction execution"] },
              { title: "Harga Driven by Market", items: ["Valuasi dari supply-demand terbuka", "Transparan dan anti-monopoli"] },
              { title: "Continuous Quantity Trading", items: ["Perdagangan dalam jumlah parsial", "Fleksibel dan accessible"] },
              { title: "Transparansi Tinggi", items: ["Metadata aset terlihat jelas", "Auditability dan traceability penuh"] },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-1 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {item.items.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 text-primary">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24 bg-secondary/20 border-y border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Fitur Platform
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Fitur-fitur modern untuk trading yang efisien dan transparan
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, title: "Marketplace Real-Time", desc: "Temukan dan perdagangkan aset lingkungan secara real-time" },
              { icon: BarChart3, title: "Order Book & Matching", desc: "Automatic matching dengan market depth dan price priority" },
              { icon: Shield, title: "Portfolio Management", desc: "Monitor kepemilikan, average price, dan unrealized PnL" },
              { icon: Leaf, title: "Project Submission", desc: "Ajukan project sustainability baru dengan approval workflow" },
              { icon: Zap, title: "Notification System", desc: "Real-time notification untuk aktivitas trading dan perubahan" },
              { icon: RefreshCw, title: "Price Analytics", desc: "Analisis tren harga dan performa aset historis" },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Target users ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              Target Pengguna
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              GreenExchange dirancang untuk berbagai kalangan di ekosistem sustainability
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map((user) => (
              <div
                key={user}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{user}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 border-t border-border/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>
            Siap Bergabung dengan GreenExchange?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Mulai perdagangkan aset lingkungan dalam ekosistem bursa terbuka yang transparan dan market-driven.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 bg-secondary/20 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <Logo size="sm" className="mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Platform perdagangan aset lingkungan modern
              </p>
            </div>
            {[
              { title: "Platform", links: ["Marketplace", "Features", "Pricing"] },
              { title: "Company", links: ["About Us", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Disclaimer"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2024 GreenExchange. Building the future of environmental asset trading.
          </div>
        </div>
      </footer>
    </div>
  )
}

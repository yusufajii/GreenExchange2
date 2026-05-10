"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
Leaf,
Zap,
Globe,
TrendingUp,
Shield,
Sparkles,
ArrowRight,
CheckCircle2,
} from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HERO_IMAGE = "/thumbnails.png"
const BG_IMAGE = "https://www.aprobi.or.id/wp-content/uploads/Net-Zero.jpg"

const fadeUp = {
hidden: {
opacity: 0,
y: 40,
filter: "blur(10px)",
},
visible: {
opacity: 1,
y: 0,
filter: "blur(0px)",
transition: {
duration: 0.8,
ease: [0.22, 1, 0.36, 1],
},
},
}

const fadeLeft = {
hidden: {
opacity: 0,
x: -60,
filter: "blur(10px)",
},
visible: {
opacity: 1,
x: 0,
filter: "blur(0px)",
transition: {
duration: 0.9,
ease: [0.22, 1, 0.36, 1],
},
},
}

const fadeRight = {
hidden: {
opacity: 0,
x: 60,
scale: 0.96,
filter: "blur(10px)",
},
visible: {
opacity: 1,
x: 0,
scale: 1,
filter: "blur(0px)",
transition: {
duration: 1,
ease: [0.22, 1, 0.36, 1],
},
},
}

const staggerContainer = {
hidden: {},
visible: {
transition: {
staggerChildren: 0.12,
},
},
}

function MotionSection({
children,
className = "",
}: {
children: React.ReactNode
className?: string
}) {
return (
<motion.section
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.15 }}
variants={staggerContainer}
className={className}
>
{children}
</motion.section>
)
}

export default function AboutPage() {
return (



  {/* Background */}
  <div
    className="fixed inset-0 bg-cover bg-center scale-105"
    style={{
      backgroundImage: `url(${BG_IMAGE})`,
    }}
  >
    <div className="absolute inset-0 bg-background/75 backdrop-blur-md" />
  </div>

  {/* Floating Glows */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        x: [0, 80, 0],
        y: [0, -40, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 blur-3xl rounded-full"
    />

    <motion.div
      animate={{
        x: [0, -60, 0],
        y: [0, 50, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-emerald-400/10 blur-3xl rounded-full"
    />
  </div>

  {/* Navigation */}
  <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/50 border-b border-white/10">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        animate="visible"
      >
        <Logo size="md" />
      </motion.div>

      <motion.div
        variants={fadeRight}
        initial="hidden"
        animate="visible"
      >
        <Link href="/login">
          <Button size="sm">
            Sign In
          </Button>
        </Link>
      </motion.div>
    </div>
  </nav>

  {/* HERO */}
  <MotionSection className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      {/* LEFT */}
      <motion.div variants={fadeLeft}>

        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            GreenExchange : RECs and Carbon Credit Marketplace
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Modern Trading Platform for Environmental Assets
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-muted-foreground mb-8 leading-relaxed"
        >
          GreenExchange adalah platform perdagangan digital yang dirancang
          untuk memodernisasi ekosistem Carbon Credit dan Renewable Energy
          Certificate melalui sistem bursa terbuka yang transparan dan
          market-driven.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link href="/login">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90"
            >
              Get Started

              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        variants={fadeRight}
        className="relative"
      >
        <motion.div
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          transition={{
            duration: 0.4,
          }}
          className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <Image
            src={HERO_IMAGE}
            alt="Green Economy Illustration"
            fill
            className="object-cover"
            unoptimized
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  </MotionSection>

  {/* PROBLEMS */}
  <MotionSection className="py-24 px-4">
    <div className="max-w-6xl mx-auto">

      <motion.div
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          Permasalahan Pasar Saat Ini
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pasar aset lingkungan menghadapi berbagai tantangan struktural
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">

        {[
          {
            icon: Globe,
            title: "Bursa Bersifat Tertutup",
            desc: "Akses pasar terbatas bagi organisasi kecil dan individual participant",
          },
          {
            icon: TrendingUp,
            title: "Matching Market Rendah",
            desc: "Supply dan demand sulit bertemu secara efisien",
          },
          {
            icon: Zap,
            title: "Likuiditas Rendah",
            desc: "Aset sulit ditransaksikan cepat",
          },
          {
            icon: Shield,
            title: "Transparansi Rendah",
            desc: "MRV tidak real-time dan potensi greenwashing",
          },
        ].map((item, i) => {

          const variants = i % 2 === 0 ? fadeLeft : fadeRight

          return (
            <motion.div
              key={i}
              variants={variants}
            >
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <Card className="bg-card/70 backdrop-blur-xl border-white/10 h-full hover:border-primary/40 transition-all duration-300">
                  <CardHeader>

                    <div className="flex items-center gap-3 mb-2">

                      <div className="p-2 rounded-xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>

                      <CardTitle className="text-lg">
                        {item.title}
                      </CardTitle>

                    </div>

                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  </MotionSection>

  {/* FEATURES */}
  <MotionSection className="py-24 px-4">
    <div className="max-w-6xl mx-auto">

      <motion.div
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Fitur Platform
        </h2>

        <p className="text-muted-foreground text-lg">
          Platform dilengkapi fitur modern dan real-time
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">

        {[
          {
            icon: Globe,
            title: "Marketplace Real-Time",
            desc: "Perdagangan aset lingkungan secara real-time",
          },
          {
            icon: TrendingUp,
            title: "Order Book",
            desc: "Automatic matching dan market depth",
          },
          {
            icon: Shield,
            title: "Portfolio Management",
            desc: "Monitor kepemilikan dan PnL",
          },
          {
            icon: Leaf,
            title: "Project Submission",
            desc: "Approval workflow sustainability project",
          },
          {
            icon: Zap,
            title: "Notification System",
            desc: "Real-time notification",
          },
          {
            icon: TrendingUp,
            title: "Price Analytics",
            desc: "Historical trend analysis",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
          >
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <Card className="bg-card/70 backdrop-blur-xl border-white/10 h-full hover:border-primary/40 transition-all duration-300">

                <CardHeader>

                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  <CardTitle>
                    {item.title}
                  </CardTitle>

                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>

              </Card>
            </motion.div>
          </motion.div>
        ))}

      </div>
    </div>
  </MotionSection>

  {/* CTA */}
  <MotionSection className="py-28 px-4">
    <motion.div
      variants={fadeUp}
      className="max-w-4xl mx-auto text-center"
    >
      <h2 className="text-5xl font-bold mb-6">
        Siap Bergabung dengan GreenExchange?
      </h2>

      <p className="text-xl text-muted-foreground mb-10">
        Mulai perdagangan aset lingkungan dalam ekosistem market-driven
      </p>

      <Link href="/login">
        <Button
          size="lg"
          className="group text-lg px-8 py-6"
        >
          Get Started Now

          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  </MotionSection>

  {/* FOOTER */}
  <footer className="relative z-10 py-12 border-t border-white/10 bg-background/40 backdrop-blur-xl">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <Logo size="sm" />

      <p className="mt-4 text-muted-foreground text-sm">
        © 2026 GreenExchange — Interconnecting Indonesian Green Economy
      </p>
    </div>
  </footer>
</div>

)
}
import Link from "next/link"

export function Hero() {
  return (
    <header className="py-16 pb-20 relative">
      <div className="max-w-[1180px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-[60px] items-center">
          <div>

            <span className="font-[var(--font-instrument)] text-[32px] text-[#D4AF37] mb-2 inline-block">
              Hi I&apos;m Raymond with Proactive Painting
            </span>
            <h1 className="font-[var(--font-dm-serif)] text-[clamp(44px,6.5vw,88px)] leading-[1.02] tracking-tight font-normal mb-7 text-[#3a342c]">
              A{" "}
              <span className="font-[var(--font-instrument)] font-bold text-[#2D7D4A] text-[1.08em] inline-block mx-1">
                family
              </span>{" "}
              painting business, taking care of{" "}
              <em className="font-light text-[#D4AF37]">Bay Area homes</em> since 2018.
            </h1>
            <p className="text-[19px] leading-relaxed text-[#5e564a] max-w-[500px] mb-9">
              I&apos;ve been painting Bay Area homes since 2009, and running Proactive Painting since 2018. My wife Patty handles scheduling and keeps everything organized — when you call, you&apos;ll usually get her first, then me. No call centers, no salespeople. Just careful work on interior, exterior, and residential projects, done the way I&apos;d paint my own home.
            </p>

            <div className="flex gap-4 items-center flex-wrap">
              <Link
                href="#contact"
                className="bg-[#D4AF37] text-[#f8f3e9] px-8 py-4 rounded-full no-underline font-semibold text-base hover:bg-[#b8922f] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5"
              >
                Get a Free Quote →
              </Link>
              <div className="flex flex-col gap-0.5">
                <span className="font-[var(--font-instrument)] text-[18px] text-[#2D7D4A]">or call us</span>
                <a
                  href="tel:+14085167750"
                  className="font-[var(--font-dm-serif)] text-[28px] font-medium text-[#3a342c] no-underline tracking-tight hover:text-[#D4AF37] transition-colors"
                >
                  (408) 516-7750
                </a>
              </div>
            </div>

            <div className="flex gap-5 mt-12 items-center flex-wrap text-[#5e564a]">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                Licensed CSLB C-33
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                Fully Insured
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                16 Years Painting
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                Proactive since 2018
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-gradient-to-br from-[#c8d2bd] via-[#9caa8c] to-[#6e7d5e] rounded-md overflow-hidden shadow-[0_30px_60px_-20px_rgba(58,52,44,0.25)]">
            <div className="absolute inset-4 border border-[rgba(248,243,233,0.4)] rounded pointer-events-none" />
            <div className="absolute top-4 right-4 bg-[rgba(212,175,55,0.95)] text-[#f8f3e9] px-3 py-1.5 text-[10px] tracking-widest uppercase font-bold z-10 rounded-full">
              Swap Photo
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[rgba(248,243,233,0.96)] p-3.5 rounded">
              <div className="font-[var(--font-instrument)] text-2xl text-[#3a342c] leading-none">
                Raymond &amp; Patty
              </div>
              <div className="text-xs text-[#5e564a] tracking-widest uppercase mt-1">
                Owners · Proactive Painting
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

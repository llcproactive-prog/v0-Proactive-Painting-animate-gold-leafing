import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <header className="py-8 md:py-16 pb-12 md:pb-20 relative">
      <div className="max-w-[1180px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-[60px] items-center">
          <div className="order-2 lg:order-1 md:mt-0">

            <span className="gold-twinkle font-[var(--font-instrument)] text-[28px] md:text-[32px] text-[#D4AF37] mb-2 inline-block">
              Hi I&apos;m Raymond with Proactive Painting
            </span>
            <h1 className="font-[var(--font-dm-serif)] text-[clamp(38px,6.5vw,88px)] leading-[1.02] tracking-tight font-normal mb-6 md:mb-7 text-[#3a342c]">
              A{" "}
              <span className="font-[var(--font-instrument)] font-bold text-[#2D7D4A] text-[1.08em] inline-block mx-1">
                family
              </span>{" "}
              painting business, taking care of{" "}
              <em className="gold-glow font-light text-[#D4AF37]">Bay Area homes</em> since 2018.
            </h1>
            <p className="text-[16px] md:text-[19px] leading-relaxed text-[#5e564a] max-w-[500px] mb-7 md:mb-9">
              I&apos;ve been painting Bay Area homes since 2009, and running Proactive Painting since 2018. My wife Patty handles scheduling and keeps everything organized — when you call, you&apos;ll usually get her first, then me. No call centers, no salespeople. Just careful work on interior, exterior, and residential projects, done the way I&apos;d paint my own home.
            </p>

            <div className="flex gap-4 items-center flex-wrap">
              <Link
                href="#contact"
                className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-8 py-4 rounded-full no-underline font-semibold text-base hover:bg-[#b8922f] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5"
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

            <div className="flex gap-5 mt-10 md:mt-12 items-center flex-wrap text-[#5e564a]">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="gold-dot w-2 h-2 bg-[#D4AF37] rounded-full" />
                Licensed CSLB 1155142
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="gold-dot w-2 h-2 bg-[#D4AF37] rounded-full" style={{ animationDelay: "0.5s" }} />
                Fully Insured
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="gold-dot w-2 h-2 bg-[#D4AF37] rounded-full" style={{ animationDelay: "1s" }} />
                16 Years Painting
              </div>
              <span className="text-[rgba(58,52,44,0.14)]">·</span>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="gold-dot w-2 h-2 bg-[#D4AF37] rounded-full" style={{ animationDelay: "1.5s" }} />
                Proactive since 2018
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative aspect-[4/5] rounded-md overflow-hidden shadow-[0_30px_60px_-20px_rgba(58,52,44,0.25)] mb-4 md:mb-0">
            <Image
              src="/raymond-family.jpg"
              alt="Raymond with his family - owners of Proactive Painting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-4 border border-[rgba(248,243,233,0.4)] rounded pointer-events-none" />
            <div className="absolute top-4 right-4 bg-[rgba(212,175,55,0.95)] text-[#f8f3e9] px-3 py-1.5 text-[10px] tracking-widest uppercase font-bold z-10 rounded-full">
              Family
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

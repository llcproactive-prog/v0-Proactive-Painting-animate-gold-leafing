import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Raymond Gil — Proactive Painting",
  description: "Raymond Gil started Proactive Painting in 2018 with his wife Patty. A Bay Area painter who rebuilt his life through hard work, family, and care for every home he touches.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f3e9]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1d428a] text-[#f8f3e9] pt-20 pb-24 px-7">
        <div className="max-w-[780px] mx-auto text-center">
          <span className="gold-glitter font-[var(--font-instrument)] text-2xl text-[#D4AF37] mb-4 block">
            about raymond
          </span>
          <h1 className="font-[var(--font-dm-serif)] text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-tight font-normal mb-6">
            A painter who shows up,{" "}
            <em className="gold-glitter text-[#D4AF37]">every time.</em>
          </h1>
          <p className="font-[var(--font-instrument)] text-[19px] leading-relaxed text-[rgba(248,243,233,0.8)] max-w-[580px] mx-auto">
            I&apos;ve had a journey. Faced hard things, rebuilt my life, and now run this business with my wife Patty with a level of care that comes from knowing what matters.
          </p>
        </div>
      </section>

      {/* Story Body */}
      <section className="py-20 px-7">
        <div className="max-w-[720px] mx-auto">

          {/* Pull quote */}
          <blockquote className="border-l-4 border-[#D4AF37] pl-7 mb-14">
            <p className="font-[var(--font-dm-serif)] text-[clamp(22px,3vw,30px)] text-[#3a342c] leading-relaxed italic font-normal">
              &ldquo;I&apos;ve had a journey. Faced hard things, rebuilt my life, and now run this business with my wife Patty with a level of care that comes from knowing what matters.&rdquo;
            </p>
            <footer className="mt-4 font-[var(--font-instrument)] text-[15px] text-[#5e564a] tracking-wide uppercase not-italic">
              — Raymond Gil, Owner
            </footer>
          </blockquote>

          {/* Body text */}
          <div className="text-[18px] leading-relaxed text-[#5e564a] space-y-7 font-[var(--font-instrument)]">
            <p>
              I picked up my first paintbrush professionally in 2009. I was young, learning the trade, figuring out who I was. The years that followed weren&apos;t always easy — but they shaped the way I work and the way I treat people.
            </p>
            <p>
              When I started Proactive Painting in 2018, it wasn&apos;t just a business decision. It was a commitment. To showing up. To doing the work right. To building something I could be proud of alongside my wife Patty and our family.
            </p>
            <p>
              Patty runs the back office — she handles scheduling, follow-ups, and makes sure every client feels taken care of from the first call. I&apos;m in the field every day, on the ladder, walking every job before we start and after we finish.
            </p>
            <p>
              When you hire Proactive Painting, you&apos;re not handing your home over to a crew you&apos;ve never met. You&apos;re hiring a family that has earned the right to be trusted — one house at a time, one honest job at a time.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-14 pt-10 border-t border-[rgba(58,52,44,0.14)] flex flex-col items-start">
            <div className="font-[var(--font-dm-serif)] text-[42px] text-[#3a342c] leading-none italic">
              Raymond Gil
            </div>
            <div className="text-[13px] tracking-[0.15em] uppercase text-[#5e564a] mt-3 font-[var(--font-instrument)]">
              Owner · Proactive Painting · Est. 2018
            </div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="bg-[#f0e8d8] py-14 px-7">
        <div className="max-w-[780px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { top: "16+", bottom: "Years Painting" },
            { top: "2018", bottom: "Proactive Est." },
            { top: "CSLB", bottom: "#1155142" },
            { top: "Family", bottom: "Owned & Operated" },
          ].map((item) => (
            <div key={item.top} className="flex flex-col items-center gap-1">
              <div className="gold-glitter font-[var(--font-dm-serif)] text-[32px] text-[#D4AF37] leading-none">
                {item.top}
              </div>
              <div className="font-[var(--font-instrument)] text-[13px] font-semibold text-[#3a342c] tracking-wide uppercase">
                {item.bottom}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 text-center">
        <h2 className="font-[var(--font-dm-serif)] text-[clamp(28px,4vw,44px)] text-[#3a342c] mb-4 font-normal">
          Ready to work together?
        </h2>
        <p className="font-[var(--font-instrument)] text-[17px] text-[#5e564a] mb-8">
          We&apos;d love to come see your project. No pressure, just a conversation.
        </p>
        <Link
          href="/#contact"
          className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-10 py-4 rounded-full no-underline font-semibold text-[16px] hover:bg-[#b8922f] transition-colors inline-block"
        >
          Get a Free Quote →
        </Link>
      </section>

      <Footer />
    </main>
  )
}

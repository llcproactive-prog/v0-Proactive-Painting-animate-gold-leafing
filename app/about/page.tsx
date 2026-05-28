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
        <div className="max-w-[820px] mx-auto">

          {/* Opening hook */}
          <div className="mb-16">
            <p className="font-[var(--font-dm-serif)] text-[clamp(28px,4vw,42px)] text-[#3a342c] leading-[1.3] font-normal">
              In 2009, I was just a kid with a paintbrush.
            </p>
            <p className="font-[var(--font-dm-serif)] text-[clamp(28px,4vw,42px)] text-[#3a342c] leading-[1.3] font-normal mt-4">
              By 2018, I&apos;d been through enough to know{" "}
              <em className="gold-glitter text-[#D4AF37]">exactly what kind of man I wanted to be.</em>
            </p>
          </div>

          {/* Pull quote */}
          <blockquote className="bg-[#1d428a] text-[#f8f3e9] rounded-2xl p-10 mb-16 relative overflow-hidden">
            <div className="absolute top-4 left-6 font-[var(--font-dm-serif)] text-[120px] text-[#D4AF37]/20 leading-none">&ldquo;</div>
            <p className="font-[var(--font-dm-serif)] text-[clamp(20px,3vw,26px)] leading-relaxed italic font-normal relative z-10">
              I&apos;ve faced hard things. Rebuilt my life from scratch. And now I run this business with my wife Patty — with a level of care that only comes from knowing what really matters.
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#1d428a] grid place-items-center font-[var(--font-dm-serif)] font-bold text-xl">R</div>
              <div>
                <div className="font-[var(--font-dm-serif)] text-[18px]">Raymond Gil</div>
                <div className="font-[var(--font-instrument)] text-[13px] text-[#D4AF37]">Owner, Proactive Painting</div>
              </div>
            </footer>
          </blockquote>

          {/* Body text with emphasis */}
          <div className="text-[18px] leading-[1.8] text-[#5e564a] space-y-8">
            <p className="text-[20px] text-[#3a342c] font-medium">
              The years between 2009 and 2018 weren&apos;t always easy. But they shaped something in me — a standard I refuse to break.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 py-8">
              <div className="text-center p-6 rounded-xl bg-[#f5f1e7]">
                <div className="gold-glitter font-[var(--font-dm-serif)] text-[28px] text-[#D4AF37] mb-2">Show up</div>
                <div className="text-[14px] text-[#5e564a]">When I say I will. Every single time.</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-[#f5f1e7]">
                <div className="gold-glitter font-[var(--font-dm-serif)] text-[28px] text-[#D4AF37] mb-2">Do it right</div>
                <div className="text-[14px] text-[#5e564a]">No shortcuts. No excuses.</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-[#f5f1e7]">
                <div className="gold-glitter font-[var(--font-dm-serif)] text-[28px] text-[#D4AF37] mb-2">Earn trust</div>
                <div className="text-[14px] text-[#5e564a]">One house at a time.</div>
              </div>
            </div>

            <p>
              Patty keeps things running. She&apos;s the other half of this whole thing — I&apos;m not painting alone. But that&apos;s what we do differently. I&apos;m not some guy you hire through an app and never see again. I walk every job myself. Before we start. After we finish. And a lot during.
            </p>
            
            <p>
              I&apos;m in the field every day. On the ladder. Walking every job before we start and after we finish. This isn&apos;t a company where you talk to a salesman and never see him again.
            </p>

            <p className="text-[22px] text-[#3a342c] font-[var(--font-dm-serif)] italic border-l-4 border-[#D4AF37] pl-6 my-10">
              When you hire Proactive Painting, you&apos;re not handing your home over to strangers. You&apos;re hiring a family that has earned the right to be trusted.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-16 pt-10 border-t border-[rgba(58,52,44,0.14)] flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#1d428a] text-[#f8f3e9] grid place-items-center font-[var(--font-dm-serif)] font-bold text-3xl italic">R</div>
            <div>
              <div className="font-[var(--font-dm-serif)] text-[36px] text-[#3a342c] leading-none italic">
                Raymond Gil
              </div>
              <div className="text-[13px] tracking-[0.15em] uppercase text-[#5e564a] mt-2 font-[var(--font-instrument)]">
                Owner · Proactive Painting · Est. 2018
              </div>
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

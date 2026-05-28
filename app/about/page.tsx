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

          {/* Main narrative */}
          <div className="text-[18px] leading-[1.9] text-[#5e564a] space-y-8 font-[var(--font-instrument)]">
            <p>
              I&apos;ve been painting Bay Area homes since 2009, but the real story started earlier. I went through some deep struggles — the kind that change you, the kind that strip everything down and force you to rebuild from the ground up. For a while, I didn&apos;t know if I&apos;d find my footing again.
            </p>

            <p>
              Painting became part of how I did. There&apos;s something steadying about careful work — taping a clean line, prepping a surface right, leaving a home better than you found it. It gave me structure when I needed it, and over time it became more than a job. It became a way to show up in the world with integrity.
            </p>

            <p>
              Coming out the other side taught me discipline, gratitude, and the value of doing things right the first time. It taught me that how you do anything is how you do everything. That&apos;s why today, I walk every job personally, I stand behind the work, and I treat every home like it matters — because I know what it means to rebuild something and get it right.
            </p>

            <p className="text-[22px] text-[#3a342c] font-[var(--font-dm-serif)] italic border-l-4 border-[#D4AF37] pl-6 my-10 leading-relaxed">
              My wife Patty and I run this business together now. No call centers, no shortcuts. Just honest work, done with care, by people who don&apos;t take a second chance for granted.
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

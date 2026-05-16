import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#3a342c] text-[rgba(248,243,233,0.65)] py-12 text-sm">
      <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">
        <div>
          <div className="font-[var(--font-instrument)] text-[#2DD4BF] text-xl mb-3">Proactive Painting</div>
          <p className="leading-relaxed">
            A small, family-run painting business serving the Bay Area. Interior, exterior, residential — done with care by Raymond and Patty Gil since 2018.
          </p>
        </div>
        <div>
          <div className="font-[var(--font-instrument)] text-[#2DD4BF] text-xl mb-3">Get in touch</div>
          <a
            href="tel:+14085167750"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#2DD4BF] transition-colors"
          >
            (408) 516-7750
          </a>
          <a
            href="mailto:proactivepaintingsv@gmail.com"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#2DD4BF] transition-colors"
          >
            proactivepaintingsv@gmail.com
          </a>
          <Link
            href="#contact"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#2DD4BF] transition-colors"
          >
            Free quote
          </Link>
        </div>
        <div>
          <div className="font-[var(--font-instrument)] text-[#2DD4BF] text-xl mb-3">The details</div>
          <p className="leading-relaxed">
            CSLB 1155142 Licensed
            <br />
            Fully Insured
            <br />
            San Jose &amp; Bay Area
          </p>
        </div>
      </div>
      <div className="border-t border-[rgba(248,243,233,0.12)] mt-10 pt-5 text-center text-[13px] opacity-60 max-w-[1180px] mx-auto px-7">
        © 2026 Proactive Painting · Raymond Gil · Made with care in San Jose
      </div>
    </footer>
  )
}

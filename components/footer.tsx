import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#3a342c] text-[rgba(248,243,233,0.65)] py-12 text-sm">
      <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">
        <div>
          <div className="font-[var(--font-caveat)] text-[#f0c9a8] text-xl mb-3">Proactive Painting</div>
          <p className="leading-relaxed">
            A small, family-run painting business in San Jose. Interior, exterior, residential — done with
            care since 2008.
          </p>
        </div>
        <div>
          <div className="font-[var(--font-caveat)] text-[#f0c9a8] text-xl mb-3">Get in touch</div>
          <a
            href="tel:+14085551234"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#f0c9a8] transition-colors"
          >
            (408) 555-1234
          </a>
          <a
            href="mailto:llcproactive@gmail.com"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#f0c9a8] transition-colors"
          >
            llcproactive@gmail.com
          </a>
          <Link
            href="#contact"
            className="text-[rgba(248,243,233,0.7)] no-underline block mb-1.5 hover:text-[#f0c9a8] transition-colors"
          >
            Free quote
          </Link>
        </div>
        <div>
          <div className="font-[var(--font-caveat)] text-[#f0c9a8] text-xl mb-3">The details</div>
          <p className="leading-relaxed">
            CSLB C-33 Licensed
            <br />
            Fully Insured
            <br />
            San Jose &amp; Bay Area
          </p>
        </div>
      </div>
      <div className="border-t border-[rgba(248,243,233,0.12)] mt-10 pt-5 text-center text-[13px] opacity-60 max-w-[1180px] mx-auto px-7">
        &copy; 2026 Proactive Painting · Made with care in San Jose
      </div>
    </footer>
  )
}

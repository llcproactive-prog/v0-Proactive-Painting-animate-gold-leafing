import Link from "next/link"

export function Navbar() {
  return (
    <nav className="sticky top-0 bg-[#f8f3e9]/95 backdrop-blur-md z-50 py-5 border-b border-[rgba(58,52,44,0.14)]">
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-3.5 no-underline">
          <span className="w-11 h-11 bg-[#6e7d5e] text-[#f8f3e9] grid place-items-center font-[var(--font-fraunces)] font-medium text-[22px] rounded-full italic">
            P
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[var(--font-fraunces)] text-xl font-medium text-[#3a342c] tracking-tight">
              Proactive Painting
            </span>
            <span className="font-[var(--font-caveat)] text-[13px] text-[#c97954] mt-0.5">
              Raymond Gil · serving the Bay Area since 2018
            </span>
          </span>
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            href="#story"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#c97954] transition-colors hidden md:block"
          >
            Our Story
          </Link>
          <Link
            href="#services"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#c97954] transition-colors hidden md:block"
          >
            Services
          </Link>
          <Link
            href="#work"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#c97954] transition-colors hidden md:block"
          >
            Work
          </Link>
          <Link
            href="#reviews"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#c97954] transition-colors hidden md:block"
          >
            Reviews
          </Link>
          <Link
            href="#contact"
            className="bg-[#c97954] text-[#f8f3e9] px-5 py-2.5 rounded-full font-semibold hover:bg-[#a85c3a] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  )
}

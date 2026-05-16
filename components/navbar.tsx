"use client"

import { useState } from "react"
import Link from "next/link"

const navLinks = [
  { href: "#story", label: "Our Story" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <nav className="sticky top-0 bg-[#f8f3e9]/95 backdrop-blur-md z-50 border-b border-[rgba(58,52,44,0.14)]">
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3.5 no-underline" onClick={close}>
          <span className="w-11 h-11 bg-[#2D7D4A] text-[#f8f3e9] grid place-items-center font-[var(--font-dm-serif)] font-medium text-[22px] rounded-full italic shrink-0">
            P
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[var(--font-dm-serif)] text-xl font-medium text-[#3a342c] tracking-tight">
              Proactive Painting
            </span>
            <span className="gold-glitter font-[var(--font-instrument)] text-[13px] text-[#D4AF37] mt-0.5 hidden sm:block">
              Raymond Gil · serving the Bay Area since 2018
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#D4AF37] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-5 py-2.5 rounded-full font-semibold hover:bg-[#b8922f] transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="#contact"
            onClick={close}
            className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#b8922f] transition-colors"
          >
            Get a Quote
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full border border-[rgba(58,52,44,0.14)] bg-[#f8f3e9] shrink-0"
          >
            <span
              className={`block w-5 h-0.5 bg-[#3a342c] rounded-full transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#3a342c] rounded-full transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#3a342c] rounded-full transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 border-t border-[rgba(58,52,44,0.1)]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-7 py-4 gap-1 bg-[#f8f3e9]">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-[#3a342c] no-underline text-[17px] font-medium py-3 border-b border-[rgba(58,52,44,0.08)] last:border-0 hover:text-[#D4AF37] transition-colors"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

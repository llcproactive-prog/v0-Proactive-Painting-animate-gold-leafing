"use client"

import { useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 bg-[#f8f3e9]/95 backdrop-blur-md z-50 py-5 border-b border-[rgba(58,52,44,0.14)]">
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3.5 no-underline">
          <span className="w-11 h-11 bg-[#2D7D4A] text-[#f8f3e9] grid place-items-center font-[var(--font-dm-serif)] font-medium text-[22px] rounded-full italic">
            P
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[var(--font-dm-serif)] text-xl font-medium text-[#3a342c] tracking-tight">
              Proactive Painting
            </span>
            <span className="gold-glitter font-[var(--font-instrument)] text-[13px] text-[#D4AF37] mt-0.5">
              Raymond Gil · serving the Bay Area since 2018
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="#story"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#D4AF37] transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="#services"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#D4AF37] transition-colors"
          >
            Services
          </Link>
          <Link
            href="#work"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#D4AF37] transition-colors"
          >
            Work
          </Link>
          <Link
            href="#reviews"
            className="text-[#5e564a] no-underline text-[15px] font-medium hover:text-[#D4AF37] transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="#contact"
            className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-5 py-2.5 rounded-full font-semibold hover:bg-[#b8922f] transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle + Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="#contact"
            className="btn-glow bg-[#D4AF37] text-[#f8f3e9] px-5 py-2.5 rounded-full font-semibold hover:bg-[#b8922f] transition-colors text-sm"
          >
            Quote
          </Link>

          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#3a342c] transition-all duration-300 ease-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#3a342c] transition-all duration-300 ease-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#3a342c] transition-all duration-300 ease-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#f8f3e9] border-t border-[rgba(58,52,44,0.14)] px-7 py-4 flex flex-col gap-1">
          <Link
            href="#story"
            onClick={closeMenu}
            className="text-[#5e564a] no-underline text-[16px] font-medium hover:text-[#D4AF37] transition-colors py-3 border-b border-[rgba(58,52,44,0.08)]"
          >
            Our Story
          </Link>
          <Link
            href="#services"
            onClick={closeMenu}
            className="text-[#5e564a] no-underline text-[16px] font-medium hover:text-[#D4AF37] transition-colors py-3 border-b border-[rgba(58,52,44,0.08)]"
          >
            Services
          </Link>
          <Link
            href="#work"
            onClick={closeMenu}
            className="text-[#5e564a] no-underline text-[16px] font-medium hover:text-[#D4AF37] transition-colors py-3 border-b border-[rgba(58,52,44,0.08)]"
          >
            Work
          </Link>
          <Link
            href="#reviews"
            onClick={closeMenu}
            className="text-[#5e564a] no-underline text-[16px] font-medium hover:text-[#D4AF37] transition-colors py-3"
          >
            Reviews
          </Link>
          <Link
            href="tel:+14085167750"
            onClick={closeMenu}
            className="text-[#2D7D4A] no-underline text-[16px] font-semibold py-3 mt-2"
          >
            Call: (408) 516-7750
          </Link>
        </div>
      </div>
    </nav>
  )
}

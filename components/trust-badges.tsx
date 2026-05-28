const badges = [
  {
    top: "Family Owned",
    bottom: "& Operated",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="14" cy="13" r="5" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="26" cy="13" r="5" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="20" cy="27" r="4" stroke="#D4AF37" strokeWidth="2" />
        <path d="M6 34c0-5 3.6-8 8-8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 34c0-5-3.6-8-8-8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 34c0-4 3-6 7-6s7 2 7 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    delay: "0s",
  },
  {
    top: "16+ Years",
    bottom: "Experience",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" stroke="#D4AF37" strokeWidth="2" />
        <path d="M20 10v10l6 4" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 6v2M20 32v2M6 20H8M32 20h2" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    delay: "0.3s",
  },
  {
    top: "CSLB Licensed",
    bottom: "#1155142",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M20 4l14 6v10c0 8-6 14-14 16C12 34 6 28 6 20V10L20 4z" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 20l4 4 8-8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    delay: "0.6s",
  },
  {
    top: "Fully Insured",
    bottom: "& Bonded",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="16" width="28" height="20" rx="3" stroke="#D4AF37" strokeWidth="2" />
        <path d="M13 16v-4a7 7 0 0114 0v4" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="26" r="3" fill="#D4AF37" />
      </svg>
    ),
    delay: "0.9s",
  },
]

export function TrustBadges() {
  return (
    <section className="py-12 bg-[#f8f3e9]">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {badges.map((badge) => (
            <div
              key={badge.top}
              className="group flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl border border-[#D4AF37]/30 bg-[#faf7f0] hover:bg-[#f5f1e7] hover:border-[#D4AF37]/60 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
            >
              {/* Outer ring */}
              <div
                className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-all duration-300"
                style={{ animationDelay: badge.delay }}
              >
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/50 transition-all duration-300" />
                {/* Corner sparkles */}
                <span
                  className="sparkle-dot absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full"
                  style={{ animationDelay: badge.delay }}
                />
                <span
                  className="sparkle-dot absolute -bottom-1 -left-1 w-2 h-2 bg-[#D4AF37] rounded-full"
                  style={{ animationDelay: `calc(${badge.delay} + 0.4s)` }}
                />
                {/* Icon */}
                <div className="relative z-10 gold-glitter">
                  {badge.icon}
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <div className="gold-glitter font-[var(--font-dm-serif)] text-[16px] text-[#B8922F] leading-tight font-semibold">
                  {badge.top}
                </div>
                <div className="text-[12px] font-bold text-[#3a342c] tracking-wide uppercase mt-1">
                  {badge.bottom}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

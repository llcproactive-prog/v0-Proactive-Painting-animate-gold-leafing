"use client"

import Link from "next/link"
import { Reveal } from "./reveal"
import { BeforeAfterSlider } from "./before-after-slider"

const services = [
  {
    number: "no. 01",
    title: "Interior",
    description:
      "Walls, trim, ceilings, doors, cabinets. Careful prep, low-VOC options, furniture moved and protected like it's our own.",
    type: "slider",
  },
  {
    number: "no. 02",
    title: "Exterior",
    description:
      "Stucco, siding, decks, fences. Pressure wash, scrape, prime, finish. Bay Area weather can be tough on a house — we plan for it.",
    type: "video",
    videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/534f45d1766e4506b7454e5960f7a6db-oMT9r8keJDk78b7Wo0lp3eYjQZMWVo.mp4",
  },
  {
    number: "no. 03",
    title: "Residential",
    description:
      "Whole-home repaints, single rooms, accent walls, color consultation. We'll help you pick colors you'll love living with.",
    gradient: "from-[#f0d8c4] via-[#c97954] to-[#8a4528]",
    type: "gradient",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 pb-16">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-12">
          <span className="font-[var(--font-caveat)] text-2xl text-[#c97954] mb-2 block">what we do</span>
          <h2 className="font-[var(--font-fraunces)] text-[clamp(34px,5vw,58px)] font-normal leading-tight tracking-tight text-balance">
            Three things, done <em className="italic text-[#6e7d5e]">well.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <Link
                href="#contact"
                className="bg-[#f8f3e9] border border-[rgba(58,52,44,0.14)] rounded-lg p-8 no-underline text-[#3a342c] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(58,52,44,0.2)] hover:border-[#9caa8c] group"
              >
                <div className="aspect-[4/3] rounded mb-6 relative overflow-hidden">
                  {service.type === "slider" ? (
                    <div className="absolute inset-0 rounded overflow-hidden">
                      <BeforeAfterSlider
                        beforeSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3126-57pDbLdUJeHeTDgrkzCTkbmNnTc6kJ.jpeg"
                        afterSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3127-21ifrnlnYHRs1IdG6rYSnc1vKxdq5G.jpeg"
                        beforeAlt="Interior living room painted blue-grey with white crown molding"
                        afterAlt="Interior dining room painted blue-grey with white crown molding and crystal chandelier"
                        beforeLabel="Living Room"
                        afterLabel="Dining Room"
                      />
                    </div>
                  ) : service.type === "video" ? (
                    <video
                      src={service.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute top-2 right-2 bg-[rgba(201,121,84,0.95)] text-[#f8f3e9] px-3 py-1.5 text-[10px] tracking-widest uppercase font-bold z-10 rounded-full">
                        Swap Image
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </>
                  )}
                </div>
                <span className="font-[var(--font-caveat)] text-[22px] text-[#c97954] mb-1">
                  {service.number}
                </span>
                <h3 className="font-[var(--font-fraunces)] text-[30px] font-medium tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-[#5e564a] flex-1 mb-5">
                  {service.description}
                </p>
                <span className="text-[#c97954] font-semibold text-[15px] inline-flex items-center gap-1.5 transition-all duration-300 group-hover:gap-3">
                  Get a quote →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

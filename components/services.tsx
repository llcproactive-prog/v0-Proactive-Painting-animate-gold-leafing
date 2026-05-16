"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Reveal } from "./reveal"
import { BeforeAfterSlider } from "./before-after-slider"

function ServiceVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = isMuted
      video.play().catch(() => {
        console.log("[v0] Video autoplay blocked, trying muted")
        video.muted = true
        video.play()
      })
    }
  }, [isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        console.log("[v0] Initial autoplay blocked")
      })
    }
  }, [])

  return (
    <div className="absolute inset-0 bg-[#2a2a2a]">
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsMuted(!isMuted)
        }}
        className="absolute bottom-3 right-3 z-10 bg-[rgba(58,52,44,0.7)] hover:bg-[rgba(58,52,44,0.9)] text-[#f8f3e9] p-2 rounded-full transition-all duration-200 hover:scale-110"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  )
}

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
                    <ServiceVideo src={service.videoSrc!} />
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

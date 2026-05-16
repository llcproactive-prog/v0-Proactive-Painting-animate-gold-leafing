"use client"

import { useRef, useState } from "react"
import { Reveal } from "./reveal"
import { BeforeAfterSlider } from "./before-after-slider"

const photos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5519-jgxAkqvraDWOHmbBzkk9McCqf8HLPC.jpeg",
    alt: "Victorian house exterior painted light blue-grey with white trim and dark cone roof",
    label: "Victorian Exterior",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4065-Wc5tcJ8S0e0IXKdLKWgjKwQI6O1uTD.jpeg",
    alt: "Cape Cod style house painted grey with navy blue shutters and white trim",
    label: "Exterior Repaint",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1362-1m60OIFWArMhHFWHrCBxuhWNZTjx0n.jpeg",
    alt: "Modern single-story house painted white stucco with black window frames and contemporary landscaping",
    label: "Modern Exterior",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2F751399-C790-422D-8F2F-3B45BCC39065-04vPvBCpwr0kRkhCYD2CA6uwJDMf9t.jpeg",
    alt: "Residential home with white stucco exterior, black window frames, and professional landscaping",
    label: "Modern Home",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5361-6byU8RxCo5g5Ss5KUszVw5gpiXAn6m.jpeg",
    alt: "Freshly stained wood deck with matching railing in warm cedar tone",
    label: "Deck Staining",
  },
]

const doorStaining = {
  beforeSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5065-pEe2cKkJWHsmfnBRLjJXyOz1uHNNEl.jpeg",
  afterSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5203-QKJFS14MYeheIM5sxdduaqV3WrJ1N3.jpeg",
  beforeAlt: "Arched double wood entry door in raw unfinished wood before staining",
  afterAlt: "Arched double wood entry door with rich warm stain finish",
  label: "Door Staining",
}

const exteriorStaining = {
  beforeSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8589-JtMQh4YK7tYOptNsaaIeV9u3ARWSfB.jpeg",
  afterSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8673-FpvpvhyuFyu7swSaKrYJzD05orVLm0.jpeg",
  beforeAlt: "Garage door with raw untreated wood and weathered finish before staining",
  afterAlt: "Same garage door with rich dark reddish-brown stain finish after treatment",
  label: "Exterior Staining",
  beforeLabel: "Raw Wood",
  afterLabel: "Stained",
}

const interiorSlider = {
  beforeSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3126-57pDbLdUJeHeTDgrkzCTkbmNnTc6kJ.jpeg",
  afterSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3127-21ifrnlnYHRs1IdG6rYSnc1vKxdq5G.jpeg",
  beforeAlt: "Interior living room painted blue-grey with white crown molding and hardwood floors",
  afterAlt: "Interior dining room painted blue-grey with white crown molding and crystal chandelier",
  label: "Interior Painting",
  beforeLabel: "Living Room",
  afterLabel: "Dining Room",
}

const rotations = ["-rotate-1", "", "rotate-1", "-rotate-[0.5deg]", "rotate-1"]

function PhotoTile({ photo, index }: { photo: typeof photos[0]; index: number }) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-md bg-[#c8d2bd] group ${rotations[index] ?? ""}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,52,44,0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[#f8f3e9] text-xs tracking-widest uppercase font-bold">{photo.label}</span>
      </div>
    </div>
  )
}

function VideoTile() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-md bg-[#c8d2bd] group cursor-pointer"
      onClick={handlePlay}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <video
        ref={videoRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8675_compressed-7joecMwQIi0wj4VllyNpL7lJLqzkn6.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,52,44,0.55)] via-transparent to-transparent" />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-80 transition-opacity duration-300">
          <div className="w-14 h-14 bg-[rgba(248,243,233,0.9)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 text-[#3a342c] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="text-[#f8f3e9] text-xs tracking-widest uppercase font-bold">Project Timelapse</span>
      </div>
    </div>
  )
}

export function Gallery() {
  return (
    <section id="work" className="py-20 bg-[#f0e8d8]">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-10">
          <span className="font-[var(--font-caveat)] text-2xl text-[#c97954] mb-1 block">recent work</span>
          <h2 className="font-[var(--font-fraunces)] text-[clamp(34px,5vw,58px)] font-normal leading-tight tracking-tight text-balance">
            A few <em className="italic text-[#6e7d5e]">homes</em> we&apos;ve loved.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {photos.slice(0, 4).map((photo, i) => (
            <Reveal key={i} delay={i * 60}>
              <PhotoTile photo={photo} index={i} />
            </Reveal>
          ))}

          <Reveal delay={240}>
            <BeforeAfterSlider
              beforeSrc={interiorSlider.beforeSrc}
              afterSrc={interiorSlider.afterSrc}
              beforeAlt={interiorSlider.beforeAlt}
              afterAlt={interiorSlider.afterAlt}
              label={interiorSlider.label}
              beforeLabel={interiorSlider.beforeLabel}
              afterLabel={interiorSlider.afterLabel}
            />
          </Reveal>

          <Reveal delay={300}>
            <BeforeAfterSlider
              beforeSrc={exteriorStaining.beforeSrc}
              afterSrc={exteriorStaining.afterSrc}
              beforeAlt={exteriorStaining.beforeAlt}
              afterAlt={exteriorStaining.afterAlt}
              label={exteriorStaining.label}
              beforeLabel={exteriorStaining.beforeLabel}
              afterLabel={exteriorStaining.afterLabel}
            />
          </Reveal>

          <Reveal delay={360}>
            <BeforeAfterSlider
              beforeSrc={doorStaining.beforeSrc}
              afterSrc={doorStaining.afterSrc}
              beforeAlt={doorStaining.beforeAlt}
              afterAlt={doorStaining.afterAlt}
              label={doorStaining.label}
            />
          </Reveal>

          <Reveal delay={420}>
            <VideoTile />
          </Reveal>

          <Reveal delay={480}>
            <PhotoTile photo={photos[4]} index={4} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

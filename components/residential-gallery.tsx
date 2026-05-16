"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const residentialPhotos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5652-mwkaOqXjKnx2wcI7e4u4ZZbR89TIgt.jpeg",
    alt: "Modern residential building with stucco facade",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5457-mWYJD51E0kV56F3tdktEl9zKHikBI6.jpeg",
    alt: "Contemporary house exterior with dark siding and red accent",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6054-nYrZ0mvu39TOfwo7SzjwnD5FqpVhth.jpeg",
    alt: "Traditional white house exterior with architectural details",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0614.JPG-mhaLiooKgBJLULjTkmITfEggCowE7M.jpeg",
    alt: "Classic-style house with blue-grey exterior and white trim",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D8FFCB1D-E48C-4E68-8207-B8AB061A76BF-NEGjVOBQ0cRc94FuiCFQb0c65sqKPi.jpg",
    alt: "Modern patio with stucco exterior and outdoor living space",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5476-xqYm5pXnOdzUlU7yZHt5w5dFR3sJ4j.jpeg",
    alt: "Interior renovation in progress with exposed beams",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5494-nii3MHUeK5xMeqDeu8HqwVa2mgW4KT.jpeg",
    alt: "Open living room with dark beams and mountain views",
  },
]

export function ResidentialGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % residentialPhotos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + residentialPhotos.length) % residentialPhotos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % residentialPhotos.length)
  }

  return (
    <div className="absolute inset-0 rounded overflow-hidden group">
      {/* Main image */}
      <div className="relative w-full h-full">
        <Image
          src={residentialPhotos[currentIndex].src}
          alt={residentialPhotos[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.preventDefault()
          goToPrevious()
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-[rgba(58,52,44,0.6)] hover:bg-[rgba(58,52,44,0.8)] text-[#f8f3e9] p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        title="Previous image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          goToNext()
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-[rgba(58,52,44,0.6)] hover:bg-[rgba(58,52,44,0.8)] text-[#f8f3e9] p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        title="Next image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {residentialPhotos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              goToSlide(index)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#f8f3e9] w-6"
                : "bg-[rgba(248,243,233,0.5)] hover:bg-[rgba(248,243,233,0.7)]"
            }`}
            title={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

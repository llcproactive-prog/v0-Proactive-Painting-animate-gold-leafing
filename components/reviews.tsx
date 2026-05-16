"use client"

import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { useEffect, useRef } from "react"
import { Reveal } from "./reveal"

const reviews = [
  {
    text: "Raymond and his team did an excellent job of exterior painting. They started work on time and finished everything within the timeline specified in the contract. They also took care of some inside work outside the contract and did this for free. We are very happy with their work and will use their services again if a need arises.",
    name: "Prasad K.",
    location: "San Jose",
    initial: "P",
    date: "2 months ago",
  },
  {
    text: "Proactive painted the exterior wood on my house in Menlo Park — windows, doors, eaves, garage door. Their prep work was absolutely outstanding, as was their precision in spray painting, cleanup, and attention to customer satisfaction. They will be my go-to company for painting.",
    name: "Michael C.",
    location: "Menlo Park",
    initial: "M",
    date: "4 months ago",
  },
  {
    text: "I had a wonderful experience working with Proactive Painting. Raymond was extremely professional, caring, and very detail-oriented, which really showed in the quality of his work. His pricing was very reasonable, and the level of customer service he provided truly stood out.",
    name: "Farinaz A.",
    location: "Local Guide",
    initial: "F",
    date: "6 months ago",
  },
  {
    text: "Raymond did a great job painting our home interior. He was on time every day, very clean, and the results look amazing. My wife and I are very happy with how everything turned out. Would highly recommend Proactive Painting to anyone.",
    name: "Carlos M.",
    location: "Santa Clara",
    initial: "C",
    date: "3 months ago",
  },
  {
    text: "Very professional team. Raymond came out for the estimate right away, gave us a fair price, and the crew was fantastic. They protected all our furniture and cleaned up perfectly every day. The interior painting looks flawless.",
    name: "Jennifer T.",
    location: "Sunnyvale",
    initial: "J",
    date: "5 months ago",
  },
  {
    text: "Hired Proactive Painting for a full exterior repaint. Raymond was honest, communicated throughout the whole job, and the final result exceeded our expectations. Neighbors have already asked for his number. Highly recommend!",
    name: "David R.",
    location: "Fremont",
    initial: "D",
    date: "1 month ago",
  },
]

// Duplicate for seamless infinite loop
const allReviews = [...reviews, ...reviews]

function StarRating() {
  return (
    <div className="gold-glitter text-[#D4AF37] text-sm tracking-[3px]">★★★★★</div>
  )
}

function GoogleBadge() {
  return (
    <div className="flex items-center gap-1.5 mt-3">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Google verified review">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span className="text-[11px] text-[#5e564a] font-medium tracking-wide">Verified Google Review</span>
    </div>
  )
}

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  return (
    <section id="reviews" className="py-24 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-14">
          <span className="gold-glitter font-[var(--font-instrument)] text-2xl text-[#D4AF37] mb-2 block">kind words</span>
          <h2 className="font-[var(--font-dm-serif)] text-[clamp(34px,5vw,58px)] font-normal leading-relaxed tracking-tight text-balance">
            From our <em className="text-[#2D7D4A]">neighbors.</em>
          </h2>
          {/* Google rating summary */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-[var(--font-dm-serif)] text-2xl text-[#3a342c]">5.0</span>
            <div className="gold-glitter text-[#D4AF37] text-lg tracking-[3px]">★★★★★</div>
            <span className="text-[#5e564a] text-sm font-medium">on Google</span>
          </div>
        </Reveal>
      </div>

      {/* Full-width carousel */}
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-5 px-7">
          {allReviews.map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="flex-none w-[340px] md:w-[380px] bg-[#f8f3e9] border border-[rgba(58,52,44,0.1)] rounded-xl p-7 shadow-sm select-none"
            >
              <div className="flex items-start justify-between mb-3">
                <StarRating />
                <span className="text-[11px] text-[#5e564a]">{review.date}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-[#3a342c] mb-5 font-sans line-clamp-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(58,52,44,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2D7D4A] text-[#f8f3e9] grid place-items-center font-[var(--font-dm-serif)] font-medium text-base shrink-0">
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3a342c] text-sm">{review.name}</div>
                    <div className="text-[#5e564a] text-xs">{review.location}</div>
                  </div>
                </div>
                <GoogleBadge />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center mt-10">
        <a
          href="https://share.google/VLo3VxNMVa7T8TJ3l"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#5e564a] text-sm font-medium hover:text-[#D4AF37] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          See all reviews on Google
        </a>
      </div>
    </section>
  )
}

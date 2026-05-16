import { Reveal } from "./reveal"

const reviews = [
  {
    text: "Raymond and his team did an excellent job of exterior painting. They started work on time and finished everything within the timeline specified in the contract. They also took care of some inside work outside the contract and did this for free. We are very happy with their work and will use their services again if a need arises.",
    name: "Prasad K.",
    location: "Exterior painting",
    initial: "P",
  },
  {
    text: "Proactive painted the exterior wood on my house in Menlo Park — windows, doors, eaves, garage door. Their prep work was absolutely outstanding, as was their precision in spray painting, cleanup, and attention to customer satisfaction. They will be my go-to company for painting.",
    name: "Michael C.",
    location: "Menlo Park",
    initial: "M",
  },
  {
    text: "I had a wonderful experience working with Proactive Painting. Raymond was extremely professional, caring, and very detail-oriented, which really showed in the quality of his work. His pricing was very reasonable, and the level of customer service he provided truly stood out.",
    name: "Farinaz A.",
    location: "Local Guide · Google Reviews",
    initial: "F",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-12">
          <span className="font-[var(--font-instrument)] text-2xl text-[#D4AF37] mb-2 block">kind words</span>
          <h2 className="font-[var(--font-dm-serif)] text-[clamp(34px,5vw,58px)] font-normal leading-relaxed tracking-tight text-balance">
            From our <em className="text-[#2D7D4A]">neighbors.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 100}>
              <div className="bg-[#f8f3e9] border border-[rgba(58,52,44,0.14)] rounded-lg p-9 relative">
                <div className="absolute -top-5 left-5 font-[var(--font-dm-serif)] text-[100px] text-[#D4AF37] leading-none font-normal">
                  &ldquo;
                </div>
                <div className="text-[#D4AF37] text-base tracking-[3px] mb-4">★★★★★</div>
                <p className="font-[var(--font-dm-serif)] text-[19px] leading-snug font-normal tracking-tight mb-6 text-[#3a342c]">
                  {review.text}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[rgba(58,52,44,0.14)]">
                  <div className="w-11 h-11 rounded-full bg-[#2D7D4A] text-[#f8f3e9] grid place-items-center font-[var(--font-dm-serif)] font-medium text-lg">
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3a342c] text-[15px]">{review.name}</div>
                    <div className="text-[#5e564a] font-[var(--font-instrument)] text-base">{review.location}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

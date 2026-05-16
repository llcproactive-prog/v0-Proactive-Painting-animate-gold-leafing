import { Reveal } from "./reveal"

const reviews = [
  {
    text: "Ray and his crew repainted our whole exterior. The prep work was meticulous before a single coat went on. Two years later it still looks brand new.",
    name: "Jennifer M.",
    location: "Willow Glen",
    initial: "J",
  },
  {
    text: "They showed up when they said they would, finished on schedule, and left the house cleaner than they found it. I've worked with three painters before — none came close.",
    name: "David R.",
    location: "Cupertino",
    initial: "D",
  },
  {
    text: "Honest quote, no surprise charges. Ray walked me through every decision — color, sheen, prep. Felt like a friend helping out, not a contractor.",
    name: "Anita P.",
    location: "Almaden Valley",
    initial: "A",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-[120px]">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-14">
          <span className="font-[var(--font-caveat)] text-2xl text-[#c97954] mb-2 block">kind words</span>
          <h2 className="font-[var(--font-fraunces)] text-[clamp(34px,5vw,58px)] font-normal leading-tight tracking-tight text-balance">
            From our <em className="italic text-[#6e7d5e]">neighbors.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 100}>
              <div className="bg-[#f8f3e9] border border-[rgba(58,52,44,0.14)] rounded-lg p-9 relative">
                <div className="absolute -top-5 left-5 font-[var(--font-fraunces)] text-[100px] text-[#c97954] leading-none font-normal">
                  &ldquo;
                </div>
                <div className="text-[#c97954] text-base tracking-[3px] mb-4">★★★★★</div>
                <p className="font-[var(--font-fraunces)] text-[19px] leading-snug font-normal tracking-tight mb-6 text-[#3a342c]">
                  {review.text}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[rgba(58,52,44,0.14)]">
                  <div className="w-11 h-11 rounded-full bg-[#9caa8c] text-[#f8f3e9] grid place-items-center font-[var(--font-fraunces)] font-medium text-lg">
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3a342c] text-[15px]">{review.name}</div>
                    <div className="text-[#5e564a] font-[var(--font-caveat)] text-base">{review.location}</div>
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

import { Reveal } from "./reveal"

const galleryGradients = [
  "from-[#f0d8c4] to-[#c97954]",
  "from-[#c8d2bd] to-[#6e7d5e]",
  "from-[#e8d9bc] to-[#8a6f48]",
  "from-[#f8f3e9] to-[#9caa8c]",
  "from-[#c97954] to-[#5e564a]",
  "from-[#9caa8c] to-[#3a342c]",
]

const rotations = ["-rotate-1", "", "rotate-1", "", "-rotate-[0.5deg]", ""]

export function Gallery() {
  return (
    <section id="work" className="py-[100px] bg-[#f0e8d8]">
      <div className="max-w-[1180px] mx-auto px-7">
        <Reveal className="text-center mb-14">
          <span className="font-[var(--font-caveat)] text-2xl text-[#c97954] mb-2 block">recent work</span>
          <h2 className="font-[var(--font-fraunces)] text-[clamp(34px,5vw,58px)] font-normal leading-tight tracking-tight text-balance">
            A few <em className="italic text-[#6e7d5e]">homes</em> we&apos;ve loved.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {galleryGradients.map((gradient, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className={`relative aspect-square overflow-hidden rounded-md bg-[#c8d2bd] group ${rotations[i]}`}
              >
                <div className="absolute top-2 right-2 bg-[rgba(201,121,84,0.95)] text-[#f8f3e9] px-3 py-1.5 text-[10px] tracking-widest uppercase font-bold z-10 rounded-full">
                  Photo {i + 1}
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.06]`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

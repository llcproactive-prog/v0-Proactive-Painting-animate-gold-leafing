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

const rotations = ["-rotate-1", "", "rotate-1"]

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
          {/* First two regular photos */}
          {photos.slice(0, 2).map((photo, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`relative aspect-square overflow-hidden rounded-md bg-[#c8d2bd] group ${rotations[i] ?? ""}`}>
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
            </Reveal>
          ))}

          {/* Before/After slider for door staining */}
          <Reveal delay={120}>
            <BeforeAfterSlider
              beforeSrc={doorStaining.beforeSrc}
              afterSrc={doorStaining.afterSrc}
              beforeAlt={doorStaining.beforeAlt}
              afterAlt={doorStaining.afterAlt}
              label={doorStaining.label}
            />
          </Reveal>

          {/* Last photo - deck staining */}
          <Reveal delay={180}>
            <div className={`relative aspect-square overflow-hidden rounded-md bg-[#c8d2bd] group ${rotations[2]}`}>
              <img
                src={photos[2].src}
                alt={photos[2].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,52,44,0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[#f8f3e9] text-xs tracking-widest uppercase font-bold">{photos[2].label}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

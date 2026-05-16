import { Reveal } from "./reveal"

export function Story() {
  return (
    <section id="story" className="py-[100px] bg-[#f0e8d8]">
      <div className="max-w-[780px] mx-auto text-center px-7">
        <Reveal>
          <span className="font-[var(--font-caveat)] text-2xl text-[#c97954] mb-3 block">our story</span>
          <h2 className="font-[var(--font-fraunces)] text-[clamp(32px,4.5vw,52px)] font-normal leading-tight tracking-tight mb-8 text-balance">
            A small business with <em className="italic text-[#c97954]">big care</em> for every home we paint.
          </h2>
          <div className="text-lg leading-relaxed text-[#5e564a] space-y-6">
            <p>
              I started Proactive Painting in 2008 with a single truck and a promise: show up when I say I
              will, do the work right, and treat every house like it&apos;s the only one on my list.
            </p>
            <p>
              Almost two decades later, that hasn&apos;t changed. Patty handles the scheduling and keeps
              things running. I&apos;m the one in the field, on the ladder, walking every job before we start
              and after we finish. Our crew is small, our standards are high, and our clients tend to stay
              with us for years.
            </p>
            <p>
              If you&apos;re looking for a painting company that picks up the phone, sticks to the quote, and
              leaves your home better than they found it — that&apos;s us. I&apos;d love to come see your
              project.
            </p>
          </div>
          <div className="mt-10 inline-flex flex-col items-center">
            <div className="font-[var(--font-caveat)] text-[38px] text-[#3a342c] leading-none -rotate-3">
              — Ray
            </div>
            <div className="text-[13px] tracking-[0.15em] uppercase text-[#5e564a] mt-3">
              Owner, Proactive Painting
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

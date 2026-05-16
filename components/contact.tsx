"use client"

import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Interior",
    city: "",
    details: "",
  })

  const handleSubmit = () => {
    alert("Form needs to be wired up to your email service or Formspree.")
  }

  return (
    <section id="contact" className="bg-[#2D7D4A] text-[#f8f3e9] py-24 pb-16 relative overflow-hidden">
      <div className="absolute -top-[150px] -left-[150px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.25),transparent_70%)] rounded-full" />

      <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 relative">
        <div>
          <span className="font-[var(--font-instrument)] text-2xl text-[#2DD4BF] mb-2 block">get in touch</span>
          <h2 className="font-[var(--font-dm-serif)] text-[clamp(36px,5vw,60px)] leading-relaxed tracking-tight font-normal mb-6">
            Let&apos;s{" "}
            <span className="font-[var(--font-instrument)] font-bold text-[#2DD4BF] inline-block text-[1.05em]">
              talk
            </span>{" "}
            about your home.
          </h2>
          <p className="text-[17px] opacity-90 leading-relaxed max-w-[420px] mb-9">
            Give us a call or send a few details. Patty or I will personally get back to you within one business day — usually sooner.
          </p>

          <div className="bg-[rgba(248,243,233,0.08)] border border-[rgba(248,243,233,0.2)] rounded-lg p-6 mb-5">
            <div className="font-[var(--font-instrument)] text-xl text-[#2DD4BF] mb-1">
              call or text Raymond directly
            </div>
            <a
              href="tel:+14085167750"
              className="font-[var(--font-dm-serif)] text-4xl text-[#f8f3e9] no-underline tracking-tight block hover:text-[#2DD4BF] transition-colors"
            >
              (408) 516-7750
            </a>
            <div className="text-sm opacity-70 mt-1">Mon–Sat · 7am–6pm</div>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-[rgba(248,243,233,0.15)]">
            <span className="opacity-70 text-sm">Email</span>
            <a
              href="mailto:proactivepaintingsv@gmail.com"
              className="text-[#f8f3e9] no-underline font-[var(--font-dm-serif)] text-lg hover:text-[#2DD4BF] transition-colors"
            >
              proactivepaintingsv@gmail.com
            </a>
          </div>
          <div className="flex items-center justify-between py-4 border-t border-[rgba(248,243,233,0.15)]">
            <span className="opacity-70 text-sm">Service area</span>
            <span className="font-[var(--font-dm-serif)] text-lg">San Jose &amp; Bay Area</span>
          </div>
          <div className="flex items-center justify-between py-4 border-t border-[rgba(248,243,233,0.15)]">
            <span className="opacity-70 text-sm">License</span>
            <span className="font-[var(--font-dm-serif)] text-lg">CSLB 1155142</span>
          </div>
        </div>

        <div className="bg-[#f8f3e9] text-[#3a342c] p-10 rounded-lg shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)]">
          <div className="font-[var(--font-instrument)] text-[22px] text-[#D4AF37] mb-1.5">
            tell us about your project
          </div>
          <div className="font-[var(--font-dm-serif)] text-[26px] font-medium mb-7 tracking-tight">
            Request a free quote
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">Your name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">
                What&apos;s the project?
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all"
              >
                <option>Interior</option>
                <option>Exterior</option>
                <option>Residential — whole home</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">City</label>
              <input
                type="text"
                placeholder="San Jose, etc."
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all placeholder:text-[#5e564a]/50"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-[13px] mb-1.5 font-semibold text-[#5e564a]">
              A few details (optional)
            </label>
            <textarea
              placeholder="Rooms, timeline, anything we should know."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full bg-[#f0e8d8] border border-transparent text-[#3a342c] px-4 py-3 text-[15px] rounded-md focus:outline-none focus:border-[#D4AF37] focus:bg-[#f8f3e9] transition-all resize-y min-h-[90px] placeholder:text-[#5e564a]/50"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#D4AF37] text-[#f8f3e9] border-none py-4 text-base font-bold cursor-pointer mt-2 rounded-full hover:bg-[#b8922f] hover:-translate-y-0.5 transition-all"
          >
            Send it →
          </button>
          <p className="font-[var(--font-instrument)] text-[17px] text-[#2DD4BF] mt-4 text-center">
            we usually reply same day
          </p>
        </div>
      </div>
    </section>
  )
}

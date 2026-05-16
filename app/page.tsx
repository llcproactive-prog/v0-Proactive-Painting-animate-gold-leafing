import { GoldLeafBackground } from "@/components/gold-leaf-background"
import { BrushstrokesAnimation } from "@/components/brushstrokes-animation"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Story } from "@/components/story"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Reviews } from "@/components/reviews"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <GoldLeafBackground />
      <BrushstrokesAnimation />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Story />
        <Services />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PopularClasses } from "@/components/landing/PopularClasses";
import { WhyYogbook } from "@/components/landing/WhyYogbook";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <PopularClasses />
        <WhyYogbook />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
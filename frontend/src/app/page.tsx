import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { FeaturedClasses } from "@/features/classes/components/FeaturedClasses";
import { Benefits } from "@/components/landing/Benefits";
import { Instructors } from "@/components/landing/Instructors";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AIAssistant />
        <FeaturedClasses />
        <Benefits />
        <Instructors />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
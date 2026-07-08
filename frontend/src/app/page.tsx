import { Hero } from "@/components/landing/Hero";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { FeaturedClasses } from "@/features/classes/components/FeaturedClasses";
import { Benefits } from "@/components/landing/Benefits";
import { Instructors } from "@/components/landing/Instructors";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <FeaturedClasses />
      <AIAssistant />
      <Benefits />
      <Instructors />
      <ContactSection />
      <CTA />
    </main>
  );
}
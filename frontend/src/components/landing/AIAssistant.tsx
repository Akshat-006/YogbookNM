"use client";

import { BrainCircuit, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AIAssistant() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function generateRecommendation() {
    // Simple client-side heuristics for demo purposes
    let rec = "We recommend a gentle Hatha sequence focusing on breathwork.";

    if (goal === "weight-loss") rec = "Vinyasa flows and Sun Salutations to build heat and stamina.";
    if (goal === "flexibility") rec = "Yin-inspired holds and mobility-focused flows.";
    if (goal === "stress") rec = "Restorative postures and pranayama for relaxation.";
    if (goal === "strength") rec = "Power Yoga focusing on core and upper-body strength.";

    if (experience === "beginner") rec = `Beginner-friendly: ${rec}`;
    if (problem) rec += `\nNote: for ${problem}, consider gentle modifications and consult a teacher.`;

    setResult(rec);
  }

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/6 via-background to-accent/6" />
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 xl:gap-24">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/8 px-5 py-2.5">
              <BrainCircuit className="size-4 text-primary" />
              <span className="text-sm font-semibold text-primary">AI Yoga Assistant</span>
            </div>

            <h2 className="font-heading mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[52px]">
              Personalized yoga
              <br />
              <span className="text-primary">suggestions for you</span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Tell us a bit about yourself and your concern. We&apos;ll suggest a short practice and
              recommend booking a free consultation with our expert instructors.
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Instant recommendations", "Personalized plans", "Expert matching"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-[32px] border border-border bg-card/80 p-8 shadow-premium backdrop-blur-sm">
              <h3 className="font-heading mb-6 text-lg font-bold">Your Wellness Profile</h3>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-border bg-background/80 focus-visible:ring-primary/30"
                  />
                  <Input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="rounded-xl border-border bg-background/80 focus-visible:ring-primary/30"
                  />
                </div>

                <Select onValueChange={(v) => setExperience(v)}>
                  <SelectTrigger className="rounded-xl border-border bg-background/80">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(v) => setGoal(v)}>
                  <SelectTrigger className="rounded-xl border-border bg-background/80">
                    <SelectValue placeholder="Your Primary Goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="stress">Reduce Stress</SelectItem>
                    <SelectItem value="strength">Build Strength</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={() => {}}>
                  <SelectTrigger className="rounded-xl border-border bg-background/80">
                    <SelectValue placeholder="Daily Practice Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="45">45 Minutes</SelectItem>
                    <SelectItem value="60">60+ Minutes</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Describe any concern (optional)"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="rounded-xl border-border bg-background/80 focus-visible:ring-primary/30"
                />

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                    onClick={generateRecommendation}
                  >
                    <Sparkles className="mr-2 size-4" />
                    Generate My Yoga Plan
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border font-semibold transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    onClick={() => (window.location.href = "/appointments")}
                  >
                    Book Free Consult
                  </Button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-primary/20 bg-primary/5 p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="size-4 text-primary" />
                      <h4 className="text-sm font-bold text-primary">Your Recommended Practice</h4>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">{result}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
"use client";

import { BrainCircuit, Sparkles } from "lucide-react";
import { useState } from "react";

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
  const [time, setTime] = useState("");
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
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <BrainCircuit className="size-4 text-primary" />
              <span className="text-sm font-medium">AI Yoga Assistant</span>
            </div>

            <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-6xl">Personalized yoga suggestions</h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Tell us a bit about yourself and your concern. We'll suggest a short practice and recommend booking a free consultation.
            </p>
          </div>

          <div className="rounded-3xl border bg-background p-8 shadow-sm">
            <div className="grid gap-4">
              <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />

              <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

              <Select onValueChange={(v) => setExperience(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setGoal(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Your Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="stress">Reduce Stress</SelectItem>
                  <SelectItem value="strength">Build Strength</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setTime(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Daily Practice Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                  <SelectItem value="45">45 Minutes</SelectItem>
                  <SelectItem value="60">60+ Minutes</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Describe your problem (optional)" value={problem} onChange={(e) => setProblem(e.target.value)} />

              <div className="flex gap-3">
                <Button size="lg" className="rounded-full" onClick={generateRecommendation}>
                  <Sparkles className="mr-2 size-4" /> Generate My Yoga Plan
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full" onClick={() => window.location.href = '/appointments'}>
                  Book Free Consultation
                </Button>
              </div>

              {result && (
                <div className="mt-4 rounded-2xl border bg-background p-4">
                  <h3 className="font-semibold">Recommended practice</h3>
                  <p className="whitespace-pre-wrap mt-2 text-sm text-muted-foreground">{result}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
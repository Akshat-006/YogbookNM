"use client";

import { BrainCircuit, Sparkles } from "lucide-react";

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
  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <BrainCircuit className="size-4 text-primary" />

              <span className="text-sm font-medium">
                AI Yoga Assistant
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Your personalized
              <br />
              yoga journey
              <br />
              starts here.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Answer a few simple questions and let Yogbook create a yoga
              routine based on your goals, experience and lifestyle.
            </p>

          </div>

          {/* Right */}

          <div className="rounded-3xl border bg-background p-8 shadow-sm">

            <div className="grid gap-5">

              <Input placeholder="Your Name" />

              <Input
                type="number"
                placeholder="Age"
              />

              <Select>

                <SelectTrigger>

                  <SelectValue placeholder="Experience" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="beginner">
                    Beginner
                  </SelectItem>

                  <SelectItem value="intermediate">
                    Intermediate
                  </SelectItem>

                  <SelectItem value="advanced">
                    Advanced
                  </SelectItem>

                </SelectContent>

              </Select>

              <Select>

                <SelectTrigger>

                  <SelectValue placeholder="Your Goal" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="weight-loss">
                    Weight Loss
                  </SelectItem>

                  <SelectItem value="flexibility">
                    Flexibility
                  </SelectItem>

                  <SelectItem value="stress">
                    Reduce Stress
                  </SelectItem>

                  <SelectItem value="strength">
                    Build Strength
                  </SelectItem>

                </SelectContent>

              </Select>

              <Select>

                <SelectTrigger>

                  <SelectValue placeholder="Daily Practice Time" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="15">
                    15 Minutes
                  </SelectItem>

                  <SelectItem value="30">
                    30 Minutes
                  </SelectItem>

                  <SelectItem value="45">
                    45 Minutes
                  </SelectItem>

                  <SelectItem value="60">
                    60+ Minutes
                  </SelectItem>

                </SelectContent>

              </Select>

              <Button
                size="lg"
                className="mt-2 rounded-full"
              >
                <Sparkles className="mr-2 size-4" />

                Generate My Yoga Plan

              </Button>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
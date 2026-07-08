"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

import { useSendOTP } from "../hooks/useSendOTP";
import { useVerifyOTP } from "../hooks/useVerifyOTP";

const schema = z.object({
    email: z.string().email("Enter valid email"),
});

type FormData = z.infer<typeof schema>;

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({
  open,
  onOpenChange,
}: LoginDialogProps) {

    const router = useRouter();

    const [step, setStep] = useState<1 | 2>(1);

    const [otp, setOtp] = useState("");

    const sendOTP = useSendOTP();

    const verifyOTP = useVerifyOTP();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
        },
    });

    async function handleSendOTP() {

        const valid = await form.trigger();

        if (!valid) return;

        try {
            await sendOTP.mutateAsync({
                email: form.getValues("email"),
            });
            setStep(2);
        } catch (error: unknown) {
            const message =
                (error as any)?.response?.data?.detail ||
                "Unable to send OTP right now. Please try again.";
            alert(message);
        }
    }

    async function handleVerifyOTP() {

        try {
            const response = await verifyOTP.mutateAsync({
                email: form.getValues("email"),
                otp,
            });

            localStorage.setItem("token", response.access_token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("email", form.getValues("email"));

            window.dispatchEvent(new Event("authChanged"));

            onOpenChange(false);

            if (response.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }

            router.refresh();
        } catch (error: unknown) {
            const message =
                (error as any)?.response?.data?.detail ||
                "OTP verification failed. Please try again.";
            alert(message);
        }
    }

    return (

        <Dialog
            open={open}
            onOpenChange={(value) => {

                onOpenChange(value);

                if (!value) {

                setStep(1);

                setOtp("");

                form.reset();

                }

            }}
            >

            <DialogContent className="overflow-hidden p-0 sm:max-w-md">

                {/* Header gradient strip */}
                <div className="relative flex flex-col items-center bg-gradient-to-br from-primary/15 via-primary/8 to-accent/8 px-8 pt-10 pb-8 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Flower2 className="size-6" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight">
                    Welcome to Yogbook
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {step === 1 ? "Enter your email to continue" : "Enter the OTP we sent to your email"}
                  </p>

                  {/* Step indicator */}
                  <div className="mt-5 flex items-center gap-2">
                    {[1, 2].map((s) => (
                      <div
                        key={s}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          s === step
                            ? "w-6 bg-primary"
                            : s < step
                            ? "w-2 bg-primary/50"
                            : "w-2 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Form area */}
                <div className="px-8 py-7">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="h-12 rounded-xl border-border pl-11 focus-visible:ring-primary/30"
                            {...form.register("email")}
                          />
                        </div>

                        {form.formState.errors.email && (
                          <p className="text-xs text-destructive">
                            {form.formState.errors.email.message}
                          </p>
                        )}

                        <Button
                          className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                          onClick={handleSendOTP}
                          disabled={sendOTP.isPending}
                        >
                          {sendOTP.isPending ? "Sending OTP..." : "Send OTP →"}
                        </Button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="6-digit OTP"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="h-12 rounded-xl border-border pl-11 text-center text-xl font-bold tracking-[0.5em] focus-visible:ring-primary/30"
                          />
                        </div>

                        <p className="text-center text-xs text-muted-foreground">
                          Sent to{" "}
                          <span className="font-semibold text-foreground">
                            {form.getValues("email")}
                          </span>
                        </p>

                        <Button
                          className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                          disabled={verifyOTP.isPending || otp.length !== 6}
                          onClick={handleVerifyOTP}
                        >
                          {verifyOTP.isPending ? "Verifying..." : "Verify & Login →"}
                        </Button>

                        <Button
                          variant="ghost"
                          className="h-10 w-full rounded-xl text-sm text-muted-foreground hover:text-foreground"
                          disabled={sendOTP.isPending}
                          onClick={handleSendOTP}
                        >
                          Resend OTP
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

            </DialogContent>

        </Dialog>

    );

}
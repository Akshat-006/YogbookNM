"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

        await sendOTP.mutateAsync({
            email: form.getValues("email"),
        });

        setStep(2);
    }

    async function handleVerifyOTP() {

        const response = await verifyOTP.mutateAsync({

            email: form.getValues("email"),

            otp,
        });

        localStorage.setItem(
            "token",
            response.access_token
        );

        localStorage.setItem(
            "role",
            response.role
        );

        onOpenChange(false);

        if (response.role === "admin") {

            router.push("/admin");

        } else {

            router.push("/dashboard");

        }

        router.refresh();
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

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <DialogTitle>

                        Login to Yogbook

                    </DialogTitle>

                </DialogHeader>

                {step === 1 && (

                    <div className="space-y-5">

                        <Input

                            placeholder="Enter Email"

                            {...form.register("email")}

                        />

                        {form.formState.errors.email && (

                            <p className="text-sm text-red-500">

                                {form.formState.errors.email.message}

                            </p>

                        )}

                        <Button

                            className="w-full"

                            onClick={handleSendOTP}

                            disabled={sendOTP.isPending}

                        >

                            {

                                sendOTP.isPending

                                    ? "Sending OTP..."

                                    : "Send OTP"

                            }

                        </Button>

                    </div>

                )}

                {step === 2 && (

                    <div className="space-y-5">

                        <Input

                            placeholder="Enter 6 Digit OTP"

                            maxLength={6}

                            value={otp}

                            onChange={(e) =>

                                setOtp(e.target.value)

                            }

                        />

                        <Button

                            className="w-full"

                            disabled={

                                verifyOTP.isPending ||

                                otp.length !== 6

                            }

                            onClick={handleVerifyOTP}

                        >

                            {

                                verifyOTP.isPending

                                    ? "Verifying..."

                                    : "Verify OTP"

                            }

                        </Button>

                        <Button

                            variant="ghost"

                            className="w-full"

                            disabled={sendOTP.isPending}

                            onClick={handleSendOTP}

                        >

                            Resend OTP

                        </Button>

                    </div>

                )}

            </DialogContent>

        </Dialog>

    );

}
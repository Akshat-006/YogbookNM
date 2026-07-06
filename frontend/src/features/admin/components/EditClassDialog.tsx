"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { AdminClass } from "../types/class.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  instructor_name: z.string().min(2),

  duration: z.coerce.number().min(15),
  capacity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),

  meet_link: z.string().optional(),

  schedule_datetime: z.string(),

  recurring: z.boolean(),

  recurring_type: z.enum([
    "none",
    "daily",
    "weekly",
  ]),

  recurring_until: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  yogaClass: AdminClass | null;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export function EditClassDialog({
  open,
  onOpenChange,
  yogaClass,
  onSubmit,
  loading,
}: Props) {
  const form = useForm<
    z.input<typeof schema>,
    any,
    z.output<typeof schema>
  >({
    resolver: zodResolver(schema),

    defaultValues: {
      recurring: false,
      recurring_type: "none",
    },
  });

  useEffect(() => {
    if (!yogaClass) return;

    form.reset({
      title: yogaClass.title,
      description: yogaClass.description,
      instructor_name: yogaClass.instructor_name,
      duration: yogaClass.duration,
      capacity: yogaClass.capacity,
      price: yogaClass.price,
      meet_link: yogaClass.meet_link,
      schedule_datetime:
        yogaClass.schedule_datetime.slice(0, 16),
      recurring:
          yogaClass.recurring ?? false,

      recurring_type:
        yogaClass.recurring_type ?? "none",

      recurring_until:
        yogaClass.recurring_until?.slice(0,16) ?? "",
        
    });
    
  }, [yogaClass, form]);


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Class
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input {...form.register("title")} />

          <Textarea
            {...form.register("description")}
          />

          <Input
            {...form.register("instructor_name")}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              {...form.register("duration")}
            />

            <Input
              type="number"
              {...form.register("capacity")}
            />

            <Input
              type="number"
              {...form.register("price")}
            />
          </div>

          <Input
            {...form.register("meet_link")}
          />

          <Input
            type="datetime-local"
            {...form.register("schedule_datetime")}
          />

          <div className="space-y-5">
            <div className="flex items-center space-x-3">

              <Checkbox
                checked={form.watch("recurring")}
                onCheckedChange={(checked) =>
                  form.setValue("recurring", Boolean(checked))
                }
              />

              <Label>
                Recurring Class
              </Label>

            </div>

            {form.watch("recurring") && (

              <>

                <Select
                  defaultValue="none"
                  onValueChange={(value) =>
                    form.setValue(
                      "recurring_type",
                      value as
                        | "none"
                        | "daily"
                        | "weekly"
                    )
                  }
                >

                  <SelectTrigger>

                    <SelectValue />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="daily">
                      Daily
                    </SelectItem>

                    <SelectItem value="weekly">
                      Weekly
                    </SelectItem>

                  </SelectContent>

                </Select>

                <Input
                  type="datetime-local"
                  {...form.register("recurring_until")}
                />

              </>

            )}

          </div>

          <Button
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Class"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
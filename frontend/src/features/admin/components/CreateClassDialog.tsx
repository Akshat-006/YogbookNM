"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export function CreateClassDialog({
  open,
  onOpenChange,
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

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-3xl border border-border shadow-2xl">
        <div className="bg-gradient-to-br from-primary/12 via-primary/6 to-accent/6 px-8 py-6 border-b border-border">
          <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Create Yoga Class
          </DialogTitle>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Fill in the details below to publish a new yoga class to the public schedule.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-8"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Class Title</Label>
              <Input
                id="title"
                placeholder="Vinyasa Flow, Hatha Yoga, etc."
                className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                {...form.register("title")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the focus, level, and expectations for this class..."
                className="min-h-[100px] rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                {...form.register("description")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="instructor_name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Instructor Name</Label>
                <Input
                  id="instructor_name"
                  placeholder="e.g. Sarah Jenkins"
                  className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                  {...form.register("instructor_name")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="meet_link" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Google Meet Link / URL</Label>
                <Input
                  id="meet_link"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                  {...form.register("meet_link")}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="duration" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration (mins)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                  {...form.register("duration")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="capacity" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="20"
                  className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                  {...form.register("capacity")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price (INR)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="500"
                  className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                  {...form.register("price")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="schedule_datetime" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Start Date & Time</Label>
              <Input
                id="schedule_datetime"
                type="datetime-local"
                className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/30"
                {...form.register("schedule_datetime")}
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="recurring"
                checked={form.watch("recurring")}
                onCheckedChange={(checked) =>
                  form.setValue("recurring", Boolean(checked))
                }
                className="rounded-md border-border text-primary focus:ring-primary/30"
              />
              <Label htmlFor="recurring" className="text-sm font-medium text-foreground cursor-pointer select-none">
                Make this a recurring class series
              </Label>
            </div>

            {form.watch("recurring") && (
              <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-primary/10 bg-primary/4 p-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Frequency</Label>
                  <Select
                    value={form.watch("recurring_type") ?? "none"}
                    onValueChange={(value) =>
                      form.setValue(
                        "recurring_type",
                        value as "none" | "daily" | "weekly"
                      )
                    }
                  >
                    <SelectTrigger className="rounded-xl border-border bg-background/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="recurring_until" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">End Date</Label>
                  <Input
                    id="recurring_until"
                    type="datetime-local"
                    className="rounded-xl border-border bg-background/80 focus-visible:ring-primary/30"
                    {...form.register("recurring_until")}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-5 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl px-5 border-border"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-md hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              {loading ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
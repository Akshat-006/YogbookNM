"use client";

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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Create Yoga Class
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            placeholder="Class Title"
            {...form.register("title")}
          />

          <Textarea
            placeholder="Description"
            {...form.register("description")}
          />

          <Input
            placeholder="Instructor"
            {...form.register("instructor_name")}
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="Duration"
              {...form.register("duration")}
            />

            <Input
              type="number"
              placeholder="Capacity"
              {...form.register("capacity")}
            />

            <Input
              type="number"
              placeholder="Price"
              {...form.register("price")}
            />
          </div>

          <Input
            placeholder="Google Meet Link"
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

                  form.setValue(
                    "recurring",
                    Boolean(checked)
                  )

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

                  {...form.register(
                    "recurring_until"
                  )}

                />

              </>

            )}

          </div>

          <Button
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Class"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CMSContent } from "../types/cms.types";

interface Props {
  items: CMSContent[];
  onEdit: (item: CMSContent) => void;
  onDelete: (item: CMSContent) => void;
  deletingId?: string | null;
}

export function CMSContentList({ items, onEdit, onDelete, deletingId }: Props) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-border bg-muted/20 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No CMS content has been created yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <Card
          key={item._id}
          className="group rounded-2xl border-border shadow-sm transition-all hover:shadow-premium"
        >
          <CardContent className="p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {item.key}
                </span>
                <h3 className="font-heading mt-2.5 text-base font-bold leading-tight">
                  {item.title ?? "Untitled block"}
                </h3>
              </div>

              <div className="flex gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary"
                  onClick={() => onEdit(item)}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onDelete(item)}
                  disabled={deletingId === item._id}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1.5 text-sm text-muted-foreground">
              {item.subtitle && (
                <p className="line-clamp-2 leading-relaxed">{item.subtitle}</p>
              )}
              {item.description && !item.subtitle && (
                <p className="line-clamp-2 leading-relaxed">{item.description}</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              {item.button_text ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium">
                  🔗 {item.button_text}
                </span>
              ) : (
                <span />
              )}
              <span className={item.is_active ? "pill-success" : "pill-neutral"}>
                {item.is_active ? "Active" : "Hidden"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

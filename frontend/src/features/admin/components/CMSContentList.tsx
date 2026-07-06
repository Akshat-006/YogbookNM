"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="rounded-3xl">
        <CardContent className="p-8 text-sm text-muted-foreground">
          No CMS content has been created yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item._id} className="rounded-3xl">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <CardTitle className="text-lg">{item.title ?? item.key}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item)}
                disabled={deletingId === item._id}
              >
                {deletingId === item._id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Key:</span> {item.key}
            </p>
            {item.subtitle && <p>{item.subtitle}</p>}
            {item.description && <p>{item.description}</p>}
            {item.button_text && (
              <p>
                <span className="font-medium text-foreground">Button:</span> {item.button_text}
              </p>
            )}
            {item.button_link && (
              <p>
                <span className="font-medium text-foreground">Link:</span> {item.button_link}
              </p>
            )}
            <p>
              <span className="font-medium text-foreground">Visible:</span> {item.is_active ? "Yes" : "No"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

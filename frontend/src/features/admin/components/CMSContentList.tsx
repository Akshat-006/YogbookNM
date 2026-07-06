"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CMSContent } from "../types/cms.types";

interface Props {
  items: CMSContent[];
}

export function CMSContentList({ items }: Props) {
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
          <CardHeader>
            <CardTitle className="text-lg">{item.title ?? item.key}</CardTitle>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { CMSContentList } from "@/features/admin/components/CMSContentList";
import { useCMS } from "@/features/admin/hooks/useCMS";

export default function AdminCMSPage() {
  const { data = [], isLoading, isError } = useCMS();

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">CMS Content</h1>
        <p className="text-sm text-muted-foreground">
          Review the content blocks currently available for the public site.
        </p>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading CMS content...</p>}
      {isError && <p className="text-sm text-red-500">Unable to load CMS content.</p>}
      {!isLoading && !isError && <CMSContentList items={data} />}
    </div>
  );
}

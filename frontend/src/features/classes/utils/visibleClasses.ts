type ClassWithSchedule = {
  _id: string;
  series_id?: string | null;
  recurring?: boolean;
  schedule_datetime: string;
  is_active?: boolean;
};

export function getDisplayClasses<T extends ClassWithSchedule>(classes: T[]): T[] {
  const visibleClasses = classes.filter((item) => item.is_active !== false);

  const grouped = new Map<string, T>();

  visibleClasses.forEach((item) => {
    const key = item.recurring && item.series_id ? item.series_id : item._id;
    const existing = grouped.get(key);

    if (!existing) {
      grouped.set(key, item);
      return;
    }

    const currentTime = new Date(item.schedule_datetime).getTime();
    const existingTime = new Date(existing.schedule_datetime).getTime();

    if (currentTime < existingTime) {
      grouped.set(key, item);
    }
  });

  return Array.from(grouped.values()).sort(
    (a, b) => new Date(a.schedule_datetime).getTime() - new Date(b.schedule_datetime).getTime()
  );
}

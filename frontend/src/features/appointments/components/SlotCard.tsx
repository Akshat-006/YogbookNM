interface Props {
  time: string;
  available: boolean;
  onClick(): void;
}

export function SlotCard({
  time,
  available,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className="
      rounded-xl
      border
      px-5
      py-3
      transition
      hover:border-primary
      disabled:opacity-40
      "
    >
      {time}
    </button>
  );
}
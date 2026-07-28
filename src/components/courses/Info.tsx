interface InfoProps {
  title: string;
  value: string;
}

export function Info({ title, value }: InfoProps) {
  return (
    <div
      className="
            rounded-xl
            border
            border-white/[0.08]
            bg-onyx
            p-8
            "
    >
      <p
        className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-ivory-muted
                "
      >
        {title}
      </p>

      <p
        className="
                mt-4
                text-2xl
                text-champagne
                "
      >
        {value}
      </p>
    </div>
  );
}

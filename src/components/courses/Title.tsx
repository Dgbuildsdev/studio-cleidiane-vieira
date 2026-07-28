interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h2
      className="
            display
            text-[clamp(2rem,4vw,3.5rem)]
            text-ivory
            "
    >
      {children}
    </h2>
  );
}

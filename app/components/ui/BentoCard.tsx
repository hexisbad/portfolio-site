interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

const colSpanMap = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
};

const rowSpanMap = {
  1: "md:row-span-1",
  2: "md:row-span-2",
};

export default function BentoCard({
  colSpan = 1,
  rowSpan = 1,
  className = "",
  children,
  ...rest
}: BentoCardProps) {
  return (
    <div
      className={`card rounded-2xl border border-border/50 bg-surface/60 backdrop-blur-sm p-6
        hover:border-violet/30 transition-colors duration-300
        ${colSpanMap[colSpan]} ${rowSpanMap[rowSpan]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

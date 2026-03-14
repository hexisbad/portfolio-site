interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export default function BentoGrid({ className = "", children }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

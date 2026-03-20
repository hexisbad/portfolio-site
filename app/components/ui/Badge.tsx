interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.12] text-violet-300 px-3 py-1 text-xs font-medium shadow-sm shadow-violet/5 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </span>
  );
}

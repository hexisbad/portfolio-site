interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-violet/10 text-violet px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

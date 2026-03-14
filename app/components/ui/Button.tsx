import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-violet text-white hover:bg-violet/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  ghost:
    "bg-transparent text-foreground/60 border border-border hover:border-violet/50 hover:text-foreground",
};

export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

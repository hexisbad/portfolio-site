export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A full-stack web application with real-time collaboration features and an intuitive drag-and-drop interface.",
    tags: ["React", "TypeScript", "Node.js", "WebSocket"],
    href: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "Interactive 3D data visualization dashboard built with WebGL for exploring complex datasets.",
    tags: ["Three.js", "R3F", "D3.js", "GLSL"],
    href: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Project Three",
    description:
      "A design system and component library with comprehensive documentation and accessibility support.",
    tags: ["React", "Storybook", "Tailwind", "A11y"],
    href: "#",
    github: "#",
    featured: true,
  },
  {
    title: "Project Four",
    description:
      "Mobile-first e-commerce platform with optimized performance and smooth animations.",
    tags: ["Next.js", "Stripe", "GSAP", "Prisma"],
    href: "#",
    github: "#",
  },
  {
    title: "Project Five",
    description:
      "CLI tool for scaffolding and managing monorepo projects with custom templates.",
    tags: ["Node.js", "TypeScript", "CLI", "Turborepo"],
    href: "#",
    github: "#",
  },
];

export const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Company Name",
    period: "2024 — Present",
    description:
      "Building performant, accessible web applications with React and TypeScript. Leading the migration to a modern component architecture.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind"],
  },
  {
    role: "Junior Developer",
    company: "Previous Company",
    period: "2023 — 2024",
    description:
      "Developed responsive UI components and integrated REST APIs. Collaborated on design system implementation.",
    tags: ["JavaScript", "React", "CSS", "Git"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "3D & WebGL",
    skills: ["Three.js", "React Three Fiber", "GLSL Shaders", "Blender"],
  },
  {
    name: "Animation",
    skills: ["GSAP", "Framer Motion", "CSS Animations", "Lottie"],
  },
  {
    name: "Tools",
    skills: ["Git", "VS Code", "Figma", "Vercel", "pnpm"],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

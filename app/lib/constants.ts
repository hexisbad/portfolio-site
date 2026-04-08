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

export const VISIBLE_EXPERIENCE_COUNT = 2;

export const experiences: Experience[] = [
  {
    role: "Junior Software Developer",
    company: "TEXL Development",
    period: "2024 — Present",
    description:
      "Building performant, accessible web applications with React and TypeScript. Occasional Unity applications developed for intaractive corporate experience centers.",
    tags: ["Next.js", "Tailwind", "Strapi CMS", "Unity"],
  },
  {
    role: "Junior Software Developer",
    company: "Tangerine Digital",
    period: "2023 — 2024",
    description:
      "Developed mobile-first landing pages with React & CSS. Improving conversion rates for telecom & ISP campaigns",
    tags: ["TypeScript", "React", "CSS", "Git"],
  },
  {
    role: "Sales Engineer",
    company: "Sun Star Electromechanical",
    period: "2021 — 2023",
    description:
      "Designed proposals for daytime generator system installations. Created and maintained vital technical documentation for clients and internal teams. Generated over 500,000 AED in sales.",
    tags: ["Mechanical Design", "Customer Support", "Sales", "CAD"],
  },

  {
    role: "Sales Engineer",
    company: "Lancet Glass Industries",
    period: "2021 — 2021",
    description:
      "Conducted site visits and collaborated with clients to design interior glass solutions. Kept a close loop with estimation, procurement, and production teams to ensure project success.",
    tags: ["Cold Meetings", "Customer Support", "Sales", "Site visits"],
  },
  {
    role: "Sales Adminstration Trainee",
    company: "Canon Emirates LLC",
    period: "2020 — 2020",
    description:
      "Bespoke documentation for tender submissions. PowerBI dashboard creation ",
    tags: ["PowerBI", "Cross-functional Collaboration", "Sales", "Multi-million Tenders"],
  },
  {
    role: "Club President",
    company: "The GUILD Gaming Club - BITS Pilani, Dubai Campus",
    period: "2017 — 2019",
    description:
      "Hosted monthly gaming events & turnaments. Collaborated with sponsors (MSI, Monster Gaming Notebooks, Zowie) to secure prizes and equipment. All with the help of a crew of over 30 passionate volunteers. ",
    tags: ["Gaming", "Community", "Volunteer Leader", "Event Management", "Marketing"],
  },
  {
    role: "Head Admin",
    company: "MEFortress TF2",
    period: "2011 — 2015",
    description:
      "500 member gaming community focused on Team Fortress 2. Organized montly events and tournaments, fostering a welcoming and active community for TF2 players of all skill levels across MENA. Collaborated with gaming cafes to provide servers and host LAN events",
    tags: ["Competitve Gaming", "Community", "Volunteer Leader", "Event Management", "Marketing"],
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
  { label: "GitHub", href: "https://github.com/hexisbad", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/advaithkometh/", icon: "linkedin" },
  { label: "Email", href: "mailto:advaithkometh@gmail.com", icon: "mail" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

import { db } from "./client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
  taglines,
  faqs,
  testimonials,
} from "./schema";
import { requireEnv } from "@/lib/env";

// Inserted only on a fresh (empty) database. Later content changes are made in the admin
// panel, not by re-running the seed.

const taglineRows = [
  { text: "Rise above limits", active: true, order: 0 },
  { text: "Think, build, and ship", active: true, order: 1 },
];

// avatarUrl is validated as a full http(s) URL, so seed it as an absolute URL
// pointing at the bundled asset on whatever site this database serves.
// NEXT_PUBLIC_SITE_URL is always set (no fallback) — fail loudly if it isn't.
const SITE_ORIGIN = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
const seededAvatarUrl = `${SITE_ORIGIN}/images/avatar.png`;

const profileRow = {
  name: "Aryansh Gupta",
  bio: "Aryansh Gupta is a Software Developer and DevSecOps enthusiast who builds secure, high-performance web products. He works full-stack pairing polished user experiences in Next.js and TypeScript with reliable back-ends and automated deployment workflows powered by Docker and GitHub Actions.\n\nBeyond his coursework at SRM IST, he explores practical cybersecurity, cryptographic session security, and Web3 transaction defense. He is driven by clean code, thoughtful UX, and shipping work that makes an impact.",
  stats: {
    years: 2,
    repos: 10,
    stars: 0,
    followers: 0,
    stat1_label: "Years of Experience",
    stat1_value: 2,
    stat1_suffix: "+",
    stat2_label: "Projects Built",
    stat2_value: 5,
    stat2_suffix: "+",
    stat3_label: "Certifications",
    stat3_value: 15,
    stat3_suffix: "+",
    stat4_label: "Current CGPA",
    stat4_value: 8.9,
    stat4_suffix: "",
  },
  roles: ["Software Developer", "Web Engineer", "DevSecOps Enthusiast"],
  // Resume URL lives in the DB only — set it via the admin panel.
  resumeUrl: null,
  avatarUrl: seededAvatarUrl,
  heroTagline: "Open to Internships · B.Tech CSE (DevSecOps) at SRM IST",
  sectionVisibility: {},
};

// Array position IS the `order` (see the .map() below) and order doubles as the showcase
// ranking, so this sequence is the order they lead with. Language tags are omitted where
// GitHub reports the language: it renders as its own chip and mergeProjects strips duplicates.
const projectRows: (typeof projects.$inferInsert)[] = [
  {
    repo: "pokedex",
    title: "PokédeX",
    customBlurb:
      "Academic portal web application with a lightweight HTTP scraping engine, secure session handling, attendance and marks tracking, and PWA support.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Cheerio", "AES-256-GCM"],
  },
].map((p, i) => ({
  ...p,
  featured: true,
  order: i,
  hidden: false,
}));

const experienceRows = [
  {
    role: "Software Development Engineer",
    org: "StarApps Studio",
    period: "Jul 2024 – Present",
    location: "Pune, India",
    isCurrent: true,
    description: [
      "Currently working on developing innovative software solutions.",
      "Contributing to large-scale projects with a focus on performance optimization.",
      "Collaborating closely with cross-functional teams to ensure product quality.",
      "Adhering to clean code practices and modern development techniques.",
    ],
    order: 0,
  },
  {
    role: "Full Stack Developer",
    org: "Merito",
    period: "Feb 2023 – Jul 2024",
    location: "Pune, India",
    isCurrent: false,
    description: [
      "Developed over 5 web applications with seamless backend API integration.",
      "Streamlined workflows by eliminating redundant data, boosting efficiency.",
      "Improved website loading time by 80% through image optimization, minimizing main-thread work, and implementing SEO strategies.",
      "Resolved 100+ bugs and conducted thorough code reviews.",
      "Demonstrated expertise in both backend and frontend development.",
    ],
    order: 1,
  },
  {
    role: "Full Stack Development Intern",
    org: "TECHOX LLP",
    period: "May 2021 – Jul 2022",
    location: "Remote",
    isCurrent: false,
    description: [
      "Revamped and enhanced 3+ mobile apps using Flutter.",
      "Deployed RESTful APIs for seamless app-server integration.",
      "Integrated Google AdMob to effectively monetize applications.",
      "Contributed to boosting app functionality and revenue generation.",
    ],
    order: 2,
  },
  {
    role: "Web Development Intern",
    org: "Career Corner Education Pvt Ltd",
    period: "Jul 2021 – Nov 2021",
    location: "Remote",
    isCurrent: false,
    description: [
      "Spearheaded website development and enhancements for company portals.",
      "Prioritized clean, reusable code with modern tech stacks.",
      "Efficiently managed multiple tasks with minimal supervision.",
      "Collaborated with senior team members to meet and exceed project goals.",
    ],
    order: 3,
  },
];

// Skills are authored grouped by category, then flattened to rows with a
// running order so the Skills section renders them grouped and in sequence.
const skillGroups: {
  category: string;
  items: { name: string; level: string; iconPath: string }[];
}[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript", level: "Expert", iconPath: "/skills/javascript.svg" },
      { name: "TypeScript", level: "Intermediate", iconPath: "/skills/typescript.svg" },
      { name: "Dart", level: "Expert", iconPath: "/skills/dart.svg" },
      { name: "Ruby", level: "Intermediate", iconPath: "/skills/ruby.png" },
    ],
  },
  {
    category: "Frontend Development",
    items: [
      { name: "Next.js", level: "Expert", iconPath: "/skills/nextjs.png" },
      { name: "React.js", level: "Expert", iconPath: "/skills/react.svg" },
      { name: "HTML", level: "Expert", iconPath: "/skills/html.svg" },
      { name: "CSS", level: "Intermediate", iconPath: "/skills/css.svg" },
      { name: "SASS", level: "Intermediate", iconPath: "/skills/sass.svg" },
      { name: "Redux Toolkit", level: "Expert", iconPath: "/skills/redux.svg" },
    ],
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", level: "Expert", iconPath: "/skills/nodejs.svg" },
      { name: "Express.js", level: "Expert", iconPath: "/skills/express.svg" },
      { name: "Ruby on Rails", level: "Intermediate", iconPath: "/skills/rails.png" },
      { name: "Socket.io", level: "Intermediate", iconPath: "/skills/socket-io.png" },
    ],
  },
  {
    category: "Mobile App Development",
    items: [
      { name: "Flutter", level: "Expert", iconPath: "/skills/flutter.svg" },
      { name: "GetX", level: "Expert", iconPath: "/skills/getx.png" },
    ],
  },
  {
    category: "Database Management",
    items: [
      { name: "MongoDB", level: "Intermediate", iconPath: "/skills/mongodb.svg" },
      { name: "PostgreSQL", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
      { name: "MySQL", level: "Beginner", iconPath: "/skills/mysql.svg" },
    ],
  },
  {
    category: "DevOps/VCS",
    items: [
      { name: "Docker", level: "Beginner", iconPath: "/skills/docker.png" },
      { name: "AWS", level: "Intermediate", iconPath: "/skills/aws.svg" },
      { name: "Git", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "GitHub", level: "Expert", iconPath: "/skills/github.svg" },
    ],
  },
  {
    category: "Miscellaneous",
    items: [
      { name: "Firebase", level: "Intermediate", iconPath: "/skills/firebase.svg" },
      { name: "Ubuntu", level: "Intermediate", iconPath: "/skills/ubuntu.png" },
    ],
  },
  {
    category: "Nontechnical Skills",
    items: [
      { name: "Problem Solving", level: "Expert", iconPath: "/images/logical-thinking.png" },
      { name: "Collaboration", level: "Expert", iconPath: "/images/collaboration.png" },
      { name: "Analytical Skills", level: "Expert", iconPath: "/images/analytical-skills.png" },
    ],
  },
];
const skillRows = skillGroups.flatMap((g, gi) =>
  g.items.map((it, ii) => ({
    name: it.name,
    iconPath: it.iconPath,
    category: g.category,
    level: it.level,
    // category index * 100 + item index keeps groups contiguous and ordered.
    order: gi * 100 + ii,
  })),
);

const serviceRows = [
  {
    title: "Web Application Development",
    shortDescription: "Responsive full-stack web applications with Next.js and TypeScript.",
    description:
      "Building responsive web apps with Next.js, React, and TypeScript. I focus on clean component structure, fast loading times, and intuitive interfaces with Tailwind CSS.",
    icon: "Code2",
    order: 0,
  },
  {
    title: "Backend & REST APIs",
    shortDescription: "Scalable API design, relational databases, and server logic.",
    description:
      "Designing structured REST APIs with Node.js and Express, integrated with PostgreSQL and Supabase. Handling database schema design, request validation, and dependable data flow.",
    icon: "Server",
    order: 1,
  },
  {
    title: "Application & Web Security",
    shortDescription: "Cryptographic storage, secure authentication, and session safety.",
    description:
      "Implementing practical web security standards including AES-256-GCM encryption, secure cookie and session tokens, rate limiting, and defense against common web vulnerabilities.",
    icon: "ShieldCheck",
    order: 2,
  },
  {
    title: "DevSecOps & CI/CD Pipelines",
    shortDescription: "Containerized environments, automated testing, and cloud deployments.",
    description:
      "Packaging apps with Docker, managing Linux environments, and setting up automated GitHub Actions pipelines to build, lint, test, and ship reliably to production.",
    icon: "Cloud",
    order: 3,
  },
  {
    title: "Web Scraping & Data Pipelines",
    shortDescription: "Automated data extraction, parsing, and structured JSON feeds.",
    description:
      "Building custom scrapers and data parsers with Cheerio and Python to extract unstructured data from web portals, handle sessions, and transform raw HTML into clean APIs.",
    icon: "Terminal",
    order: 4,
  },
  {
    title: "State Management & UI Performance",
    shortDescription: "Lightweight client state, snappy UI interactions, and caching.",
    description:
      "Managing application state with Zustand and Redux Toolkit. Minimizing unnecessary re-renders, caching client-side requests, and keeping complex UI interactions fast and smooth.",
    icon: "Zap",
    order: 5,
  },
];

const socialLinkRows = [
  {
    platform: "GitHub",
    url: "https://github.com/aryansh35",
    username: "aryansh35",
    order: 0,
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/aryansh-gupta",
    username: "Aryansh Gupta",
    order: 1,
  },
  {
    platform: "Email",
    url: "mailto:gupta.aryansh135@gmail.com",
    username: "gupta.aryansh135@gmail.com",
    order: 2,
  },
];

const fundingLinkRows: (typeof fundingLinks.$inferInsert)[] = [];

const faqRows = [
  {
    question: "Who is Aryansh Gupta?",
    answer:
      "Aryansh Gupta is a Software Developer and DevSecOps enthusiast from India studying B.Tech CSE at SRM IST. He builds secure, high-performance web products.",
    order: 0,
  },
  {
    question: "What does Aryansh build?",
    answer:
      "He builds full-stack web applications with Next.js, secure authentication engines, CI/CD deployment pipelines, and practical cybersecurity tools.",
    order: 1,
  },
  {
    question: "What is Aryansh's tech stack?",
    answer:
      "TypeScript, JavaScript, Next.js, React.js, Node.js, Express, PostgreSQL, Supabase, Docker, and Linux.",
    order: 2,
  },
  {
    question: "Is Aryansh available for collaboration?",
    answer:
      "Yes - Aryansh is open to software development internships, web engineering roles, and security collaborations. Feel free to reach out via email or LinkedIn.",
    order: 3,
  },
  {
    question: "How can I contact Aryansh?",
    answer:
      "Email is the fastest way - use the email link in the Contact section. You can also reach him on GitHub at github.com/aryansh35 and LinkedIn; the social links are in the footer.",
    order: 4,
  },
];

// Demo testimonials covering every case (pending/approved/rejected, featured,
// complete vs sparse details, a duplicate email). Seeded ONLY into an empty
// testimonials table so real user submissions are never wiped.
const testimonialRows: (typeof testimonials.$inferInsert)[] = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend & hackathon teammate",
    content:
      "Aryansh is the most driven person I studied with. We built our first hackathon project together and he carried the team - clean architecture, calm under pressure, and genuinely fun to work with.",
    status: "approved",
    featured: true,
    order: 0,
    linkedinUrl: "https://www.linkedin.com/in/aaravmehta",
    githubUrl: "https://github.com/aaravmehta",
    websiteUrl: "https://aarav.dev",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    relationship: "Engineering Manager at Merito",
    content:
      "I managed Aryansh for over a year. He consistently shipped polished features ahead of schedule and raised the quality bar for the whole team. A rare mix of speed and craft.",
    status: "approved",
    featured: true,
    order: 1,
    linkedinUrl: "https://www.linkedin.com/in/priyasharma",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    relationship: "Open-source collaborator",
    content:
      "We maintain a package together. Aryansh's reviews are thorough and kind, and his docs are the reason new contributors actually stick around.",
    status: "approved",
    featured: false,
    order: 2,
    githubUrl: "https://github.com/rahulverma",
    xUrl: "https://x.com/rahulverma",
  },
  {
    name: "Dr. Anjali Rao",
    email: "anjali.rao@example.com",
    relationship: "Professor, Computer Science",
    content:
      "Aryansh was among the most curious students I taught. He asked the questions the rest of the class was afraid to, and he always followed through with working code.",
    status: "approved",
    featured: false,
    order: 3,
  },
  {
    name: "Sofia Almeida",
    email: "sofia.almeida@example.com",
    relationship: "Product designer, freelance project",
    content:
      "Handing designs to Aryansh felt effortless. He respected the details, asked the right questions, and the final build looked better than the mockups.",
    status: "pending",
    featured: false,
    order: 4,
    instagramUrl: "https://instagram.com/sofia.designs",
    websiteUrl: "https://sofiaalmeida.design",
  },
  {
    name: "Karan Singh",
    email: "karan.singh@example.com",
    relationship: "Former teammate",
    content: "Dependable, sharp, and a great teammate. Would work with him again in a heartbeat.",
    status: "pending",
    featured: false,
    order: 5,
  },
  {
    // Duplicate email of Aarav above — exercises the admin duplicate flag.
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend",
    content:
      "Adding a second note because I forgot to mention - he also mentored three juniors on our team and they all credit him for their growth.",
    status: "pending",
    featured: false,
    order: 6,
  },
  {
    name: "Spammy McSpamface",
    email: "spam@example.com",
    relationship: "n/a",
    content:
      "Check out my amazing crypto deals at this totally legit link, definitely not spam at all friend.",
    status: "rejected",
    featured: false,
    order: 7,
  },
];

// Everything the seed writes, inserted only on a fresh (empty) database.
const SEED_DATA = {
  taglines: taglineRows,
  profile: profileRow,
  projects: projectRows,
  experiences: experienceRows,
  skills: skillRows,
  services: serviceRows,
  socialLinks: socialLinkRows,
  fundingLinks: fundingLinkRows,
  faqs: faqRows,
};

/**
 * Inserts ONLY when there is no profile row, and never wipes or overwrites, so re-running this
 * against a populated database preserves every admin edit.
 */
async function seed() {
  const [existing] = await db.select({ id: profile.id }).from(profile).limit(1);
  if (existing) {
    console.log("Database already has content; skipping seed.");
    return;
  }

  console.log("Empty database; seeding content tables…");

  await db.transaction(async (tx) => {
    await tx.insert(taglines).values(SEED_DATA.taglines);
    await tx.insert(profile).values(SEED_DATA.profile);
    await tx.insert(projects).values(SEED_DATA.projects);
    await tx.insert(experiences).values(SEED_DATA.experiences);
    await tx.insert(skills).values(SEED_DATA.skills);
    await tx.insert(services).values(SEED_DATA.services);
    await tx.insert(socialLinks).values(SEED_DATA.socialLinks);
    await tx.insert(fundingLinks).values(SEED_DATA.fundingLinks);
    await tx.insert(faqs).values(SEED_DATA.faqs);
  });

  console.log("Seed complete.");
}

/**
 * Seed demo testimonials for LOCAL UI testing only. These are fabricated, so
 * they must never reach production — skipped when NODE_ENV is "production".
 * Seeds only when the table is empty so real submissions are never wiped.
 */
async function seedDemoTestimonials() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production environment; skipping demo testimonials.");
    return;
  }
  const existing = await db.select({ id: testimonials.id }).from(testimonials).limit(1);
  if (existing.length > 0) {
    console.log("Testimonials already present; skipping demo seed.");
    return;
  }
  await db.insert(testimonials).values(testimonialRows);
  console.log(`Seeded ${testimonialRows.length} demo testimonials (local only).`);
}

seed()
  .then(() => seedDemoTestimonials())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

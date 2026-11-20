export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  role: string;
  github: string;
  live?: string;
  featured?: boolean;
  visual: "stay" | "database" | "observability" | "wallet" | "banking" | "commerce";
};

export const profile = {
  name: "Prakash Chakali",
  initials: "PC",
  title: "Java Backend Developer · Software Engineer",
  location: "Hyderabad, Telangana, India",
  timezone: "Asia/Kolkata",
  positioning: "I engineer dependable backend systems, thoughtful product experiences, and software that solves real operational problems.",
  bio: "I’m a computer science graduate specializing in Cyber Security, with a strong focus on Java, Spring Boot, databases, and backend engineering. I enjoy understanding what happens beneath framework abstractions—from transaction boundaries and concurrency to data structures and query execution. My projects combine practical application development with experiments in systems design and algorithmic problem-solving.",
  email: "prakashchakali6216@gmail.com",
  github: "https://github.com/Chakaliprakash",
  linkedin: "https://www.linkedin.com/in/prakash-chakali-753b82292/",
  x: "",
  resume: "assets/Prakash_Chakali_Resume.pdf",
  availability: "Open to entry-level Java Backend Developer and Software Engineer opportunities",
  education: {
    degree: "B.Tech · Computer Science & Engineering (Cyber Security)",
    institution: "Sri Indu College of Engineering & Technology",
    result: "CGPA 7.6 / 10",
  },
};

export const skills = [
  { group: "Backend", items: ["Java 21", "Spring Boot", "Spring Security", "Hibernate / JPA", "REST APIs", "Spring AI"] },
  { group: "Data & Systems", items: ["MySQL", "Redis", "SQL", "Concurrency", "Transactions", "Data Structures & Algorithms"] },
  { group: "Frontend", items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { group: "Tools & Delivery", items: ["Git & GitHub", "Docker", "Maven", "IntelliJ IDEA", "Postman", "GitHub Actions"] },
];

export const projects: Project[] = [
  {
    slug: "mysterystay", number: "01", name: "MysteryStay", category: "Flagship · Travel technology",
    summary: "An intelligent masked hotel-inventory monolith exploring safer booking workflows and backend consistency.",
    problem: "Hotel booking flows must protect inventory from conflicting reservations while keeping the experience clear for guests.",
    approach: "Designed a modular-monolith direction around inventory holds, transaction boundaries, and concurrency-aware booking logic. The project also includes a DSA Laboratory concept.",
    result: "A working portfolio project with architecture and concurrency concepts documented. Verified production usage metrics are not published.",
    stack: ["Java", "Spring Boot", "MySQL", "React", "JavaScript", "Docker"],
    role: "Founder & Lead Architect · Personal project",
    github: "https://github.com/Chakaliprakash/MysteryStay",
    featured: true, visual: "stay",
  },
  {
    slug: "minidb", number: "02", name: "MiniDB", category: "Systems · Database internals",
    summary: "A hand-built relational database experiment in pure Java.",
    problem: "Database abstractions hide parsing, record modeling, and primary-key lookup mechanics.",
    approach: "Explored a lightweight SQL parser, tokenizer, immutable record modeling, and hash-based primary-key indexing without relying on a full database framework.",
    result: "A compact learning implementation demonstrating core database concepts; benchmark claims are intentionally not published.",
    stack: ["Java 21", "OOP", "Collections", "Parsing", "HashMap"],
    role: "Designer & Developer · Personal project",
    github: "https://github.com/Chakaliprakash/MiniDB",
    visual: "database",
  },
  {
    slug: "logsentry", number: "03", name: "LogSentry", category: "Developer tooling",
    summary: "A log-analysis project focused on making application signals easier to inspect.",
    problem: "Raw application logs can be difficult to scan when investigating failures and recurring events.",
    approach: "Built a dedicated repository project around log inspection and developer-facing diagnostics. Detailed implementation notes can be added as the project evolves.",
    result: "Repository showcase; verified throughput and user metrics are not published.",
    stack: ["Java", "Backend Engineering", "Diagnostics"],
    role: "Developer · Personal project",
    github: "https://github.com/Chakaliprakash/LogSentry",
    visual: "observability",
  },
  {
    slug: "secure-digital-wallet", number: "04", name: "Secure Digital Wallet", category: "Backend · Financial services",
    summary: "A banking API project centered on secure wallet operations.",
    problem: "Financial APIs need clear boundaries around account access and money movement.",
    approach: "Developed a dedicated banking API repository, with security and transaction-oriented backend concerns as the core focus.",
    result: "Project repository available for code review; verified transaction-volume metrics are not published.",
    stack: ["Java", "Spring Boot", "REST API", "SQL", "Security"],
    role: "Developer · Personal project",
    github: "https://github.com/Chakaliprakash/Secure-Digital-Wallet--Banking-API",
    visual: "wallet",
  },
  {
    slug: "finix-banking", number: "05", name: "Finix Banking", category: "Backend · Banking",
    summary: "A banking application exploring account operations and financial transaction workflows.",
    problem: "Banking interfaces need dependable account operations and an understandable transaction ledger.",
    approach: "Built account and transaction domain models, service layers, and a web interface; a separate Spring Boot integration is part of the ongoing work.",
    result: "Personal project with ongoing integration work. No production scale claims are made.",
    stack: ["Java", "Spring Boot", "Maven", "HTML", "CSS", "JavaScript"],
    role: "Developer · Personal project",
    github: "https://github.com/Chakaliprakash/Finix_BankingFInancialTransaction",
    visual: "banking",
  },
  {
    slug: "ecommerce", number: "06", name: "E-commerce", category: "Full-stack · Commerce",
    summary: "A commerce application project exploring a familiar product-to-purchase journey.",
    problem: "Online storefronts need a coherent path from product discovery to purchase intent.",
    approach: "Built a dedicated e-commerce repository and iterated on the application experience.",
    result: "Project repository available; live business and conversion metrics are not published.",
    stack: ["JavaScript", "React", "Web Development"],
    role: "Developer · Personal project",
    github: "https://github.com/Chakaliprakash/Ecommerce",
    visual: "commerce",
  },
];

export const certifications = [
  "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
  "Cisco Networking Academy · Cybersecurity Essentials",
  "Smart Interviews · Data Structures & Algorithms in Java",
  "Google Cloud · Generative AI Program",
];

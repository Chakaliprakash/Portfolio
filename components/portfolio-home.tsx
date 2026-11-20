"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Command, Copy, Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { certifications, profile, projects, skills } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.65, delay, ease }}>{children}</motion.div>;
}

function ProjectArtwork({ visual }: { visual: string }) {
  return <div className={`project-art art-${visual}`} aria-hidden="true"><div className="art-grid"/><div className="art-window"><div className="art-window-top"><i/><i/><i/><span>PREVIEW / 0{projects.findIndex(p=>p.visual===visual)+1}</span></div><div className="art-window-body"><span>ENGINEERING / SYSTEMS</span><strong>{visual === "stay" ? "MYSTERY / STAY" : visual.toUpperCase()}</strong><div className="art-lines"><i/><i/><i/></div></div></div><div className="art-orbit"/></div>;
}

export function PortfolioHome() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [time, setTime] = useState("--:--");
  const [progress, setProgress] = useState(0);
  const [intro, setIntro] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sending, setSending] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem("pc-theme");
    setTheme(saved === "light" || saved === "dark" ? saved : "dark");
    const start = window.setTimeout(() => setIntro(false), reduce ? 0 : 850);
    const clock = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    clock();
    const clockId = window.setInterval(clock, 30000);
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.clearTimeout(start); window.clearInterval(clockId); window.removeEventListener("scroll", scroll); };
  }, [reduce]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pc-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPaletteOpen((v) => !v); }
      if (event.key === "Escape") { setPaletteOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category.split(" · ")[0])))], []);
  const visibleProjects = filter === "All" ? projects : projects.filter((p) => p.category.startsWith(filter));
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      const subject = encodeURIComponent(String(formData.get("subject") || "Portfolio enquiry"));
      const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`);
      notify("Opening your email app to send the message");
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setSending(true);
    try {
      const response = await fetch(endpoint, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      notify("Message sent successfully");
    } catch {
      notify("Message could not be sent — email me directly");
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); notify("Email copied to clipboard"); }
    catch { notify("Copy unavailable — use the email link below"); }
  };

  return (
    <>
      <AnimatePresence>{intro && !reduce && <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45 } }}><span>PC / PORTFOLIO</span><motion.div className="intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65, ease }}/><small>DESIGNING & ENGINEERING</small></motion.div>}</AnimatePresence>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }}/>
      <header className="site-header">
        <Link href="#top" className="wordmark" aria-label="Prakash Chakali home"><span>PC</span><b>PRAKASH CHAKALI</b></Link>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work <sup>01</sup></a><a href="#about">About <sup>02</sup></a><a href="#skills">Stack <sup>03</sup></a><a href="#journey">Journey <sup>04</sup></a><a href="#contact">Contact <sup>05</sup></a></nav>
        <div className="header-actions"><button className="icon-button command-button" onClick={() => setPaletteOpen(true)} aria-label="Open command menu"><Command size={16}/><kbd>⌘ K</kbd></button><button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><a onClick={() => setMenuOpen(false)} href="#work">Work</a><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#skills">Stack</a><a onClick={() => setMenuOpen(false)} href="#journey">Journey</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a></motion.nav>}</AnimatePresence>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-topline"><span><i className="status-dot"/> OPEN TO OPPORTUNITIES</span><span>HYDERABAD, IN <b>·</b> {time} IST</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span>JAVA BACKEND</span> / SOFTWARE ENGINEERING</p>
              <h1>Engineering<br/><em>what matters.</em></h1>
              <p className="hero-description">{profile.positioning}</p>
              <div className="hero-buttons"><a href="#work" className="button button-primary">Explore selected work <ArrowRight size={16}/></a><a href="#contact" className="button button-quiet">Start a conversation <ArrowUpRight size={16}/></a></div>
              <div className="hero-footnote"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/><span className="hero-footnote-rule"/></div>
            </div>
            <div className="hero-visual" aria-label="Abstract architectural system illustration"><div className="hero-visual-label"><span>FIG. 001</span><span>STRUCTURE / SIGNAL / SYSTEM</span></div><div className="hero-diagram"><div className="diagram-ring ring-one"/><div className="diagram-ring ring-two"/><div className="diagram-cross cross-a"/><div className="diagram-cross cross-b"/><div className="diagram-core"><span>PC</span><small>BUILD / ITERATE</small></div><span className="diagram-node node-a"/><span className="diagram-node node-b"/><span className="diagram-node node-c"/></div><div className="hero-visual-bottom"><span>JAVA · SPRING · DATA</span><span>17°23′N / 78°29′E</span></div></div>
          </div>
          <div className="hero-bottomline"><span>INDEPENDENT ENGINEERING PRACTICE</span><span>01 — 06 / SELECTED WORK</span><span>SCROLL <span className="scroll-arrow">↘</span></span></div>
        </section>

        <section id="work" className="section-wrap work-section">
          <Reveal><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Built to be <em>useful.</em></h2></div><p className="section-aside">A selection of engineering projects, experiments, and product work. Each one is a chance to understand a problem more deeply.</p></div></Reveal>
          <div className="project-toolbar"><span>{String(visibleProjects.length).padStart(2,"0")} PROJECTS</span><div className="filter-list" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? "filter active" : "filter"} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
          <div className="project-grid">{visibleProjects.map((project, index) => <Reveal key={project.slug} delay={index * 0.045}><article className={project.featured ? "project-card featured" : "project-card"}><Link href={`/projects/${project.slug}`} className="project-link" aria-label={`View ${project.name} case study`}><ProjectArtwork visual={project.visual}/><div className="project-info"><div className="project-meta"><span>{project.number} / {project.category}</span><ArrowUpRight size={17}/></div><h3>{project.name}</h3><p>{project.summary}</p><div className="tag-list">{project.stack.slice(0,4).map((tag) => <span key={tag}>{tag}</span>)}</div></div></Link><a className="project-source" href={project.github} target="_blank" rel="noreferrer"><Github size={14}/> SOURCE <ArrowUpRight size={12}/></a></article></Reveal>)}</div>
        </section>

        <section id="about" className="section-wrap about-section">
          <Reveal><div className="section-heading"><div><p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p><h2>Curious by <em>design.</em></h2></div><span className="section-index">HYD / IN</span></div></Reveal>
          <div className="about-grid"><Reveal className="about-statement"><span className="big-quote">“</span><p>{profile.bio}</p><div className="about-signature">PRAKASH CHAKALI <span>· SOFTWARE ENGINEERING</span></div></Reveal><Reveal className="about-facts" delay={0.12}><div className="fact"><span>BASED IN</span><b>{profile.location}</b></div><div className="fact"><span>EDUCATION</span><b>{profile.education.degree}</b><small>{profile.education.institution} · {profile.education.result}</small></div><div className="fact"><span>FOCUS</span><b>Backend architecture / data / algorithms</b></div><div className="fact"><span>WORK STATUS</span><b className="fact-available"><i className="status-dot"/> Open to entry-level roles</b></div><a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">VIEW RESUME <ArrowUpRight size={14}/></a></Reveal></div>
        </section>

        <section id="skills" className="section-wrap skills-section">
          <Reveal><div className="section-heading"><div><p className="eyebrow">03 / TOOLS OF THE TRADE</p><h2>A considered <em>stack.</em></h2></div><p className="section-aside">Tools are choices. I focus on the fundamentals that make those choices matter.</p></div></Reveal>
          <div className="skills-layout">{skills.map((group, i) => <Reveal key={group.group} delay={i*0.06}><div className="skill-group"><span className="skill-number">0{i+1}</span><div><h3>{group.group}</h3><div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div></div></Reveal>)}</div>
        </section>

        <section id="journey" className="section-wrap journey-section">
          <Reveal><div className="section-heading"><div><p className="eyebrow">04 / LEARNING & CREDENTIALS</p><h2>Always in <em>progress.</em></h2></div><p className="section-aside">A foundation in computer science, cybersecurity, and continued practice in software engineering.</p></div></Reveal>
          <div className="journey-grid"><Reveal className="education-card"><span className="eyebrow">EDUCATION / 01</span><h3>{profile.education.degree}</h3><p>{profile.education.institution}</p><div className="education-result">{profile.education.result}</div></Reveal><Reveal className="cert-list" delay={0.1}><span className="eyebrow">CERTIFICATIONS & PROGRAMS</span>{certifications.map((item,i)=><div className="cert-row" key={item}><span>0{i+1}</span><b>{item}</b><Check size={15}/></div>)}</Reveal></div>
          <p className="experience-note">Professional experience details: <strong>Not supplied for this portfolio build.</strong> Add verified company, role, dates, and impact in <code>data/content.ts</code> when available.</p>
        </section>

        <section className="section-wrap github-section"><Reveal><div className="github-panel"><div><p className="eyebrow">OPEN SOURCE / IN PUBLIC</p><h2>Code is better <em>shared.</em></h2><p>Explore repositories, experiments, and ongoing work on GitHub.</p><a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> Visit GitHub <ArrowUpRight size={15}/></a></div><div className="github-mark"><Github size={84} strokeWidth={1}/><span>@CHAKALIPRAKASH</span><small>REPOSITORIES · EXPERIMENTS · PRACTICE</small></div></div></Reveal></section>

        <section id="contact" className="section-wrap contact-section"><Reveal><p className="eyebrow">05 / CONTACT</p><div className="contact-grid"><div><h2>Have a good<br/><em>problem?</em></h2><p className="contact-lede">I’m looking for an opportunity to contribute, learn from strong engineering teams, and build software that earns its place in production.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}?subject=Let's%20connect`}><Mail size={16}/> Email Prakash <ArrowUpRight size={15}/></a><button className="button button-quiet" onClick={copyEmail}><Copy size={15}/> Copy email</button></div></div><div className="contact-details"><form className="contact-form" onSubmit={submitContact}><label htmlFor="contact-name">YOUR NAME</label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required/><label htmlFor="contact-email">EMAIL ADDRESS</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required/><label htmlFor="contact-subject">SUBJECT</label><input id="contact-subject" name="subject" placeholder="A project or opportunity"/><label htmlFor="contact-message">MESSAGE</label><textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little about it..." required/><button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending..." : "Send message"} <ArrowUpRight size={15}/></button><small>Uses Formspree when configured; otherwise opens your email app.</small></form><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LINKEDIN <ArrowUpRight size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GITHUB <ArrowUpRight size={14}/></a><a href={`mailto:${profile.email}`}><Mail size={17}/> {profile.email} <ArrowUpRight size={14}/></a><span><i className="status-dot"/> {profile.availability}</span></div></div></Reveal></section>
      </main>
      <footer className="site-footer"><Link href="#top" className="wordmark"><span>PC</span><b>PRAKASH CHAKALI</b></Link><p>Designed with intention. Built with curiosity.</p><div><span>HYDERABAD · IST {time}</span><a href="#top">BACK TO TOP ↑</a></div><small>© {new Date().getFullYear()} PRAKASH CHAKALI</small></footer>

      <AnimatePresence>{paletteOpen && <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPaletteOpen(false)}><motion.div className="command-palette" initial={{ opacity: 0, y: 12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} onClick={(e) => e.stopPropagation()}><div className="palette-title"><Command size={16}/> QUICK NAVIGATION <button onClick={() => setPaletteOpen(false)} aria-label="Close"><X size={16}/></button></div>{[{label:"Selected work",href:"#work"},{label:"About",href:"#about"},{label:"Skills",href:"#skills"},{label:"Journey",href:"#journey"},{label:"Contact",href:"#contact"}].map((item) => <a key={item.href} href={item.href} onClick={() => setPaletteOpen(false)}>{item.label}<ArrowUpRight size={14}/></a>)}<small>PRESS ESC TO CLOSE · CTRL / CMD + K TO OPEN</small></motion.div></motion.div>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check size={15}/>{toast}</motion.div>}</AnimatePresence>
    </>
  );
}

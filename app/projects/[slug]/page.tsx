import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Layers3 } from "lucide-react";
import { projects } from "@/data/content";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.name ?? "Project", description: project?.summary ?? "Project case study" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <main className="case-page"><Link href="/">← Back to portfolio</Link><h1>Project not found</h1></main>;
  return (
    <main className="case-page">
      <div className="case-top"><Link href="/" className="back-link"><ArrowLeft size={16}/> Back to portfolio</Link><span className="eyebrow">CASE STUDY / {project.number}</span></div>
      <div className={`case-art art-${project.visual}`} aria-hidden="true"><div className="art-window"><div className="art-window-top"><i/><i/><i/></div><div className="art-window-body"><span>{project.category}</span><strong>{project.name}</strong><small>PROJECT / {project.number}</small></div></div></div>
      <p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="case-lede">{project.summary}</p>
      <div className="case-actions"><a className="button button-primary" href={project.github} target="_blank" rel="noreferrer"><Github size={16}/> Source code <ArrowUpRight size={15}/></a>{project.live && <a className="button button-quiet" href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15}/></a>}</div>
      <div className="case-grid">
        <section><span className="eyebrow">01 / THE PROBLEM</span><h2>Why it exists</h2><p>{project.problem}</p></section>
        <section><span className="eyebrow">02 / THE APPROACH</span><h2>How I approached it</h2><p>{project.approach}</p></section>
        <section><span className="eyebrow">03 / THE OUTCOME</span><h2>What exists today</h2><p>{project.result}</p></section>
        <section><span className="eyebrow">04 / MY ROLE</span><h2>Ownership</h2><p>{project.role}</p></section>
      </div>
      <section className="case-stack"><span className="eyebrow"><Layers3 size={14}/> TECHNOLOGY</span><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
      <footer className="case-footer"><Link href="/">← All work</Link><span>Built with care · Prakash Chakali</span></footer>
    </main>
  );
}

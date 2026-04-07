import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import chiWangPhoto from './assets/images/chi-wang.jpg';
import balajiPhoto from './assets/images/balaji-veeramani.jpg';
import weiWangPhoto from './assets/images/wei_wang.jpg';
import goldbergPhoto from './assets/images/goldberg.jpg';
import qiangHuangPhoto from './assets/images/qiang_huang.png';
import peterBelingPhoto from './assets/images/peter-beling.png';
import jillesVreekenPhoto from './assets/images/jilles-vreeken.jpg';
import jamesMoorePhoto from './assets/images/james-moore.jpg';
import marthaGardnerPhoto from './assets/images/martha-gardner.png';

/* ============================================
   Data
   ============================================ */
const SPEAKERS = [
  {
    name: 'Wei Chen',
    tentative: true,
    role: 'Professor, Mechanical Engineering',
    affiliation: 'Northwestern University',
    domain: 'Manufacturing and design optimization',
    photo: 'https://www.mccormick.northwestern.edu/images/research-and-faculty/directory/chen-wei.jpg',
    website: 'https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/chen-wei.html',
  },
  {
    name: 'Lihui Wang',
    tentative: true,
    role: 'Professor, Production Engineering',
    affiliation: 'KTH Royal Institute of Technology',
    domain: 'Smart manufacturing and industrial systems',
    photo: 'https://www.kth.se/files/avatar/lihuiw',
    website: 'https://www.kth.se/profile/lihuiw',
  },
  {
    name: 'Ken Goldberg',
    tentative: true,
    role: 'Professor, IEOR & EECS',
    affiliation: 'UC Berkeley',
    domain: 'Robotics and automation',
    photo: goldbergPhoto,
    website: 'https://goldberg.berkeley.edu',
  },
  {
    name: 'Wei Wang',
    tentative: true,
    role: 'Professor, Computer Science',
    affiliation: 'UCLA',
    domain: 'AI and systems',
    photo: weiWangPhoto,
    website: 'https://web.cs.ucla.edu/~weiwang/',
  },
  {
    name: 'Dawn Song',
    tentative: true,
    role: 'Professor, Computer Science',
    affiliation: 'UC Berkeley',
    domain: 'AI systems and trustworthy AI',
    photo: 'https://dawnsong.io/dawn-berkeley.png',
    website: 'https://dawnsong.io',
  },
  {
    name: 'Chi Wang',
    tentative: true,
    role: 'Senior Staff Research Scientist',
    affiliation: 'Google DeepMind',
    domain: 'Agentic AI and LLM systems',
    photo: chiWangPhoto,
    website: 'https://www.linkedin.com/in/chi-wang-autogen',
  },
  {
    name: 'Albert Shih',
    tentative: true,
    role: 'Professor, Mechanical Engineering',
    affiliation: 'University of Michigan',
    domain: 'Agentic AI for manufacturing',
    photo: 'https://me.engin.umich.edu/wp-content/uploads/2019/08/shih-albert-photo.jpg',
    website: 'https://me.engin.umich.edu/people/faculty/albert-shih/',
    backup: true,
  },
];

const PANELISTS = [
  {
    name: 'Erica Briscoe',
    tentative: true,
    role: 'Program Manager',
    affiliation: 'DARPA',
    domain: 'Public-sector perspective on AI',
    photo: 'https://usea.org/sites/default/files/styles/full-size-scale-800/public/profiles/photos/headshot_0.jpg?itok=-Dhz70JO',
    website: 'https://usea.org/profile/dr-erica-briscoe',
  },
  {
    name: 'Martha M. Gardner',
    tentative: true,
    role: 'Chief Scientist (Retired)',
    affiliation: 'GE',
    domain: 'Industry perspective on manufacturing AI',
    photo: marthaGardnerPhoto,
    website: null,
  },
  {
    name: 'James Moore',
    tentative: true,
    role: 'Fellow',
    affiliation: 'MIET',
    domain: 'Engineering and industrial perspective',
    photo: jamesMoorePhoto,
    website: 'https://www.linkedin.com/in/james-moore-miet-340076a7/',
  },
];

const ORGANIZERS = [
  {
    name: 'Dawei Zhou',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    bio: 'Research focuses on Open-World Machine Learning and AI for Scientific Discovery. 60+ publications in top venues (ICML, NeurIPS, ICLR, KDD, WWW). NSF CAREER Award (2024), Cisco Faculty Research Award (2023), AAAI New Faculty Highlights (2024), Virginia Tech Outstanding Assistant Professor Award (2025).',
    photo: 'https://website.cs.vt.edu/content/website_cs_vt_edu/en/people/faculty/dawei-zhou/_jcr_content/bio-image.transform/m-medium/image.jpeg',
    website: 'https://cs.vt.edu/people/faculty/dawei-zhou.html',
  },
  {
    name: 'Xuan Wang',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    bio: 'Research focuses on small, open-source, and multimodal language model agents for science and society. NSF CAREER Award (2025), Nvidia Academic Grant (2025), Cisco Research Award (2025), ICDM Young Female Scholar Award (2025), NAACL Best Demo Paper Award (2021).',
    photo: 'https://xuanwang91.github.io/images//img/Xuan2016.jpg',
    website: 'https://xuanwang91.github.io',
  },
  {
    name: 'Jilles Vreeken',
    role: 'Tenured Faculty',
    affiliation: 'CISPA Helmholtz Center',
    bio: 'ELLIS Fellow and Honorary Professor at Saarland University. Research in causal inference, machine learning, and data mining. 130+ papers, three best paper awards. ACM SIGKDD 2010 Doctoral Dissertation Runner-Up, IEEE ICDM 2018 Tao Li Award for Excellence in Research.',
    photo: jillesVreekenPhoto,
    website: 'https://cispa.de/en/people/jilles.vreeken',
  },
  {
    name: 'Balaji Veeramani',
    role: 'Associate VP - Data Science, Specialist Leader',
    affiliation: 'Deloitte',
    photo: balajiPhoto,
    website: 'https://www.linkedin.com/in/balaji-veeramani-9a161b9/',
  },
  {
    name: 'Ran Jin',
    role: 'Professor, Industrial Engineering',
    affiliation: 'Virginia Tech',
    photo: 'https://ise.vt.edu/content/ise_vt_edu/en/people/faculty/jin/_jcr_content/bio-image.img.jpg/1763479673462.jpg',
    website: 'https://www.ise.vt.edu/people/faculty/jin.html',
  },
  {
    name: 'Kimberly P. Ellis',
    role: 'Professor, Industrial & Systems Engineering',
    affiliation: 'Virginia Tech',
    photo: 'https://ise.vt.edu/content/ise_vt_edu/en/people/faculty/ellis/_jcr_content/bio-image.img.jpg/1763479673462.jpg',
    website: 'https://ise.vt.edu/people/faculty/ellis.html',
  },
  {
    name: 'Peter Beling',
    role: 'Professor, Data Science',
    affiliation: 'University of Virginia',
    photo: peterBelingPhoto,
    website: 'https://datascience.virginia.edu/people/peter-beling',
  },
  {
    name: 'Qiang Huang',
    role: 'Professor, Industrial & Systems Engineering',
    affiliation: 'University of Southern California',
    photo: qiangHuangPhoto,
    website: 'https://viterbi.usc.edu/directory/faculty/Huang/Qiang',
  },
];

const TOPICS = [
  {
    icon: '\u{1F916}',
    title: 'LLM Agents for Design & Engineering',
    desc: 'Language models and agents for design, engineering analysis, process planning, scheduling, and supply-chain reasoning.',
  },
  {
    icon: '\u{1F3ED}',
    title: 'Tool-Using & Multimodal Systems',
    desc: 'Systems that work with physical simulators, digital twins, robotics, and industrial data platforms to solve real manufacturing problems.',
  },
  {
    icon: '\u{1F6E1}\u{FE0F}',
    title: 'Reliability, Safety & Oversight',
    desc: 'Interpretability, safety, and human-AI collaboration in manufacturing settings where mistakes are costly.',
  },
  {
    icon: '\u{1F4CA}',
    title: 'Benchmarks & Evaluation',
    desc: 'Datasets, evaluation protocols, and case studies built specifically for testing agentic AI in manufacturing contexts.',
  },
  {
    icon: '\u{1F504}',
    title: 'Process Planning & Scheduling',
    desc: 'AI-driven approaches for multi-step production planning, resource allocation, and supply chain coordination.',
  },
  {
    icon: '\u{1F517}',
    title: 'Supply Chain Intelligence',
    desc: 'Agentic systems for supply chain decision-making, handling uncertainty, cost constraints, and downstream execution needs.',
  },
  {
    icon: '\u{1F9D1}\u{200D}\u{1F4BB}',
    title: 'Human-AI Collaboration',
    desc: 'How humans and AI agents work together in safety-critical manufacturing settings, including oversight, trust, and handoff.',
  },
  {
    icon: '\u{1F310}',
    title: 'Digital Twins & Simulation',
    desc: 'Connecting language-model agents with digital twins, physics simulators, and virtual environments for testing and validation.',
  },
];

const DATES = [
  { date: 'June 23, 2026', label: 'Workshop Paper Submission Deadline', highlight: true },
  { date: 'July 24, 2026', label: 'Acceptance Notification', note: 'Authors will be notified of decisions' },
  { date: 'August 21, 2026', label: 'Camera-Ready Deadline', note: 'Final versions due' },
  { date: 'October 9, 2026', label: 'Workshop Day', note: 'Hilton Union Square, San Francisco', highlight: true },
];

const SCHEDULE = [
  { time: '8:00 AM - 8:10 AM', title: 'Opening Remarks & Workshop Overview', speaker: 'Workshop Organizers' },
  { time: '8:10 AM - 9:50 AM', title: 'Keynote 1 + Keynote 2', speaker: '50 min each including Q&A' },
  { time: '9:50 AM - 10:10 AM', title: 'Coffee Break', isBreak: true },
  { time: '10:10 AM - 11:50 AM', title: 'Keynote 3 + Keynote 4', speaker: '50 min each including Q&A' },
  { time: '11:50 AM - 1:10 PM', title: 'Poster Session, Networking & Community Meetup', speaker: 'All Accepted Authors' },
  { time: '1:10 PM - 2:00 PM', title: 'Panel: Agentic AI for Real Manufacturing', speaker: 'Invited Panelists' },
  { time: '2:00 PM - 3:40 PM', title: 'Keynote 5 + Keynote 6', speaker: '50 min each including Q&A' },
  { time: '3:40 PM - 4:00 PM', title: 'Coffee Break & Social Event', isBreak: true },
  { time: '4:00 PM - 4:45 PM', title: 'Contributed Spotlight Talks', speaker: '8-10 min each including Q&A' },
  { time: '4:45 PM - 5:00 PM', title: 'Closing Discussion, Highlights & Next Steps', speaker: 'Workshop Organizers' },
];

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#cfp', label: 'Call for Papers' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#organizers', label: 'Organizers' },
  { href: '#contact', label: 'Contact' },
];

/* ============================================
   Components
   ============================================ */

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <div className="person-photo">
        {person.photo ? (
          <img src={person.photo} alt={person.name} loading="lazy" />
        ) : (
          <div className="person-photo-placeholder">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="person-name">{person.name}</div>
      {person.tentative && <div className="person-tentative">(tentative)</div>}
      {person.backup && <div className="person-tentative">(backup)</div>}
      <div className="person-role">{person.role}</div>
      <div className="person-affiliation">{person.affiliation}</div>
      {person.domain && <div className="person-domain">{person.domain}</div>}
      {person.bio && <div className="person-bio">{person.bio}</div>}
      {person.website && (
        <div className="person-link-wrapper">
          <a href={person.website} className="person-link" target="_blank" rel="noopener noreferrer">
            Website &#8599;
          </a>
        </div>
      )}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

/* ============================================
   Main App
   ============================================ */
function App() {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e) => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="navbar-brand">
            <span>ManuGenesis</span> @ COLM 2026
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '\u{2715}' : '\u{2630}'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            COLM 2026 Workshop
          </div>
          <h1 className="hero-title-oneline">
            ManuGenesis: Agentic AI for Autonomous Design, Manufacturing, and Supply Chain (COLM, 2026)
          </h1>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4C5}'}</span>
              October 9, 2026
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4CD}'}</span>
              Hilton Union Square, San Francisco
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F3DB}\u{FE0F}'}</span>
              Co-located with COLM 2026
            </div>
          </div>
          <div className="hero-actions">
            <a href="#cfp" className="btn btn-primary">
              Submit a Paper &#8599;
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">About</div>
              <h2 className="section-title">Workshop Overview</h2>
              <p className="section-description">
                Where agentic AI meets real-world design, manufacturing, and supply chain workflows.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Recent progress in large language models (LLMs) has enabled a new class of <em>agentic
                  AI</em> systems that can <strong>reason over goals, plan multi-step actions, call
                  external tools, and interact with humans in the loop</strong>. This shift is especially
                  relevant to <strong>design, manufacturing, and supply-chain workflows</strong>, where
                  decisions rarely happen in isolation: design choices depend on engineering constraints,
                  manufacturing plans depend on available tools and process limits, and supply-chain
                  decisions must respond to uncertainty, cost, and downstream execution requirements.
                </p>
                <p>
                  These workflows are inherently <strong>multi-stage and information-rich</strong>,
                  spanning technical documents, simulation environments, enterprise software, robotics,
                  and human expertise. As a result, they require AI systems that can do more than
                  generate text or make one-shot predictions; they require systems that can{' '}
                  <strong>coordinate across steps, integrate heterogeneous information, and support
                  decision-making under real operational constraints</strong>.
                </p>
                <p>
                  At the same time, this setting exposes some of the most central open questions for
                  agentic AI, including <strong>reliable tool use, multimodal reasoning, long-horizon
                  planning, interaction with digital twins and simulators</strong>, and{' '}
                  <strong>human–AI collaboration in safety- and quality-critical environments</strong>.
                </p>
                <p>
                  By focusing on autonomous design, manufacturing, and supply chains,{' '}
                  <strong>ManuGenesis</strong> creates a meeting point for researchers and practitioners
                  interested in grounding language-model-based agents in high-impact real-world
                  workflows, while also using these workflows to sharpen the next generation of research
                  on planning, interaction, reliability, and deployment.
                </p>
                <p>
                  The workshop aims to <strong>connect communities that rarely meet in one venue</strong>:
                  language modeling, agentic AI, robotics, industrial AI, manufacturing systems, and
                  supply-chain research. We expect participation from researchers in language models,
                  planning, robotics, optimization, and human–AI interaction, as well as practitioners
                  from manufacturing and technology companies.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F3AF}'}</span>
                  <div>
                    <h4>Grounded in Real Workflows</h4>
                    <p>Focused on actual design, manufacturing, and supply chain problems, not just benchmarks.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F91D}'}</span>
                  <div>
                    <h4>Cross-Disciplinary</h4>
                    <p>Connecting language models, planning, robotics, optimization, and manufacturing research.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F4AC}'}</span>
                  <div>
                    <h4>Full-Day Program</h4>
                    <p>Keynotes, panel discussion, poster sessions, spotlight talks, and networking.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F331}'}</span>
                  <div>
                    <h4>Open to All Career Stages</h4>
                    <p>Flexible formats for early-stage work, with support for students and junior researchers.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call for Papers (unified) */}
      <section className="section section-alt" id="cfp">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Submit Your Work</div>
              <h2 className="section-title">Call for Papers</h2>
              <p className="section-description">
                We invite submissions on agentic AI for autonomous design, manufacturing, and
                supply-chain workflows. All submissions are <strong>non-archival</strong> and
                managed via <strong>OpenReview</strong>.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading" id="topics">Scope and Topics</h3>
            <p className="cfp-sub-desc">
              We welcome submissions across a wide range of topics connecting agentic AI with
              design, manufacturing, and supply chains. Representative topics include, but are
              not limited to:
            </p>
          </FadeIn>

          <div className="topics-grid">
            {TOPICS.map((topic, i) => (
              <FadeIn key={i}>
                <div className="topic-card">
                  <span className="topic-icon">{topic.icon}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h3 className="cfp-subheading" id="dates">Important Dates</h3>
            <p className="cfp-sub-desc">All deadlines are 11:59 PM Anywhere on Earth (AoE).</p>
            <div className="timeline">
              {DATES.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${item.highlight ? 'highlight' : ''}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">{item.label}</div>
                    {item.note && <div className="timeline-note">{item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading" id="submission">Submission Overview</h3>
            <div className="submission-card">
              <p>
                We accept <strong>extended abstracts (2–4 pages)</strong>, short research papers,
                system/demo papers, and position papers. All submissions are{' '}
                <strong>non-archival</strong> and managed through <strong>OpenReview</strong>.
                Please use the COLM 2026 LaTeX template.
              </p>

              <div className="submission-details">
                <div className="submission-detail">
                  <h4>Format</h4>
                  <p>2–4 pages extended abstract or short paper (excluding references), using the COLM 2026 LaTeX template.</p>
                </div>
                <div className="submission-detail">
                  <h4>Review Process</h4>
                  <p>Each submission receives at least two reviews when feasible via OpenReview.</p>
                </div>
                <div className="submission-detail">
                  <h4>Submission Platform</h4>
                  <p>OpenReview. All listed authors must have an up-to-date OpenReview profile.</p>
                </div>
                <div className="submission-detail">
                  <h4>Evaluation Criteria</h4>
                  <p>Relevance, clarity, technical or practical contribution, and potential to stimulate discussion.</p>
                </div>
                <div className="submission-detail">
                  <h4>Originality</h4>
                  <p>Submissions must present original work. Papers under review or already published in peer-reviewed venues cannot be submitted.</p>
                </div>
                <div className="submission-detail">
                  <h4>Anonymity</h4>
                  <p>Submissions must follow double-blind review. No identifying information in the paper or supplementary material.</p>
                </div>
                <div className="submission-detail">
                  <h4>Authorship</h4>
                  <p>All listed authors must have contributed substantially. LLMs cannot be listed as authors but may be cited as tools.</p>
                </div>
                <div className="submission-detail">
                  <h4>Conflicts of Interest</h4>
                  <p>Handled by excluding conflicted organizers from decision-making and reviewer assignment.</p>
                </div>
              </div>

              <p>
                We welcome <strong>both mature projects and promising early-stage work</strong>.
                Accepted papers will be presented as posters or spotlight talks. Authors are
                encouraged to discuss the ethical implications of their research where relevant.
              </p>
              <a
                href="https://openreview.net"
                className="btn-submit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit on OpenReview &#8599;
              </a>
              <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                OpenReview submission site link will be updated soon.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading">Submission Guidelines</h3>
            <div className="cfp-guidelines">
              <p>
                Submissions must adhere to the <strong>COLM 2026 submission format</strong> and
                be submitted as PDFs through the{' '}
                <a href="https://openreview.net" target="_blank" rel="noopener noreferrer">OpenReview platform</a>.
                All submissions will undergo a rigorous double-blind peer review process.
                Accepted papers will be included in the ManuGenesis workshop non-archival
                proceedings.
              </p>
              <ul>
                <li>
                  <strong>Deadlines:</strong> Submission deadlines are strict, and no extensions
                  will be granted. Placeholder/dummy abstracts are not allowed.
                </li>
                <li>
                  <strong>Formatting:</strong> Submissions must use the{' '}
                  <a href="https://colmweb.org/" target="_blank" rel="noopener noreferrer">COLM 2026 LaTeX template</a>.
                  We accept extended abstracts and short papers of <strong>2&ndash;4 pages</strong>{' '}
                  (excluding references), as well as system/demo and position papers.
                </li>
                <li>
                  <strong>Submission Types:</strong> Extended abstracts, short research papers,
                  system or demo papers, and position papers are all welcome.
                </li>
                <li>
                  <strong>Authorship:</strong> All listed authors must have contributed
                  substantially to the work and agree to its submission. Large Language Models
                  (LLMs) cannot be listed as authors but may be cited as tools if used appropriately.
                </li>
                <li>
                  <strong>Anonymity:</strong> Submissions must follow the double-blind review
                  process. Authors should ensure that no identifying information appears in the
                  paper, supplementary material, or any external links.
                </li>
                <li>
                  <strong>Originality:</strong> Submissions must present original work. Papers
                  under review at, or published in, other peer-reviewed venues cannot be
                  submitted. Previously presented work in non-archival workshops is allowed but
                  must be appropriately anonymized.
                </li>
                <li>
                  <strong>Ethics:</strong> Authors are encouraged to include a section on the
                  ethical implications of their research and data use. Submissions must comply
                  with the{' '}
                  <a href="https://colmweb.org/" target="_blank" rel="noopener noreferrer">COLM Code of Ethics</a>.
                </li>
                <li>
                  <strong>Code of Conduct:</strong> Authors are required to adhere to the{' '}
                  <a href="https://colmweb.org/" target="_blank" rel="noopener noreferrer">COLM Code of Conduct</a>.
                </li>
              </ul>
            </div>

            <h3 className="cfp-subheading">Reviewing Process</h3>
            <div className="cfp-guidelines">
              <p>
                Each submission will undergo a rigorous double-blind peer review process.
                Submissions will be evaluated on <strong>relevance, clarity, technical or
                practical contribution, and potential to stimulate discussion</strong>. Each
                submission will receive at least two reviews when feasible from program
                committee members spanning agentic AI, manufacturing systems, robotics, and
                industrial AI.
              </p>
              <p>Reviewers, including organizers, will not evaluate submissions from individuals who:</p>
              <ul>
                <li>Have been colleagues within the same organization in the past three years.</li>
                <li>Have co-authored publications within the last three years.</li>
                <li>Are currently affiliated with the same institution as the submitting authors.</li>
              </ul>
              <p>
                To ensure an unbiased review process, we recruit reviewers from diverse
                institutions and varying levels of expertise. Conflicts of interest are handled
                by excluding conflicted organizers from decision-making and reviewer assignment.
                Only unpublished work will be accepted; submissions already published elsewhere
                will be desk-rejected.
              </p>
            </div>

            <h3 className="cfp-subheading">Publication and Presentation Policies</h3>
            <div className="cfp-guidelines">
              <p>
                Accepted papers will be hosted on the workshop website as part of the
                non-archival proceedings. At least one author of each accepted paper is required
                to register for COLM 2026 and present their work at the workshop, either as an
                oral spotlight or a poster, as determined by the organizers. Presenters are
                encouraged to clearly explain the contributions and implications of their work.
                Virtual presentation options may be considered for authors unable to attend in
                person, in line with COLM&rsquo;s participation policy.
              </p>
              <p>
                <strong>Camera-Ready and Poster Guidelines.</strong> Detailed camera-ready
                instructions and poster size guidelines will be shared with authors after
                acceptance notifications.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="section" id="speakers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Keynote Speakers</div>
              <h2 className="section-title">Invited Speakers</h2>
              <p className="section-description">
                Researchers and practitioners from academia, industry, and government working at the frontier of agentic AI and manufacturing.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {SPEAKERS.filter(s => !s.backup).map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="section-header" style={{ marginTop: '60px', marginBottom: '30px' }}>
              <div className="section-label">Panelists</div>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>Panel Discussion</h2>
              <p className="section-description">
                Agentic AI for real manufacturing settings: perspectives from government, industry, and engineering.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {PANELISTS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section-alt" id="schedule">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Program</div>
              <h2 className="section-title">Tentative Schedule</h2>
              <p className="section-description">
                October 9, 2026 | Hilton Union Square, San Francisco
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="schedule-table">
              {SCHEDULE.map((item, i) => (
                <div className={`schedule-row ${item.isBreak ? 'break-row' : ''}`} key={i}>
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-event">
                    <div className="schedule-event-title">{item.title}</div>
                    {item.speaker && !item.isBreak && (
                      <div className="schedule-event-speaker">{item.speaker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Organizers */}
      <section className="section" id="organizers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Team</div>
              <h2 className="section-title">Workshop Organizers</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {ORGANIZERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sponsors — hidden until finalized */}
      {false && (
      <section className="section section-alt" id="sponsors">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Support</div>
              <h2 className="section-title">Sponsors</h2>
              <p className="section-description">
                We are grateful to our sponsors for supporting this workshop.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="sponsor-note">
              <p>
                We are currently in discussions with <strong>Deloitte</strong>, <strong>Virginia Tech</strong>, <strong>Nvidia</strong>, <strong>Abaka AI</strong>, and <strong>Cisco</strong> about sponsorship.
                Details will be updated as partnerships are confirmed.
              </p>
              <p style={{ marginTop: '12px' }}>
                Interested in sponsoring? Please <a href="mailto:manugenesis@googlegroups.com">get in touch</a>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Get in Touch</div>
              <h2 className="section-title">Contact</h2>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="contact-card">
              <p>
                For questions about submissions, the program, or sponsorship, reach out to us at:
              </p>
              <a href="mailto:manugenesis@googlegroups.com" className="contact-email">
                manugenesis@googlegroups.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>ManuGenesis</span> Workshop
          </div>
          <p className="footer-text">
            Co-located with COLM 2026 | October 9, 2026 | San Francisco, USA
          </p>
          <div className="footer-links">
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">COLM 2026</a>
            <a href="https://colmweb.org/cfw.html" target="_blank" rel="noopener noreferrer">Call for Workshops</a>
            <a href="#cfp">Submit a Paper</a>
            <a href="mailto:manugenesis@googlegroups.com">Contact</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; 2026 ManuGenesis Workshop. All participants must follow the{' '}
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">
              COLM Code of Conduct
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

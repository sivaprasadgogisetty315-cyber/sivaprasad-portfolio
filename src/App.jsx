import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const fallbackProjects = [
  {
    number: "01",
    title: "AI web concepts",
    category: "WEB DEVELOPMENT",
    description:
      "Fresh digital experiences, thoughtfully designed and built with AI in the creative toolkit.",
    color: "lilac",
    visual: "web",
  },
  {
    number: "02",
    title: "Stories in motion",
    category: "VIDEO EDITING",
    description:
      "A space for expressive edits, intentional pacing, and the little details that make a story land.",
    color: "peach",
    visual: "video",
  },
  {
    number: "03",
    title: "A little bit of Siva",
    category: "PERSONAL PROJECT",
    description:
      "This portfolio: one place for the ideas, experiments, and creative work I'm growing.",
    color: "lime",
    visual: "portfolio",
  },
];

const initialPortfolio = {
  name: "Siva Prasad Gogisetty",
  firstName: "Siva",
  role: "AI web developer & video editor",
  email: "sivaprasadgogisetty315@gmail.com",
  introduction:
    "I bring ideas to life on screen — building for the web and shaping stories through video.",
  skills: [
    "AI-assisted web development",
    "Frontend development",
    "Creative coding",
    "Video editing",
    "Visual storytelling",
    "Motion & transitions",
  ],
  projects: fallbackProjects,
};

const whatsappUrl =
  "https://wa.me/919347351717?text=Hi%20Siva%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const linkedinUrl =
  "https://www.linkedin.com/in/siva-prasad-healthcare-non-it-staffing-consultant-react-js-developer/";
const githubUrl = "https://github.com/sivaprasadgogisetty315-cyber";
const gmarkUrl = "https://gmark.agency";

const services = [
  {
    number: "01",
    title: "Video editing",
    detail: "Thoughtful cuts, pacing & polish that bring your story together.",
    icon: "edit",
    tone: "violet",
  },
  {
    number: "02",
    title: "Video shoot",
    detail: "On-location visuals that capture the energy of your idea.",
    icon: "video",
    tone: "peach",
  },
  {
    number: "03",
    title: "Product shoot",
    detail: "Crisp, expressive product imagery made to catch the eye.",
    icon: "product",
    tone: "yellow",
  },
  {
    number: "04",
    title: "Website",
    detail: "A distinct, responsive home for your brand on the web.",
    icon: "web",
    tone: "mint",
  },
  {
    number: "05",
    title: "Social media campaigns",
    detail: "Campaign ideas and creative built to bring your brand to the feed.",
    icon: "campaign",
    tone: "rose",
    platforms: ["Facebook", "Instagram"],
  },
  {
    number: "06",
    title: "Facebook & Instagram ads",
    detail: "Audience-focused Meta ad creative and campaign setup.",
    icon: "meta",
    tone: "blue",
    platforms: ["Facebook", "Instagram"],
  },
  {
    number: "07",
    title: "Google Ads",
    detail: "Search and display campaigns designed around your goals.",
    icon: "google",
    tone: "green",
    platforms: ["Search", "Display"],
  },
];

function ArrowIcon({ diagonal = false }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ServiceIcon({ type }) {
  const paths = {
    edit: <><path d="m14 5 5 5M4 20l4.2-.8L19 8.4 15.6 5 4.8 15.8 4 20Z" /><path d="M4 20h16" /></>,
    video: <><rect x="3" y="6" width="13" height="12" rx="3" /><path d="m16 10 5-3v10l-5-3z" /><path d="M7 3v3m5-3v3" /></>,
    product: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="m8 8 1.5-4h5L16 8" /><circle cx="12" cy="14" r="3" /></>,
    web: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01m-4 6h4m-4 3h7" /><circle cx="16" cy="15" r="2" /></>,
    campaign: <><path d="M4 19V9m5 10V5m5 14v-7m5 7V3" /><path d="m3 6 6-3 5 4 6-4" /></>,
    meta: <><path d="M3 16c1-5 3-9 5-9 3 0 5 10 8 10 2 0 4-4 5-9" /><path d="M3 16c1 2 2 3 4 3 3 0 5-10 8-10 2 0 4 4 6 8" /></>,
    google: <><path d="M5 19 11 7h3l5 12" /><path d="M8 13h8m-11 6h14" /><circle cx="12" cy="4" r="1" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M20 11.7a8.1 8.1 0 0 1-12 7.1L4 20l1.2-3.8A8.1 8.1 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8.4c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6.4.8 1.1 1.5 2 1.9.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.4-1.1.6-1.8.4-1.1-.2-2.4-.8-3.7-2-1.1-1-1.8-2.2-2-3.1-.3-1 .1-1.8.7-2.4Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.2 3.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9.2h3.4v11.1H3.5V9.2Zm5.5 0h3.3v1.5h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.1h-3.4v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.5H9V9.2Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.5 2.4 3.8 1.7.1-.8.5-1.4.9-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.1.9 2.1v3.1c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function ProjectArtwork({ type }) {
  if (type === "web") {
    return (
      <div className="artwork artwork-web" aria-hidden="true">
        <div className="browser-card">
          <div className="browser-top"><i /><i /><i /><span>your-next-idea.com</span></div>
          <div className="browser-content">
            <div className="browser-label">A LITTLE BIT DIFFERENT.</div>
            <div className="browser-title">Make room<br />for wonder<span>.</span></div>
            <div className="browser-button" />
            <div className="browser-orb" />
          </div>
        </div>
        <div className="artwork-sparkle sparkle-one">✳</div>
        <div className="artwork-sparkle sparkle-two">✳</div>
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className="artwork artwork-video" aria-hidden="true">
        <div className="film-frame">
          <div className="film-sun" />
          <div className="film-horizon" />
          <span className="film-caption">A MOMENT, IN MOTION</span>
          <div className="play-button">▶</div>
        </div>
        <div className="film-strip"><i /><i /><i /><i /><i /><i /></div>
        <div className="video-sticker">ROLL<br />CAMERA!</div>
      </div>
    );
  }
  return (
    <div className="artwork artwork-portfolio" aria-hidden="true">
      <div className="portfolio-sticker sticker-star">✳</div>
      <div className="portfolio-paper">
        <span className="paper-eyebrow">THE HUMAN BEHIND THE SCREEN</span>
        <span className="paper-title">Curiosity<br />looks good<br />on you.</span>
        <span className="paper-signature">— Siva</span>
        <span className="paper-doodle">↗</span>
      </div>
      <div className="portfolio-sticker sticker-smile">☺</div>
    </div>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [apiError, setApiError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [emailCopied, setEmailCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderAtEnd, setSliderAtEnd] = useState(false);
  const projectTrackRef = useRef(null);
  const menuToggleRef = useRef(null);
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 22 });
  const heroArtY = useTransform(heroScrollProgress, [0, 1], [0, 54]);
  const heroArtScale = useTransform(heroScrollProgress, [0, 1], [1, 0.94]);
  const heroArtXRotation = useTransform(pointerY, [-0.5, 0.5], [5, -5]);
  const heroArtYRotation = useTransform(pointerX, [-0.5, 0.5], [-6, 6]);
  const visibleProjects = portfolio.projects.filter((project) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "Web") return project.category.includes("WEB");
    if (projectFilter === "Video") return project.category.includes("VIDEO");
    return project.category.includes("PERSONAL");
  });
  const moveProjectSlider = (direction) => {
    const track = projectTrackRef.current;
    const firstCard = track?.querySelector(".project-card");
    if (!track || !firstCard) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const target = direction === "next"
      ? Math.min(track.scrollWidth - track.clientWidth, track.scrollLeft + step)
      : Math.max(0, track.scrollLeft - step);
    track.scrollTo({ left: target, behavior: reduceMotion ? "instant" : "smooth" });
  };

  useEffect(() => {
    const apiEnabled = import.meta.env.VITE_PORTFOLIO_API_ENABLED;
    if (apiEnabled === "false" || (import.meta.env.PROD && apiEnabled !== "true")) return;

    const controller = new AbortController();
    fetch("/api/portfolio", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Portfolio API returned ${response.status}`);
        return response.json();
      })
      .then((data) => setPortfolio(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setApiError("Live portfolio data could not be loaded. Showing the saved preview.");
          console.error("Could not load portfolio data:", error);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => window.removeEventListener("keydown", handleMenuKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleHeroPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetHeroPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setEmailCopied(true);
      setCopyStatus("Email address copied to clipboard.");
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch (error) {
      console.error("Could not copy email address:", error);
      setCopyStatus("Could not copy automatically. You can select the email address above.");
    }
  };

  return (
    <>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <motion.div
          className="scroll-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label={`${portfolio.name} — GSPD home`}>
            G<span>S</span>PD
          </a>
          <button
            ref={menuToggleRef}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span /><span />
          </button>
          <motion.nav
            id="main-navigation"
            className={`main-nav${menuOpen ? " nav-open" : ""}`}
            aria-label="Main navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
                <a href="#services" onClick={closeMenu}>Services</a>
                <a href="#work" onClick={closeMenu}>Selected work <span>03</span></a>
                <a href="#about" onClick={closeMenu}>A little about me</a>
                <a href="#faq" onClick={closeMenu}>FAQ</a>
                <a className="nav-contact" href={gmarkUrl} target="_blank" rel="noreferrer">
                  Gmark.agency <ArrowIcon diagonal />
                </a>
          </motion.nav>
        </header>

        {apiError && <p className="api-notice" role="status">{apiError}</p>}

        <main id="main-content" tabIndex={-1}>
          <section className="hero cinematic-hero" id="home" ref={heroRef}>
            <div className="hero-copy">
              <motion.p
                className="eyebrow"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
              >
                <span className="status-dot" /> SIVA PRASAD GOGISETTY <span className="eyebrow-divider">/</span> INDEPENDENT CREATIVE
              </motion.p>
              <motion.h1
                className="cinematic-title"
                initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                Made to<br /><span className="name-highlight">move<span className="name-period">.</span></span>
              </motion.h1>
              <div className="hero-bottom">
                <p className="hero-role">{portfolio.role}<span className="role-star">✳</span></p>
                <p className="hero-intro">{portfolio.introduction}</p>
              </div>
              <div className="hero-actions">
                <a className="hero-primary-action" href={gmarkUrl} target="_blank" rel="noreferrer">Start a project <ArrowIcon diagonal /></a>
                <a className="hero-secondary-action" href="#work">Explore my work <ArrowIcon /></a>
              </div>
              <div className="hero-service-tags" aria-label="Services">
                <span>Websites</span><span>Video &amp; product shoots</span><span>Social campaigns</span><span>Paid ads</span>
              </div>
              <span className="hero-side-note">SCROLL A LITTLE <span>↓</span></span>
            </div>

            <motion.div
              className="hero-art cinematic-art"
              role="img"
              aria-label="Abstract cinematic artwork for GSPD Creative Studio"
              onPointerMove={handleHeroPointerMove}
              onPointerLeave={resetHeroPointer}
              style={{
                rotateX: reduceMotion ? 0 : heroArtXRotation,
                rotateY: reduceMotion ? 0 : heroArtYRotation,
                y: reduceMotion ? 0 : heroArtY,
                scale: reduceMotion ? 1 : heroArtScale,
                transformPerspective: 1100,
              }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-art-grid" />
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="cinema-sun" aria-hidden="true" />
              <div
                className="pointer-events-none absolute left-6 top-6 z-[5] font-mono text-[8px] uppercase tracking-[.2em] text-stone-200 max-[620px]:left-4 max-[620px]:top-[19px]"
                aria-hidden="true"
              >
                A STUDY IN <span className="text-portfolio-accent">—</span> FEELING
              </div>
              <div className="hero-glass-card">
                <span className="glass-card-top"><span className="status-dot" /> THE GSPD PRACTICE</span>
                <span className="glass-card-title">Digital work,<br /><i>made human.</i></span>
                <span className="glass-card-footer"><i>THOUGHTFUL BY DESIGN</i><i>WEB / FILM</i><i>↗</i></span>
              </div>
              <span className="hero-floating-label">SEQUENCE 01 <i>·</i> STORY FIRST</span>
              <div className="absolute bottom-[17px] left-0 right-0 z-[2] text-center font-mono text-[8px] tracking-[1.7px] text-[#ded4c8]">
                WEB <i className="text-portfolio-accent">×</i> FILM <i className="text-portfolio-accent">×</i> IMAGINATION
              </div>
            </motion.div>
            <span className="hero-index">INDEPENDENT CREATIVE / 2026</span>
          </section>

          <div className="ticker" aria-label="Web development, video editing, and creative ideas">
            <div className="ticker-track">
              {Array.from({ length: 4 }, (_, index) => (
                <span key={index}>MAKING IDEAS REAL <i>✳</i> WEB DEVELOPMENT <i>✳</i> VIDEO EDITING <i>✳</i></span>
              ))}
            </div>
          </div>

          <motion.section className="services-section section-pad reveal-on-scroll" id="services" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
            <div className="section-heading services-heading">
              <div>
                <p className="eyebrow">GOOD IDEAS, MEET GOOD EXECUTION</p>
                <h2>Ways we can <span>work together.</span></h2>
              </div>
              <a className="services-all-link" href={gmarkUrl} target="_blank" rel="noreferrer">Have a project in mind? <ArrowIcon diagonal /></a>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <motion.a
                  className={`service-card service-${service.tone}`}
                  href={gmarkUrl}
                  target="_blank"
                  rel="noreferrer"
                  key={service.number}
                  whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : Number(service.number) * 0.045 }}
                >
                  <span className="service-card-top"><span>{service.number} / SERVICE</span><span className="service-card-arrow"><ArrowIcon diagonal /></span></span>
                  <span className="service-icon"><ServiceIcon type={service.icon} /></span>
                  <span className="service-card-copy"><strong>{service.title}</strong><span>{service.detail}</span></span>
                  {service.platforms && (
                    <span className="service-platforms">
                      {service.platforms.map((platform) => <i key={platform}>{platform}</i>)}
                    </span>
                  )}
                  <span className="service-card-bottom">VISIT GMARK.AGENCY <ArrowIcon /></span>
                </motion.a>
              ))}
            </div>
            <div className="service-process" aria-label="My creative process">
              <span className="process-heading">A SIMPLE, CLEAR PROCESS</span>
              <span className="process-step"><i>01</i> Listen &amp; plan</span>
              <span className="process-connector" aria-hidden="true" />
              <span className="process-step"><i>02</i> Create together</span>
              <span className="process-connector" aria-hidden="true" />
              <span className="process-step"><i>03</i> Launch with care</span>
            </div>
          </motion.section>

          <motion.section className="work-section section-pad reveal-on-scroll" id="work" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">SELECTED EXPERIMENTS / CONCEPTS</p>
                <h2>Selected <span>work</span><sup>03</sup></h2>
              </div>
              <p className="section-aside">Concept-led work in progress.<br />More real-world projects soon.</p>
            </div>

            <div className="project-toolbar">
              <div className="project-filters" role="group" aria-label="Filter projects">
                {["All", "Web", "Video", "Personal"].map((filter) => (
                  <button
                    className={`project-filter${projectFilter === filter ? " is-active" : ""}`}
                    type="button"
                    aria-pressed={projectFilter === filter}
                    key={filter}
                    onClick={() => {
                      setProjectFilter(filter);
                      setActiveSlide(0);
                      setSliderAtEnd(false);
                      if (projectTrackRef.current) {
                        projectTrackRef.current.scrollTo({
                          left: 0,
                          behavior: reduceMotion ? "instant" : "smooth",
                        });
                      }
                    }}
                  >
                    {filter}
                    {filter === "All" && <span>{portfolio.projects.length}</span>}
                  </button>
                ))}
              </div>
              <div className="slider-controls" aria-label="Project carousel controls">
                <span className="slide-count">{String(activeSlide + 1).padStart(2, "0")} <i>/</i> {String(Math.max(visibleProjects.length, 1)).padStart(2, "0")}</span>
                <button type="button" className="slider-arrow" aria-label="Previous project" disabled={activeSlide === 0} onClick={() => moveProjectSlider("previous")}><ArrowIcon /></button>
                <button type="button" className="slider-arrow slider-arrow-next" aria-label="Next project" disabled={sliderAtEnd || visibleProjects.length < 2} onClick={() => moveProjectSlider("next")}><ArrowIcon /></button>
              </div>
            </div>
            <div
              className="project-grid project-track"
              ref={projectTrackRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Selected work"
              onScroll={(event) => {
                const track = event.currentTarget;
                const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
                setSliderAtEnd((previous) => previous === atEnd ? previous : atEnd);
                const firstCard = track.querySelector(".project-card");
                if (!firstCard) {
                  setActiveSlide((previous) => previous === 0 ? previous : 0);
                  return;
                }
                const styles = window.getComputedStyle(track);
                const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
                const currentSlide = atEnd
                  ? visibleProjects.length - 1
                  : Math.round(track.scrollLeft / (firstCard.getBoundingClientRect().width + gap));
                const nextSlide = Math.max(0, currentSlide);
                setActiveSlide((previous) => previous === nextSlide ? previous : nextSlide);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveProjectSlider("next");
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveProjectSlider("previous");
                }
              }}
              tabIndex={0}
            >
              {visibleProjects.map((project, index) => (
                <motion.article
                  className={`project-card project-${project.color}`}
                  key={project.number}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${visibleProjects.length}: ${project.title}`}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                >
                  <a className="project-link" href={gmarkUrl} target="_blank" rel="noreferrer" aria-label={`Visit Gmark.agency to learn more about ${project.title}`}>
                    <ProjectArtwork type={project.visual} />
                    <div className="project-meta">
                      <div>
                        <p className="project-category">{project.number} / {project.category}</p>
                        <h3>{project.title}</h3>
                      </div>
                      <span className="project-arrow"><ArrowIcon diagonal /></span>
                    </div>
                  </a>
                  <p className="project-description">{project.description}</p>
                </motion.article>
              ))}
            </div>
            <p className="work-footnote"><span>✳</span> Independent concepts and personal experiments — not client case studies.</p>
          </motion.section>

          <motion.section className="about-section section-pad reveal-on-scroll" id="about" initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.7 }}>
            <div className="about-heading">
              <p className="eyebrow">SO, WHAT DO I DO?</p>
              <h2>Two worlds.<br />One curious <span>mind.</span></h2>
              <p className="about-copy">I’m {portfolio.name} — an AI web developer and video editor who loves finding the sweet spot between useful and unforgettable.</p>
              <p className="about-copy about-copy-small">From the first sketch to the final frame, I’m here to make things that feel thoughtful, work beautifully, and stick with you.</p>
              <a className="text-link" href={gmarkUrl} target="_blank" rel="noreferrer">Let’s make something <ArrowIcon diagonal /></a>
            </div>

            <div className="skills-board">
              <div className="skills-board-top"><span>THE CREATIVE TOOLBOX</span><span>01 — {String(portfolio.skills.length).padStart(2, "0")}</span></div>
              <div className="skills-list">
                {portfolio.skills.map((skill, index) => (
                  <motion.div className="skill-row" key={skill} initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.06 }}>
                    <span className="skill-number">0{index + 1}</span>
                    <span>{skill}</span>
                    <span className="skill-spark">{index % 2 === 0 ? "✳" : "↗"}</span>
                  </motion.div>
                ))}
              </div>
              <div className="skills-note">TOOLS CHANGE. CURIOSITY DOESN’T.</div>
            </div>
          </motion.section>

          <motion.section
            className="faq-section section-pad reveal-on-scroll"
            id="faq"
            aria-labelledby="faq-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
          >
            <div className="faq-intro">
              <p className="eyebrow">A FEW QUICK ANSWERS</p>
              <h2 id="faq-heading">Good to know<br />before we <span>begin.</span></h2>
              <p>Have another question? Visit Gmark.agency to get in touch.</p>
              <a className="text-link" href={gmarkUrl} target="_blank" rel="noreferrer">Visit Gmark.agency <ArrowIcon diagonal /></a>
            </div>
            <div className="faq-list">
              <details className="faq-item" name="portfolio-faq">
                <summary>What can I reach out about?<span aria-hidden="true" /></summary>
                <div className="faq-answer">
                  <p>Website development, video editing or shoots, product photography, social campaigns, paid ads, or a combination of services.</p>
                </div>
              </details>
              <details className="faq-item" name="portfolio-faq">
                <summary>Where should I go to get in touch?<span aria-hidden="true" /></summary>
                <div className="faq-answer">
                  <p>Visit <a href={gmarkUrl} target="_blank" rel="noreferrer">Gmark.agency</a> for project inquiries and collaborations.</p>
                </div>
              </details>
              <details className="faq-item" name="portfolio-faq">
                <summary>How do we get started?<span aria-hidden="true" /></summary>
                <div className="faq-answer">
                  <p>Choose the service you have in mind, then connect with me through Gmark.agency, WhatsApp, or email.</p>
                </div>
              </details>
            </div>
          </motion.section>

          <motion.section className="contact-section reveal-on-scroll" id="contact" initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduceMotion ? 0 : 0.7 }}>
            <div className="contact-star" aria-hidden="true">✳</div>
            <p className="eyebrow">HAVE A GOOD ONE IN MIND?</p>
            <h2>Let’s make<br />it <span>happen.</span></h2>
            <a className="contact-button" href={gmarkUrl} target="_blank" rel="noreferrer">
              Visit Gmark.agency <ArrowIcon diagonal />
            </a>
            <button className="contact-email-copy" type="button" onClick={handleCopyEmail} aria-live="polite">
              <span>{emailCopied ? "Email copied!" : portfolio.email}</span>
              <span className="copy-action">{emailCopied ? "COPIED" : "COPY EMAIL"}</span>
            </button>
            <p className="contact-copy-status" role="status">{copyStatus}</p>
            <div className="contact-socials">
              <a className="contact-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Visit Siva on LinkedIn">
                <LinkedInIcon />
                <span>LINKEDIN</span>
                <ArrowIcon diagonal />
              </a>
              <a className="contact-social-link" href={githubUrl} target="_blank" rel="noreferrer" aria-label="Visit Siva on GitHub">
                <GitHubIcon />
                <span>GITHUB</span>
                <ArrowIcon diagonal />
              </a>
              <a className="contact-social-link" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Message Siva on WhatsApp">
                <WhatsAppIcon />
                <span>WHATSAPP</span>
                <ArrowIcon diagonal />
              </a>
            </div>
            <div className="contact-doodle" aria-hidden="true">↗</div>
          </motion.section>

        </main>

        <footer className="site-footer">
          <a className="wordmark footer-mark" href="#home">G<span>S</span>PD</a>
          <span>GSPD STUDIO · MADE WITH CURIOSITY BY {portfolio.name.toUpperCase()}</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span className="footer-year">© 2026</span>
        </footer>
      </div>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Siva on WhatsApp">
        <WhatsAppIcon />
        <span>Let’s talk</span>
      </a>
    </>
  );
}

export default App;

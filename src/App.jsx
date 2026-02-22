import { useMemo, useState } from "react";
import { content } from "./data/content";
import "./styles.css";

const GH = "https://github.com/Bastian1524";

const BASE = import.meta.env.BASE_URL;
const CV_PDF = `${BASE}media/cv-alex-panchi.pdf`;
const PROFILE_PHOTO = `${BASE}media/profile.jpg`;

function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

function ButtonLink({ href, children, variant = "primary" }) {
  return (
    <a className={`btn ${variant}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="h2">{title}</h2>
      <div className="card">{children}</div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState("es");
  const t = useMemo(() => content[lang], [lang]);

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="brand">
          <span className="dot" />
          <span>Alex Panchi</span>
        </div>

        <nav className="links">
          <a href="#about">{t.nav.about}</a>
          <a href="#thesis">{t.nav.thesis}</a>
          <a href="#education">{t.nav.education}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#training">{t.nav.training}</a>
          <a href="#projects">{t.nav.projects}</a>
        </nav>

        <div className="lang">
          <button
            className={`langbtn ${lang === "es" ? "active" : ""}`}
            onClick={() => setLang("es")}
          >
            ES
          </button>
          <button
            className={`langbtn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </header>

      {/* HERO */}
      <main className="container">
        <section className="hero">
          <div className="heroLeft">
            <h1 className="h1">{t.hero.name}</h1>
            <p className="subtitle">{t.hero.title}</p>
            <p className="muted">{t.hero.subtitle}</p>

            <div className="ctaRow">
              <ButtonLink href={CV_PDF} variant="primary">
                {t.hero.ctaCv}
              </ButtonLink>
              <ButtonLink href={GH} variant="ghost">
                {t.hero.ctaGithub}
              </ButtonLink>
            </div>

            <div className="metaRow">
              <Chip>Quito, Ecuador</Chip>
              <Chip>
                <a href={GH} target="_blank" rel="noreferrer">
                  GitHub: Bastian1524
                </a>
              </Chip>
            </div>
          </div>

          <div className="heroRight">
            <div className="photoCard">
              <img
    src={PROFILE_PHOTO}
    alt="Profile"
    onError={(e) => {
      e.currentTarget.style.display = "none";
      document.getElementById("placeholder").style.display = "flex";
    }}
    onLoad={() => {
      document.getElementById("placeholder").style.display = "none";
    }}
  />

  <div id="placeholder" className="photoPlaceholder">
    <div className="phTop">Profile photo</div>
    <div className="phBottom">Add: public/media/profile.jpg</div>
  </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" title={t.about.title}>
          <p className="p">{t.about.body}</p>
          <div className="chipRow">
            {t.about.highlights.map((x) => (
              <Chip key={x}>{x}</Chip>
            ))}
          </div>
        </Section>

        {/* THESIS */}
        <Section id="thesis" title={t.thesis.title}>
          <h3 className="h3">{t.thesis.name}</h3>

          {t.thesis.overview && <p className="p muted">{t.thesis.overview}</p>}

          <div className="tagRow">
            {t.thesis.tags.map((x) => (
              <Chip key={x}>{x}</Chip>
            ))}
          </div>

          <ul className="ul">
            {t.thesis.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div className="mediaBox">
            <div className="mediaTitle">{t.thesis.demoTitle || "Demo / Media"}</div>
            <div className="muted">{t.thesis.demoText || t.thesis.mediaNote}</div>

            {/* Cuando tengas un mp4:
                - ponlo en public/media/thesis-demo.mp4
                - descomenta este video
            */}
            {/*
            <video className="video" controls muted>
              <source src="/media/thesis-demo.mp4" type="video/mp4" />
            </video>
            */}
          </div>

          {/* Botones opcionales: si NO tienes pdf, comenta el botón */}
          <div className="ctaRow">
            <ButtonLink href={GH} variant="ghost">
              {t.thesis.ctaRepo || "Repository"}
            </ButtonLink>

            {/* Si no tienes thesis.pdf, comenta este bloque */}
            <ButtonLink href="/media/thesis.pdf" variant="ghost">
              {t.thesis.ctaPaper || "PDF"}
            </ButtonLink>
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title={t.education.title}>
          <ul className="ul">
            {t.education.items.map((e, i) => (
              <li key={i}>
                <strong>{e.name}</strong>
                {e.org ? ` — ${e.org}` : ""}
                {e.date ? ` (${e.date})` : ""}
              </li>
            ))}
          </ul>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title={t.experience.title}>
          {t.experience.items.map((x, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 900 }}>
                {x.role} — <span className="muted">{x.org}</span>
              </div>
              <div className="muted" style={{ marginTop: 2 }}>
                {x.date}
              </div>
              <ul className="ul">
                {x.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* TRAINING */}
        <Section id="training" title={t.training.title}>
          <ul className="ul">
            {t.training.courses.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title={t.projects.title}>
          <p className="p muted">{t.projects.note}</p>
        </Section>

        <footer className="footer">
          <span className="muted">© {new Date().getFullYear()} Alex Sebastian Panchi</span>
        </footer>
      </main>
    </div>
  );
}
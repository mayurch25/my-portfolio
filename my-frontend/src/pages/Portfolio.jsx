import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Portfolio.css";

export default function Portfolio() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [p, s, exp, edu, proj] = await Promise.all([
          API.get("/profile"),
          API.get("/skills"),
          API.get("/experience"),
          API.get("/education"),
          API.get("/projects"),
        ]);
        setProfile(p.data);
        setSkills(s.data);
        setExperiences(exp.data);
        setEducation(edu.data);
        setProjects(proj.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      await API.post("/contact", contact);
      setContactStatus("success");
      setContact({ name: "", email: "", message: "" });
    } catch {
      setContactStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="page-loader">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
    );
  }

  const name = profile?.name || "Mayur Chaudhari";
  const title = profile?.title || "Frontend Engineer | Vue.js | Nuxt.js | React.js";
  const about = profile?.about || "Experienced Vue.js developer with 5 years of expertise in complex web application development, custom applications, RESTful APIs, and third-party service integration. Contributed to the successful delivery of 5+ projects. Dedicated to delivering high-quality software solutions aligned with business requirements.";
  const location = profile?.location || "Ambazhari, Nagpur";
  const email = profile?.email || "mayurrchaudhari25@gmail.com";
  const phone = profile?.phone || "9421674880";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/mayur-chaudhari-668a44103";
  const github = profile?.github || "";
  const years = profile?.yearsOfExperience || "5+";
  const languages = profile?.languages?.length ? profile.languages : ["English", "Hindi", "Marathi"];
  const BACKEND_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";
  const profileImageUrl = profile?.profileImage ? `${BACKEND_URL}${profile.profileImage}` : "";

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">{name.split(" ")[0]}<span style={{ color: "#6c63ff" }}>.</span></div>
        <ul className={`navbar-links${menuOpen ? " navbar-links--open" : ""}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
        <button className="navbar-admin-btn navbar-admin-btn--desktop" onClick={() => navigate(localStorage.getItem("token") ? "/admin" : "/login")}>Admin</button>
        <button className="navbar-hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <span className={`hamburger-bar${menuOpen ? " hamburger-bar--open" : ""}`} />
          <span className={`hamburger-bar${menuOpen ? " hamburger-bar--open" : ""}`} />
          <span className={`hamburger-bar${menuOpen ? " hamburger-bar--open" : ""}`} />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        {profileImageUrl && (
          <div className="hero-avatar">
            <img src={profileImageUrl} alt={name} />
          </div>
        )}
        <div className="hero-badge">
          <span />
          Available for opportunities
        </div>
        <h1>{name}</h1>
        <p className="hero-title">{title}</p>
        <p className="hero-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {location}
        </p>
        <p className="hero-about">{about}</p>
        <div className="hero-btns">
          <a href="#contact" className="btn-primary">Get In Touch</a>
          <a href="#projects" className="btn-secondary">View Projects</a>
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
          )}
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{years}</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-num">{projects.length || "10"}+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat">
            <div className="stat-num">{skills.length || "15"}+</div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="section-header">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>{about}</p>
            <p>
              With a solid foundation in Frontend Technologies and a passion for crafting smooth user experiences,
              I bring both technical expertise and creative thinking to every project.
            </p>
          </div>
          <div className="about-info">
            <div className="info-row">
              <span className="info-icon">📍</span>
              <span className="info-label">Location</span>
              <span className="info-value">{location}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">📧</span>
              <span className="info-label">Email</span>
              <span className="info-value"><a href={`mailto:${email}`}>{email}</a></span>
            </div>
            <div className="info-row">
              <span className="info-icon">📞</span>
              <span className="info-label">Phone</span>
              <span className="info-value">{phone}</span>
            </div>
            {linkedin && (
              <div className="info-row">
                <span className="info-icon">💼</span>
                <span className="info-label">LinkedIn</span>
                <span className="info-value">
                  <a href={linkedin} target="_blank" rel="noreferrer">View Profile</a>
                </span>
              </div>
            )}
            <div className="info-row">
              <span className="info-icon">🌐</span>
              <span className="info-label">Languages</span>
              <div className="lang-badges">
                {languages.map((l) => <span key={l} className="lang-badge">{l}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section" id="skills">
        <div className="section-header">
          <div className="section-tag">Skills</div>
          <h2 className="section-title">Technologies I Work With</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {skills.length === 0 ? (
            ["HTML", "CSS", "JavaScript", "Vue.js", "Nuxt.js", "React.js", "Next.js", "Vite.js",
             "Vuex", "Redux", "Redux Toolkit", "Tailwind CSS", "Bootstrap", "Element UI",
             "Git", "Figma", "Adobe XD", "Cypress"].map((s) => (
              <div key={s} className="skill-card">
                <div className="skill-dot" />
                <span className="skill-name">{s}</span>
              </div>
            ))
          ) : (
            skills.map((s) => (
              <div key={s._id} className="skill-card">
                <div className="skill-dot" />
                <span className="skill-name">{s.name}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section" id="experience">
        <div className="section-header">
          <div className="section-tag">Experience</div>
          <h2 className="section-title">Work History</h2>
          <div className="section-line" />
        </div>
        <div className="timeline">
          {experiences.length === 0 ? (
            [
              {
                _id: "1", role: "Vue.js Developer", company: "Ranium Systems Pvt. Ltd.",
                startDate: "04/2022", endDate: "Present", location: "Nagpur, India",
                bullets: [
                  "Proficient in Nuxt.js, React.js, and Next.js, contributing to successful projects.",
                  "Collaborated with a 10-member team for effective project completion.",
                  "Applied Vuex for state management in Vue.js and Nuxt.js projects.",
                  "Enhanced backend coordination skills using Insomnia, TablePlus, and Sequel Ace.",
                  "Expertise in API integration, handling frontend API requests and responses.",
                  "Instructed on Redux and Redux Toolkit through Todo app development in React.",
                  "Committed to writing clean, maintainable code and skilled in Git version control.",
                ]
              },
              {
                _id: "2", role: "Frontend Developer", company: "Sahaj Academy Edutech LLP",
                startDate: "10/2020", endDate: "03/2022", location: "Jalgaon, India",
                bullets: [
                  "Completed programs in HTML, CSS, JavaScript with focus on Vue.js.",
                  "Utilized Vue.js with Vue Router, Vuex, and Element UI for seamless development.",
                  "Designed responsive UI for both mobile and desktop platforms.",
                  "Managed API integration for smooth frontend-backend communication.",
                  "Implemented Google and Facebook sign-in for user authentication.",
                  "Applied SEO strategies to enhance website visibility and drive traffic.",
                ]
              }
            ].map((exp) => <ExperienceCard key={exp._id} exp={exp} />)
          ) : (
            experiences.map((exp) => <ExperienceCard key={exp._id} exp={exp} />)
          )}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="education-section" id="education">
        <div className="section-header">
          <div className="section-tag">Education</div>
          <h2 className="section-title">Academic Background</h2>
          <div className="section-line" />
        </div>
        <div className="education-grid">
          {education.length === 0 ? (
            <div className="edu-card">
              <div className="edu-icon">🎓</div>
              <div>
                <div className="edu-degree">Bachelor of Electronics &amp; Telecommunication Engineering</div>
                <div className="edu-institution">Godavari College of Engineering</div>
                <div className="edu-meta">Jalgaon, India &nbsp;·&nbsp; 2015</div>
              </div>
            </div>
          ) : (
            education.map((edu) => (
              <div key={edu._id} className="edu-card">
                <div className="edu-icon">🎓</div>
                <div>
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-institution">{edu.institution}</div>
                  <div className="edu-meta">
                    {edu.location}{edu.location && edu.year ? " · " : ""}{edu.year}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section" id="projects">
        <div className="section-header">
          <div className="section-tag">Projects</div>
          <h2 className="section-title">My Work</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="empty-state">No projects added yet. Add them from the admin panel.</div>
          ) : (
            projects.map((p, i) => (
              <div key={p._id} className="project-card">
                <div className="project-icon">{["🚀", "💡", "🛠️", "🎯", "⚡", "🌟"][i % 6]}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.description}</div>
                {p.techStack && p.techStack.length > 0 && (
                  <div className="project-tags">
                    {p.techStack.map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                )}
                <div className="project-links">
                  {p.githubLink && (
                    <a href={p.githubLink} target="_blank" rel="noreferrer" className="project-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noreferrer" className="project-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-header">
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
        </div>
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let's work together</h3>
            <p>
              Have a project in mind or want to discuss opportunities? Feel free to reach out —
              I'm always open to new ideas and collaborations.
            </p>
            <div className="contact-detail">
              <div className="contact-detail-icon">📧</div>
              <div>
                <div className="contact-detail-text">Email</div>
                <div className="contact-detail-val">{email}</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">📞</div>
              <div>
                <div className="contact-detail-text">Phone</div>
                <div className="contact-detail-val">{phone}</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">📍</div>
              <div>
                <div className="contact-detail-text">Location</div>
                <div className="contact-detail-val">{location}</div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={sendMessage}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                placeholder="Your name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Tell me about your project..."
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                required
              />
            </div>
            {contactStatus === "success" && <p className="form-success">Message sent successfully!</p>}
            {contactStatus === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
            <button type="submit" className="btn-submit" disabled={contactStatus === "sending"}>
              {contactStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {name}. Built with React &amp; Node.js.</p>
      </footer>
    </div>
  );
}

function ExperienceCard({ exp }) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot">💼</div>
      <div className="timeline-content">
        <div className="timeline-header">
          <div className="timeline-role">{exp.role}</div>
          <div className="timeline-date">{exp.startDate} — {exp.endDate || "Present"}</div>
        </div>
        <div className="timeline-company">{exp.company}</div>
        {exp.location && <div className="timeline-location">📍 {exp.location}</div>}
        {exp.bullets?.length > 0 && (
          <ul className="timeline-bullets">
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

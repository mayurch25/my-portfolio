import { useEffect, useState } from "react";
import API from "../services/api";
import "../pages/Portfolio.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
    );
  }

  return (
    <section className="projects-section" style={{ minHeight: "100vh", paddingTop: "100px" }}>
      <div className="section-header">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">My Projects</h2>
        <div className="section-line" />
      </div>

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="empty-state">No projects found.</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="project-card">
              {p.image && (
                <div style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "var(--bg3)",
                  flexShrink: 0,
                }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {!p.image && (
                <div className="project-icon">💻</div>
              )}

              <h3 className="project-title">{p.title}</h3>

              {p.description && (
                <p className="project-desc">{p.description}</p>
              )}

              {p.techStack && p.techStack.length > 0 && (
                <div className="project-tags">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="project-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {(p.githubLink || p.liveLink) && (
                <div className="project-links">
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

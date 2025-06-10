import React, { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { projects } from '../../data/personalInfo';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="project-gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <button
                    className="overlay-btn"
                    onClick={() => openModal(project)}
                    aria-label={`View details for ${project.title}`}
                  >
                    <Eye size={20} />
                    View Details
                  </button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => handleExternalLink(project.liveUrl)}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={() => handleExternalLink(project.githubUrl)}
                  >
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-image"
                />
              </div>

              <div className="modal-body">
                <div className="modal-category">{selectedProject.category}</div>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-description">{selectedProject.description}</p>

                <div className="modal-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => handleExternalLink(selectedProject.liveUrl)}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={() => handleExternalLink(selectedProject.githubUrl)}
                  >
                    <Github size={16} />
                    View Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
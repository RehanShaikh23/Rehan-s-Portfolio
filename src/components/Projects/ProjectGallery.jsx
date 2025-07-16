import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import { projects } from '../../data/personalInfo';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [animatingCards, setAnimatingCards] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleFilterChange = (category) => {
    if (category === filter) return;
    
    setAnimatingCards(true);
    setTimeout(() => {
      setFilter(category);
      setAnimatingCards(false);
    }, 200);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleExternalLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardClick = (project, e) => {
    
    if (e.target.closest('.project-actions')) {
      return;
    }
    openModal(project);
  };

  return (
    <section className="project-gallery" ref={sectionRef}>
      <div className="gallery-container">
        <div className={`gallery-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className={`project-filters ${isVisible ? 'animate-in' : ''}`}>
          {categories.map((category, index) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={`projects-grid ${isVisible ? 'animate-in' : ''} ${animatingCards ? 'animating' : ''}`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={(e) => handleCardClick(project, e)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-container">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <button
                    className="overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project);
                    }}
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
                  {project.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-actions">
                  <button
                    className="action-btn primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExternalLink(project.liveUrl);
                    }}
                    disabled={!project.liveUrl}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExternalLink(project.githubUrl);
                    }}
                    disabled={!project.githubUrl}
                  >
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {selectedProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close" 
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="modal-header">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="modal-image"
                />
              </div>

              <div className="modal-body">
                <div className="modal-category">{selectedProject.category}</div>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-description">{selectedProject.description}</p>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="modal-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-tech">
                  <h4>Technologies Used:</h4>
                  <div className="tech-list">
                    {selectedProject.technologies?.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => handleExternalLink(selectedProject.liveUrl)}
                    disabled={!selectedProject.liveUrl}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    className="action-btn secondary"
                    onClick={() => handleExternalLink(selectedProject.githubUrl)}
                    disabled={!selectedProject.githubUrl}
                  >
                    <Github size={16} />
                    View Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {animatingCards && (
          <div className="filter-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
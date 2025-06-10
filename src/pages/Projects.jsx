import React from 'react';
import ProjectGallery from '../components/Projects/ProjectGallery';

const Projects = () => {
  return (
    <div className="projects-page">
      <div style={{ paddingTop: '70px' }}>
        <ProjectGallery />
      </div>
    </div>
  );
};

export default Projects;
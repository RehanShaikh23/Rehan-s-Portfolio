import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Coffee, // Java
  Braces, // JavaScript
  Atom,   // React
  FileCode2, // HTML
  Paintbrush, // CSS
  Database, // SQL
  Leaf,     // MongoDB
  Binary,   // C
  BarChartBig, // R
  Code2     // Default
} from 'lucide-react';
import { skills } from '../../data/personalInfo';
import './SkillsGrid.css';

const SkillsGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = [...new Set(skills.map(skill => skill.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const skillsPerPage = 6;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  useEffect(() => {
    if (isAutoPlaying && totalPages > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalPages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getCurrentSkills = () => {
    const startIndex = currentIndex * skillsPerPage;
    return filteredSkills.slice(startIndex, startIndex + skillsPerPage);
  };

  const getSkillIcon = (skillName) => {
    const iconSize = 48;
    switch (skillName) {
      case 'Java':
        return <Coffee size={iconSize} />;
      case 'JavaScript':
        return <Braces size={iconSize} />;
      case 'React':
        return <Atom size={iconSize} />;
      case 'HTML':
        return <FileCode2 size={iconSize} />;
      case 'CSS':
        return <Paintbrush size={iconSize} />;
      case 'SQL':
        return <Database size={iconSize} />;
      case 'MongoDB':
        return <Leaf size={iconSize} />;
      case 'C':
        return <Binary size={iconSize} />;
      case 'R':
        return <BarChartBig size={iconSize} />;
      default:
        return <Code2 size={iconSize} />;
    }
  };

  return (
    <section className="skills-grid">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-carousel">
          <div className="carousel-container">
            <div 
              className="skills-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="skills-page">
                  {filteredSkills
                    .slice(pageIndex * skillsPerPage, (pageIndex + 1) * skillsPerPage)
                    .map((skill, index) => (
                      <div key={`${skill.name}-${index}`} className="skill-card">
                        <div className="skill-icon">
                          {getSkillIcon(skill.name)}
                        </div>
                        <h3 className="skill-name">{skill.name}</h3>
                        <div className="skill-level">
                          <div className="level-bar">
                            <div 
                              className="level-fill"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="level-text">{skill.level}%</span>
                        </div>
                        <div className="skill-category">{skill.category}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <>
              <button 
                className="carousel-btn prev"
                onClick={prevSlide}
                aria-label="Previous skills"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="carousel-btn next"
                onClick={nextSlide}
                aria-label="Next skills"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="carousel-indicators">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="skills-summary">
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{skills.length}</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
              </span>
              <span className="stat-label">Avg. Proficiency</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
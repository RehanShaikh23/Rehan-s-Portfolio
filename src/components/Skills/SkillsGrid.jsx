import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Coffee, Braces, Atom, FileCode2, Paintbrush, Database, Leaf, Binary, BarChartBig, Code2 } from 'lucide-react';
import { skills } from '../../data/personalInfo';
import './SkillsGrid.css';

const SkillsGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState({});

  const categories = [...new Set(skills.map(skill => skill.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const skillsPerPage = 6;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill levels when component becomes visible
          const levels = {};
          filteredSkills.forEach((skill, index) => {
            setTimeout(() => {
              levels[skill.name] = skill.level;
              setAnimatedLevels(prev => ({ ...prev, [skill.name]: skill.level }));
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.skills-grid');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [filteredSkills]);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && totalPages > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, 5000); // Increased to 5 seconds for better UX
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalPages]);

  // Reset animation when category changes
  useEffect(() => {
    setAnimatedLevels({});
    setCurrentIndex(0);
    
    // Re-animate levels for new category
    setTimeout(() => {
      const levels = {};
      filteredSkills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedLevels(prev => ({ ...prev, [skill.name]: skill.level }));
        }, index * 80);
      });
    }, 200);
  }, [selectedCategory]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsAutoPlaying(true); // Resume auto-play when category changes
  };

  const getCurrentSkills = () => {
    const startIndex = currentIndex * skillsPerPage;
    return filteredSkills.slice(startIndex, startIndex + skillsPerPage);
  };

  const getSkillIcon = (skillName) => {
    const iconSize = 48;
    const iconProps = {
      size: iconSize,
      strokeWidth: 1.5,
      className: "skill-icon-svg"
    };

    switch (skillName.toLowerCase()) {
      case 'java':
        return <Coffee {...iconProps} />;
      case 'javascript':
        return <Braces {...iconProps} />;
      case 'react':
        return <Atom {...iconProps} />;
      case 'html':
        return <FileCode2 {...iconProps} />;
      case 'css':
        return <Paintbrush {...iconProps} />;
      case 'sql':
        return <Database {...iconProps} />;
      case 'mongodb':
        return <Leaf {...iconProps} />;
      case 'c':
        return <Binary {...iconProps} />;
      case 'r':
        return <BarChartBig {...iconProps} />;
      default:
        return <Code2 {...iconProps} />;
    }
  };

  const getSkillProficiencyText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    if (level >= 40) return 'Beginner';
    return 'Learning';
  };

  return (
    <section className="skills-grid" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('All')}
            aria-pressed={selectedCategory === 'All'}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-carousel">
          <div className="carousel-container">
            <div 
              className="skills-track"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="skills-page">
                  {filteredSkills
                    .slice(pageIndex * skillsPerPage, (pageIndex + 1) * skillsPerPage)
                    .map((skill, index) => (
                      <div 
                        key={`${skill.name}-${pageIndex}-${index}`} 
                        className="skill-card"
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="skill-icon">
                          {getSkillIcon(skill.name)}
                        </div>
                        
                        <h3 className="skill-name">{skill.name}</h3>
                        
                        <div className="skill-level">
                          <div className="level-bar">
                            <div
                              className="level-fill"
                              style={{ 
                                width: `${animatedLevels[skill.name] || 0}%`,
                                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                              aria-label={`${skill.name} proficiency: ${skill.level}%`}
                            />
                          </div>
                          <div className="level-info">
                            <span className="level-text">{skill.level}%</span>
                            <span className="level-proficiency">
                              {getSkillProficiencyText(skill.level)}
                            </span>
                          </div>
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
                aria-label="Previous skills page"
                disabled={totalPages <= 1}
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
              <button 
                className="carousel-btn next"
                onClick={nextSlide}
                aria-label="Next skills page"
                disabled={totalPages <= 1}
              >
                <ChevronRight size={24} strokeWidth={2} />
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
                aria-label={`Go to skills page ${index + 1} of ${totalPages}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}

        <div className="skills-summary">
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number" data-count={skills.length}>
                {skills.length}
              </span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count={categories.length}>
                {categories.length}
              </span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count={Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}>
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
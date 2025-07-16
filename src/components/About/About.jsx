import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Globe, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, experience: 0 });
  const sectionRef = useRef(null);

  const highlights = [
    {
      icon: <Code size={24} />,
      title: "Full Stack Development",
      description: "Proficient in both frontend and backend technologies with a focus on modern web development."
    },
    {
      icon: <Database size={24} />,
      title: "Database Management",
      description: "Experience with SQL and NoSQL databases, ensuring efficient data storage and retrieval."
    },
    {
      icon: <Globe size={24} />,
      title: "Web Technologies",
      description: "Expert in HTML, CSS, JavaScript, and modern frameworks like React."
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimization",
      description: "Focused on creating fast, efficient, and scalable web applications."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounterAnimations();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCounterAnimations = () => {
    const animateCounter = (target, key) => {
      let start = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 30);
    };

    setTimeout(() => {
      animateCounter(20, 'projects');
      animateCounter(2, 'experience');
    }, 500);
  };

  return (
    <section className="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate developer with a love for creating innovative solutions
          </p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <p>
                Hello! I'm {personalInfo.name}, a dedicated full-stack developer based in {personalInfo.location}.
                I specialize in creating modern, responsive web applications that deliver exceptional user experiences.
              </p>
              <p>
                My journey in software development began with a curiosity about how things work behind the scenes.
                This curiosity has evolved into a passion for building scalable, efficient solutions using cutting-edge technologies.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community. I believe in continuous learning and staying updated
                with the latest industry trends.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">{counters.projects}+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">{counters.experience}</span>
                <span className="stat-label">Months Experience</span>
              </div>
            </div>
          </div>
          <div className="about-highlights">
            {highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon">
                  {highlight.icon}
                </div>
                <div className="highlight-content">
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
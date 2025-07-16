import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSocialHover = (index) => {
    setHoveredSocial(index);
  };

  const handleSocialLeave = () => {
    setHoveredSocial(null);
  };

  const handleScrollClick = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      icon: <Github size={24} />,
      url: personalInfo.github,
      label: 'GitHub Profile'
    },
    {
      icon: <Linkedin size={24} />,
      url: personalInfo.linkedin,
      label: 'LinkedIn Profile'
    },
    {
      icon: <Mail size={24} />,
      url: personalInfo.email 
        ? `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`
        : null,
      label: 'Send Email',
      isEmail: true
    }
  ];

  return (
    <section className="hero">
      
      <div 
        className="hero-bg-overlay"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`
        }}
      />
      
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">{personalInfo.name}</span>
            </h1>
            <h2 className="hero-subtitle">{personalInfo.title}</h2>
            <p className="hero-description">{personalInfo.bio}</p>
            
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                <span>View My Work</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/resume" className="btn btn-secondary">
                <Download size={20} />
                <span>Download Resume</span>
              </Link>
            </div>
            
            <div className="hero-social">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className={`social-icon ${hoveredSocial === index ? 'hovered' : ''}`}
                  onClick={() => {
                    if (social.isEmail && !social.url) {
                      console.error('Email address is not configured.');
                      alert('Email address is not configured.');
                      return;
                    }
                    handleSocialClick(social.url);
                  }}
                  onMouseEnter={() => handleSocialHover(index)}
                  onMouseLeave={handleSocialLeave}
                  aria-label={social.label}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`hero-image ${isLoaded ? 'loaded' : ''}`}>
            <div className="image-container">
              <img
                src={personalInfo.profileImage || "/placeholder.svg"}
                alt={`${personalInfo.name} - Profile`}
                loading="eager"
                className="profile-image"
                onLoad={() => setIsLoaded(true)}
              />
              <div className="image-backdrop"></div>
              
              
              <div className="floating-elements">
                <div className="floating-dot floating-dot-1"></div>
                <div className="floating-dot floating-dot-2"></div>
                <div className="floating-dot floating-dot-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`hero-scroll ${isLoaded ? 'loaded' : ''}`}>
          <div className="scroll-indicator" onClick={handleScrollClick}>
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>
      
      
      <div className="hero-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </section>
  );
};

export default Hero;
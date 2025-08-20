import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import Particles from '../Particles/Particles'; // Add this import
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const footerRef = useRef(null);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: personalInfo.github,
      label: 'GitHub'
    },
    {
      icon: <Linkedin size={20} />,
      url: personalInfo.linkedin,
      label: 'LinkedIn'
    },
    {
      icon: <Mail size={20} />,
      url: `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`,
      label: 'Email',
      isEmail: true
    }
  ];

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isTouchDevice = 'ontouchstart' in window;
      const isSmallScreen = window.innerWidth <= 768;
      
      return mobileRegex.test(userAgent.toLowerCase()) || isTouchDevice || isSmallScreen;
    };

    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSocialClick = (link) => {
    if (link.isEmail) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSocialHover = (index) => {
    setHoveredSocial(index);
  };

  const handleSocialLeave = () => {
    setHoveredSocial(null);
  };



  // Particles configuration - optimized for footer
  const particlesProps = isMobile ? {
    particleColors: ['#3b82f6', '#10b981', '#ffffff'],
    particleCount: 80, // Reduced for mobile performance
    particleSpread: 8,
    speed: 0.05, // Slower on mobile
    particleBaseSize: 60,
    moveParticlesOnHover: false, // Disable on mobile
    alphaParticles: true,
    disableRotation: false,
    particleHoverFactor: 0,
    sizeRandomness: 0.8,
    cameraDistance: 25,
    className: "footer-particles mobile-particles"
  } : {
    particleColors: ['#3b82f6', '#10b981', '#ffffff'],
    particleCount: 150,
    particleSpread: 12,
    speed: 0.08,
    particleBaseSize: 80,
    moveParticlesOnHover: true,
    alphaParticles: true,
    disableRotation: false,
    particleHoverFactor: 1.5,
    sizeRandomness: 1,
    cameraDistance: 20,
    className: "footer-particles"
  };

  return (
    <footer className="footer" ref={footerRef}>
      {/* Background Effects Layer */}
      <div className="footer-background-effects">
        {/* Particles Background */}
        <div className="footer-particles-container">
          <Particles {...particlesProps} />
        </div>
      </div>
      
      <div className="footer-container">
        <div className={`footer-content ${isVisible ? 'animate-in' : ''}`}>
          <div className="footer-brand">
            <h3 className="brand-name">{personalInfo.name}</h3>
            <p className="brand-tagline">{personalInfo.title}</p>
          </div>
          
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <button
                key={index}
                className={`social-link ${hoveredSocial === index ? 'hovered' : ''}`}
                onClick={() => handleSocialClick(link)}
                onMouseEnter={() => handleSocialHover(index)}
                onMouseLeave={handleSocialLeave}
                aria-label={link.label}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>

        <div className={`footer-divider ${isVisible ? 'animate-in' : ''}`}></div>

        <div className={`footer-bottom ${isVisible ? 'animate-in' : ''}`}>
          <p className="copyright">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={16} className="heart-icon" /> using React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
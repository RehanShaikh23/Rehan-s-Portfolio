import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { SparklesCore } from '../ui/sparkles';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
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

  return (
    <footer className="footer" ref={footerRef}>
      {/* Sparkles Background */}
      <div className="footer-sparkles">
        <SparklesCore
          id="footer-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#3b82f6"
          speed={0.8}
        />
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
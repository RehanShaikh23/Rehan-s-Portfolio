import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import LightRays from '../LightRays/LightRays';
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

  // Mobile-optimized LightRays settings
  const lightRaysProps = isMobile ? {
    raysOrigin: "top-center",
    raysColor: "#3b82f6",
    raysSpeed: 0.8, // Slower on mobile for performance
    lightSpread: 1.2, // More spread for better visibility
    rayLength: 2.5, // Longer rays
    followMouse: false, // Disable mouse following on mobile
    mouseInfluence: 0,
    noiseAmount: 0.05, // Less noise for performance
    distortion: 0.01, // Less distortion
    pulsating: true, // Add pulsating effect for mobile
    fadeDistance: 0.8,
    saturation: 1.2, // Higher saturation for better visibility
    className: "footer-rays mobile-rays"
  } : {
    raysOrigin: "top-center",
    raysColor: "#3b82f6",
    raysSpeed: 1.2,
    lightSpread: 0.6,
    rayLength: 1.5,
    followMouse: true,
    mouseInfluence: 0.08,
    noiseAmount: 0.12,
    distortion: 0.03,
    className: "footer-rays"
  };

  return (
    <footer className="footer" ref={footerRef}>
      {/* LightRays Background */}
      <div className="footer-lightrays">
        <LightRays {...lightRaysProps} />
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
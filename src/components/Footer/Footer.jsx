import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      url: `mailto:${personalInfo.email}`,
      label: 'Email'
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="brand-name">{personalInfo.name}</h3>
            <p className="brand-tagline">{personalInfo.title}</p>
          </div>

          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <button
                key={index}
                className="social-link"
                onClick={() => handleSocialClick(link.url)}
                aria-label={link.label}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
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
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Hero.css';

const Hero = () => {
  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">{personalInfo.name}</span>
            </h1>
            <h2 className="hero-subtitle">{personalInfo.title}</h2>
            <p className="hero-description">{personalInfo.bio}</p>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View My Work
                <ArrowRight size={20} />
              </Link>
              <Link to="/resume" className="btn btn-secondary">
                <Download size={20} />
                Download Resume
              </Link>
            </div>

            <div className="hero-social">
              <button
                className="social-icon"
                onClick={() => handleSocialClick(personalInfo.github)}
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </button>
              <button
                className="social-icon"
                onClick={() => handleSocialClick(personalInfo.linkedin)}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </button>
              <button
                className="social-icon"
                onClick={() => {
                  if (personalInfo.email) {
                    
                    window.open(
                      `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  } else {
                    console.error('Email address is not configured.');
                    alert('Email address is not configured.');
                  }
                }}
                aria-label="Send Email"
              >
                <Mail size={24} />
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-container">
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name} - Profile`}
                loading="eager"
                className="profile-image"
              />
              <div className="image-backdrop"></div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

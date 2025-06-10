import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, Copy } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Hero.css';

const Hero = () => {
  const handleSocialClick = (url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {

      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleEmailClick = () => {
    const email = personalInfo.email;


    console.log('Email clicked:', email);

    if (!email) {
      alert('Email address not configured');
      return;
    }

    try {

      window.location.href = `mailto:${email}`;


      setTimeout(() => {
        const userChoice = confirm(
          `If your email client didn't open, would you like to copy the email address (${email}) to clipboard instead?`
        );

        if (userChoice) {
          copyEmailToClipboard(email);
        }
      }, 2000);

    } catch (error) {
      console.error('Error opening email client:', error);
      copyEmailToClipboard(email);
    }
  };

  const copyEmailToClipboard = async (email) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        alert(`Email address copied to clipboard: ${email}`);
      } else {

        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(`Email address copied to clipboard: ${email}`);
      }
    } catch (error) {
      console.error('Failed to copy email:', error);
      alert(`Please copy this email manually: ${email}`);
    }
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
            <p className="hero-description">
              {personalInfo.bio}
            </p>

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
                onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=as9565704@gmail.com', '_blank')}
                aria-label="Send Email via Gmail"
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
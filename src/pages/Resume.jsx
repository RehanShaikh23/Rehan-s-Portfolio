import React from 'react';
import { Download, Mail, Phone, MapPin, Calendar, Award, Code, Briefcase } from 'lucide-react';
import { personalInfo, skills, projects } from '../data/personalInfo';
import './Resume.css';

const Resume = () => {
  const handleDownload = () => {
    // In a real application, this would download the actual PDF resume
    alert('Resume download would start here. Please implement PDF generation.');
  };

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Code B Solutions Pvt Ltd",
      period: "24/03/2025 ~ 24/05/2025",
      description: "Developed multiple web applications using React, Node.js, and modern web technologies. Specialized in creating responsive, user-friendly interfaces and robust backend systems."
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications",
      institution: "Savitribai Phule Pune University",
      period: "2024 - 2027",
      description: "Focused on software development, data structures, algorithms, and web development technologies."
    }
  ];

  const achievements = [
    "Completed 15+ successful projects",
    "Expert in modern web development frameworks",
    "Strong problem-solving and analytical skills"
  ];

  return (
    <div className="resume-page">
      <div className="resume-container">
        <div className="resume-header">
          <div className="header-content">
            <h1 className="resume-name">{personalInfo.name}</h1>
            <h2 className="resume-title">{personalInfo.title}</h2>
            <p className="resume-bio">{personalInfo.bio}</p>

            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <a href="/Updated_Cv_Rehan_Shaikh.pdf" download className="download-btn">
              <Download size={20} />
              Download PDF Resume
            </a>

          </div>
        </div>

        <div className="resume-content">
          <div className="resume-section">
            <div className="section-header">
              <Briefcase size={24} />
              <h3>Professional Experience</h3>
            </div>
            <div className="experience-list">
              {experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">{exp.title}</h4>
                    <span className="experience-period">
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                  </div>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-description">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <div className="section-header">
              <Award size={24} />
              <h3>Education</h3>
            </div>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <span className="education-period">
                      <Calendar size={16} />
                      {edu.period}
                    </span>
                  </div>
                  <p className="education-institution">{edu.institution}</p>
                  <p className="education-description">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <div className="section-header">
              <Code size={24} />
              <h3>Technical Skills</h3>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-category">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <div className="section-header">
              <Award size={24} />
              <h3>Key Achievements</h3>
            </div>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <span className="achievement-bullet">✓</span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <div className="section-header">
              <Briefcase size={24} />
              <h3>Featured Projects</h3>
            </div>
            <div className="projects-list">
              {projects.slice(0, 2).map((project, index) => (
                <div key={index} className="project-item">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
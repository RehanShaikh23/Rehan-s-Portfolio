import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, MapPin, Calendar, Award, Code, Briefcase, ExternalLink, Github } from 'lucide-react';
import { personalInfo, skills, projects } from '../data/personalInfo';
import './Resume.css';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success, error

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars when visible
          setTimeout(() => {
            const skillsAnimation = {};
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => ({ ...prev, [skill.name]: skill.level }));
              }, index * 100);
            });
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.resume-page');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleDownload = async () => {
    setDownloadStatus('downloading');
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = '/Rehan_Shaikh_CV.pdf';
      link.download = 'Rehan_Shaikh_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } catch (error) {
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
      console.error('Download failed:', error);
    }
  };

  const getDownloadButtonText = () => {
    switch (downloadStatus) {
      case 'downloading':
        return 'Preparing Download...';
      case 'success':
        return 'Download Complete!';
      case 'error':
        return 'Download Failed - Retry';
      default:
        return 'Download PDF Resume';
    }
  };

  const experience = [
  {
    title: "Full Stack Developer",
    company: "Code B Solutions Pvt Ltd",
    period: "24/03/2025 ~ 24/05/2025",
    description:
      "Developed multiple web applications using React, Node.js, and modern web technologies. Specialized in creating responsive, user-friendly interfaces and robust backend systems.",
    highlights: [
      "Built 5+ responsive web applications",
      "Improved application performance by 40%",
      "Collaborated with cross-functional teams"
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "Accenture Nordics (Forage)",
    period: "July 2025",
    location: "Pune, INDIA",
    description:
      "Completed virtual internship in Software Engineering focused on agile and DevOps practices within a healthcare app simulation.",
    highlights: [
      "Worked on a simulated healthcare app using Agile and DevOps",
      "Applied cloud architecture concepts (IaaS, PaaS)",
      "Integrated security into SDLC using NIST framework and IAM practices"
    ]
  }
];


  const education = [
    {
      degree: "Bachelor of Computer Applications",
      institution: "Savitribai Phule Pune University",
      period: "2024 - 2027",
      description: "Focused on software development, data structures, algorithms, and web development technologies.",
      gpa: "Current GPA: 8.5/10",
      coursework: ["Data Structures", "Web Development", "Database Management", "Software Engineering"]
    }
  ];

  const achievements = [
    {
      text: "Completed 30+ successful projects",
      icon: "🚀"
    },
    {
      text: "Expert in modern web development frameworks",
      icon: "💻"
    },
    {
      text: "Strong problem-solving and analytical skills",
      icon: "🧠"
    },
    {
      text: "Excellent team collaboration and communication",
      icon: "🤝"
    }
  ];

  const getSkillProficiencyLevel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    if (level >= 40) return 'Beginner';
    return 'Learning';
  };

  return (
    <div className="resume-page" id="resume">
      <div className="resume-container">
        <div className="resume-header">
          <div className="header-content">
            <h1 className="resume-name">{personalInfo.name}</h1>
            <h2 className="resume-title">{personalInfo.title}</h2>
            <p className="resume-bio">{personalInfo.bio}</p>
            
            <div className="contact-info">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="contact-item"
                aria-label={`Email ${personalInfo.name}`}
              >
                <Mail size={18} strokeWidth={2} />
                <span>{personalInfo.email}</span>
              </a>
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="contact-item"
                aria-label={`Call ${personalInfo.name}`}
              >
                <Phone size={18} strokeWidth={2} />
                <span>{personalInfo.phone}</span>
              </a>
              <div className="contact-item">
                <MapPin size={18} strokeWidth={2} />
                <span>{personalInfo.location}</span>
              </div>
            </div>
            
            <button 
              onClick={handleDownload}
              className={`download-btn ${downloadStatus}`}
              disabled={downloadStatus === 'downloading'}
              aria-label="Download PDF resume"
            >
              <Download 
                size={20} 
                strokeWidth={2}
                className={downloadStatus === 'downloading' ? 'downloading-icon' : ''}
              />
              {getDownloadButtonText()}
            </button>
          </div>
        </div>

        <div className="resume-content">
          {/* Professional Experience Section */}
          <div className="resume-section">
            <div className="section-header">
              <Briefcase size={24} strokeWidth={2} />
              <h3>Professional Experience</h3>
            </div>
            <div className="experience-list">
              {experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h4 className="experience-title">{exp.title}</h4>
                    <span className="experience-period">
                      <Calendar size={16} strokeWidth={2} />
                      {exp.period}
                    </span>
                  </div>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-description">{exp.description}</p>
                  
                  {exp.highlights && (
                    <div className="experience-highlights">
                      <h5>Key Achievements:</h5>
                      <ul>
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="resume-section">
            <div className="section-header">
              <Award size={24} strokeWidth={2} />
              <h3>Education</h3>
            </div>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <span className="education-period">
                      <Calendar size={16} strokeWidth={2} />
                      {edu.period}
                    </span>
                  </div>
                  <p className="education-institution">{edu.institution}</p>
                  <p className="education-description">{edu.description}</p>
                  
                  {edu.gpa && (
                    <div className="education-gpa">
                      <strong>{edu.gpa}</strong>
                    </div>
                  )}
                  
                  {edu.coursework && (
                    <div className="education-coursework">
                      <h5>Relevant Coursework:</h5>
                      <div className="coursework-tags">
                        {edu.coursework.map((course, idx) => (
                          <span key={idx} className="coursework-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="resume-section">
            <div className="section-header">
              <Code size={24} strokeWidth={2} />
              <h3>Technical Skills</h3>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level-info">
                      <span className="skill-level">{skill.level}%</span>
                      <span className="skill-proficiency">
                        {getSkillProficiencyLevel(skill.level)}
                      </span>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{ 
                        width: `${animatedSkills[skill.name] || 0}%`,
                        transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      aria-label={`${skill.name} proficiency: ${skill.level}%`}
                    />
                  </div>
                  <span className="skill-category">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements Section */}
          <div className="resume-section">
            <div className="section-header">
              <Award size={24} strokeWidth={2} />
              <h3>Key Achievements</h3>
            </div>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <span className="achievement-icon">{achievement.icon}</span>
                  <span className="achievement-text">{achievement.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="resume-section">
            <div className="section-header">
              <Briefcase size={24} strokeWidth={2} />
              <h3>Featured Projects</h3>
            </div>
            <div className="projects-list">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index} className="project-item">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} source code`}
                        >
                          <Github size={16} strokeWidth={2} />
                        </a>
                      )}
                    </div>
                  </div>
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
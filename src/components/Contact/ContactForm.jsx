import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const sectionRef = useRef(null);

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: personalInfo.location,
      href: null
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.send(
        'service_z7ix0pr',
        'template_js60r9p',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Rehan Shaikh',
        },
        'EHogLe3GJZ-0mSNHy'
      );
      
      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form" ref={sectionRef}>
      <div className="contact-container">
        <div className={`contact-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Let's discuss your project or just say hello
          </p>
        </div>

        <div className="contact-content">
          <div className={`contact-info ${isVisible ? 'animate-in' : ''}`}>
            <h3 className="info-title">Contact Information</h3>
            <p className="info-description">
              Feel free to reach out to me through any of the following channels.
              I'm always open to discussing new opportunities and interesting projects.
            </p>

            <div className="contact-methods">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="contact-method"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="method-icon">
                    {item.icon}
                  </div>
                  <div className="method-content">
                    <span className="method-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="method-value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="method-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="response-time">
              <div className="response-indicator">
                <div className="indicator-dot"></div>
                <span>Reply As Soon As Possible Thank You! 😊</span>
              </div>
            </div>
          </div>

          <div className={`form-container ${isVisible ? 'animate-in' : ''}`}>
            <form onSubmit={handleSubmit} className="contact-form-element">
              <div className="form-row">
                <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>
                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}>
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  required
                  className="form-input"
                  placeholder="What's this about?"
                />
              </div>

              <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows="6"
                  className="form-textarea"
                  placeholder="Tell me about your project or just say hello..."
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`form-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} />
                      <span>Failed to send message. Please try again.</span>
                    </>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
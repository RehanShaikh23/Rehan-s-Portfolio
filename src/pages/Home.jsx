import React from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import ProjectGallery from '../components/Projects/ProjectGallery';
import SkillsGrid from '../components/Skills/SkillsGrid';
import ContactForm from '../components/Contact/ContactForm';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <ProjectGallery />
      <SkillsGrid />
      <ContactForm />
    </div>
  );
};

export default Home;
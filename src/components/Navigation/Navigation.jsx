import React from 'react';
import { Home, User, Briefcase, Code, FileText, Mail } from 'lucide-react';
import { TubelightNavBar } from '../ui/tubelight-navbar';

const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Skills', url: '/skills', icon: Code },
    { name: 'Resume', url: '/resume', icon: FileText },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  return <TubelightNavBar items={navItems} />;
};

export default Navigation;
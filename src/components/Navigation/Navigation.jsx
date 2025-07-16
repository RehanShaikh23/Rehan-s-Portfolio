import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  Code,
  FileText,
  Mail,
  Menu,
  X,
  FolderOpen, 
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/skills', label: 'Skills', icon: Code },
    { path: '/resume', label: 'Resume', icon: FileText },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(currentScrollY / documentHeight, 1);

    setIsScrolled(currentScrollY > 50);
    setScrollProgress(progress);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;

    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }

      if (isMenuOpen && e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements?.length) {
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if ('vibrate' in navigator && !prev) navigator.vibrate(50);
      return !prev;
    });
  };

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) setIsMenuOpen(false);
  }, []);

  const handleLinkClick = (path) => {
    setIsMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getNavIcon = (Icon, isActive) => (
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="nav-item-icon" />
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`navigation ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''} ${isLoaded ? 'loaded' : ''}`}
        style={{ '--scroll-progress': scrollProgress }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-container">
          <Link
            to="/"
            className="nav-logo"
            onClick={() => handleLinkClick('/')}
            aria-label="Rehan Shaikh - Home"
          >
            <span className="logo-text">{personalInfo.name}</span>
            <span className="logo-dot"></span>
          </Link>

          <div
            ref={menuRef}
            className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
            role="menubar"
            aria-hidden={!isMenuOpen}
          >
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleLinkClick(item.path)}
                  style={{
                    animationDelay: isMenuOpen ? `${index * 0.1}s` : '0s',
                    '--item-index': index,
                  }}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {getNavIcon(item.icon, isActive)}
                  <span className="nav-item-text">{item.label}</span>
                  {isActive && <span className="nav-item-indicator" aria-hidden="true" />}
                </Link>
              );
            })}
          </div>

          <button
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            type="button"
          >
            <div className="nav-toggle-icon">
              <span className="nav-toggle-line" aria-hidden="true"></span>
              <span className="nav-toggle-line" aria-hidden="true"></span>
              <span className="nav-toggle-line" aria-hidden="true"></span>
            </div>
            <span className="nav-toggle-text sr-only">
              {isMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
          </button>
        </div>

        <div
          className="nav-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </nav>

      {isMenuOpen && (
        <div className="nav-overlay" onClick={handleOverlayClick} aria-hidden="true" role="presentation" />
      )}
    </>
  );
};

export default Navigation;

import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import emailjs from '@emailjs/browser';
import './styles/global.css';

// Lazy load pages with better error handling
const Home = React.lazy(() => 
  import('./pages/Home').catch(() => ({ default: () => <div className="error-page">Error loading Home page</div> }))
);
const About = React.lazy(() => 
  import('./pages/About').catch(() => ({ default: () => <div className="error-page">Error loading About page</div> }))
);
const Projects = React.lazy(() => 
  import('./pages/Projects').catch(() => ({ default: () => <div className="error-page">Error loading Projects page</div> }))
);
const Skills = React.lazy(() => 
  import('./pages/Skills').catch(() => ({ default: () => <div className="error-page">Error loading Skills page</div> }))
);
const Resume = React.lazy(() => 
  import('./pages/Resume').catch(() => ({ default: () => <div className="error-page">Error loading Resume page</div> }))
);
const Contact = React.lazy(() => 
  import('./pages/Contact').catch(() => ({ default: () => <div className="error-page">Error loading Contact page</div> }))
);

// Enhanced Loading Component
const EnhancedLoadingSpinner = ({ message = "Loading..." }) => (
  <div className="loading-container">
    <LoadingSpinner />
    <p className="loading-text">{message}</p>
  </div>
);

// Route change tracker component
const RouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title based on route
    const routeTitles = {
      '/': 'Home - Rehan Shaikh | Full Stack Developer',
      '/about': 'About - Rehan Shaikh | Full Stack Developer',
      '/projects': 'Projects - Rehan Shaikh | Full Stack Developer',
      '/skills': 'Skills - Rehan Shaikh | Full Stack Developer',
      '/resume': 'Resume - Rehan Shaikh | Full Stack Developer',
      '/contact': 'Contact - Rehan Shaikh | Full Stack Developer'
    };
    
    document.title = routeTitles[location.pathname] || 'Rehan Shaikh | Full Stack Developer';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const descriptions = {
        '/': 'Full Stack Developer specializing in modern web technologies. View my portfolio and projects.',
        '/about': 'Learn more about Rehan Shaikh - Full Stack Developer with expertise in React, Node.js, and modern web development.',
        '/projects': 'Explore my portfolio of web development projects and applications.',
        '/skills': 'Technical skills and expertise in web development technologies.',
        '/resume': 'Professional resume and experience of Rehan Shaikh.',
        '/contact': 'Get in touch with Rehan Shaikh for web development opportunities.'
      };
      metaDescription.setAttribute('content', descriptions[location.pathname] || descriptions['/']);
    }
    
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return null;
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry, but something unexpected happened.</p>
            <div className="error-actions">
              <button 
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-primary"
              >
                Try again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Not Found Component
const NotFound = () => (
  <div className="not-found">
    <div className="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  </div>
);

// Main App Component
function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [emailJsStatus, setEmailJsStatus] = useState('loading');

  // Enhanced EmailJS initialization
  const initializeEmailJS = useCallback(async () => {
    try {
      emailjs.init('EHogLe3GJZ-0mSNHy');
      setEmailJsStatus('success');
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      setEmailJsStatus('error');
      console.warn('⚠️ EmailJS initialization failed:', error);
    }
  }, []);

  // App initialization
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize EmailJS
        await initializeEmailJS();
        
        // Small delay for smooth loading experience
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mark app as loaded
        setIsAppLoaded(true);
        
      } catch (error) {
        console.error('App initialization error:', error);
        setIsAppLoaded(true); // Still show app even if initialization fails
      }
    };

    initializeApp();
  }, [initializeEmailJS]);

  // Show loading screen while app initializes
  if (!isAppLoaded) {
    return (
      <div className="app-loading">
        <EnhancedLoadingSpinner message="Initializing portfolio..." />
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          {/* Global route change tracker */}
          <RouteChangeTracker />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main content */}
          <main className="main-content" role="main">
            <Suspense 
              fallback={
                <div className="page-loading">
                  <EnhancedLoadingSpinner message="Loading page..." />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* EmailJS status indicator (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className={`emailjs-status ${emailJsStatus}`}>
              EmailJS: {emailJsStatus}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
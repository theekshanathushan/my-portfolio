import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';
import CVPage from './components/CVPage';

// Lazy-load Coding Activity section to optimize initial load & Lighthouse score
const ActivitySection = lazy(() => import('./components/activity/ActivitySection'));

function ActivityLoadingFallback() {
  return (
    <section className="section" style={{ minHeight: '380px' }} aria-label="Loading coding activity...">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-subtitle">ACTIVITY</span>
          <h2 className="section-title">Coding Activity</h2>
        </div>
        <div style={{
          height: '240px',
          background: 'rgba(13, 13, 23, 0.45)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}></div>
      </div>
    </section>
  );
}

export default function App() {
  // Routing State ('home' | 'cv')
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.endsWith('/cv') || path === '/cv' || hash === '#/cv' || hash === '#cv') {
      return 'cv';
    }
    return 'home';
  });

  // Theme Accent State ('cyan', 'pink', 'gold')
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('portfolio-accent') || 'cyan';
  });

  // CV Modal State
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Sync route changes
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.endsWith('/cv') || path === '/cv' || hash === '#/cv' || hash === '#cv') {
        setCurrentRoute('cv');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Sync Accent to DOM
  useEffect(() => {
    document.body.setAttribute('data-accent', accent);
    localStorage.setItem('portfolio-accent', accent);
  }, [accent]);

  if (currentRoute === 'cv') {
    return (
      <div className="portfolio-app-root">
        <CVPage 
          onBack={() => {
            window.location.hash = '#home';
            setCurrentRoute('home');
          }} 
        />
      </div>
    );
  }

  return (
    <div className="portfolio-app-root">
      {/* Grid Texturing & Floating Mesh Blobs */}
      <div className="ambient-bg">
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>
      </div>
      <div className="grid-overlay"></div>

      {/* Main Pages Navigation */}
      <Navbar currentAccent={accent} onAccentChange={setAccent} onOpenCV={() => setIsCVOpen(true)} />

      {/* Layout Grid Sections */}
      <main>
        <Hero onOpenCV={() => setIsCVOpen(true)} />
        <About />
        <Skills />
        <Suspense fallback={<ActivityLoadingFallback />}>
          <ActivitySection />
        </Suspense>
        <Projects />
        <Hackathons />
        <Certifications />
        <Contact />
      </main>

      {/* Interactive CV Viewer */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

      {/* Footer */}
      <Footer />

      <style>{`
        .portfolio-app-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        main {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
}

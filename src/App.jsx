import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';

export default function App() {
  // Theme Accent State ('cyan', 'pink', 'gold')
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('portfolio-accent') || 'cyan';
  });

  // CV Modal State
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Custom Cursor Coordinates
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Sync Accent to DOM
  useEffect(() => {
    document.body.setAttribute('data-accent', accent);
    localStorage.setItem('portfolio-accent', accent);
  }, [accent]);

  // Track Mouse Movements for Cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth Ring Follow Lag
  useEffect(() => {
    let animationFrameId;
    
    const updateRing = () => {
      setRingPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        // Ease factor (0.15 gives a smooth follow lag effect)
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16
        };
      });
      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Attach Hover Observers to Links & Buttons
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const updateHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, input, textarea, [role="button"], .project-card');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        targets.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Run initially and set a small timeout to catch dynamically loaded items (like Modals)
    const cleanup = updateHoverListeners();
    
    // Set an interval to re-bind elements (handles dynamic changes)
    const interval = setInterval(updateHoverListeners, 1000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
      />

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
        <Projects />
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

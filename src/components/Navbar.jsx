import React, { useState, useEffect } from 'react';
import { Menu, X, Palette, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ currentAccent, onAccentChange, onOpenCV }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const accents = [
    { name: 'cyan', color: '#00f2fe', label: 'Neon Cyan' },
    { name: 'pink', color: '#ff007f', label: 'Magenta Pink' },
    { name: 'gold', color: '#ffb703', label: 'Amber Gold' }
  ];

  return (
    <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Logo */}
        <a href="#home" className="nav-logo">
          <Sparkles size={20} className="logo-icon" />
          <span>PORT<span className="text-glow-accent">FOLIO</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#cv" onClick={(e) => { e.preventDefault(); onOpenCV(); }} className="nav-link">
            Resume
          </a>
        </div>

        {/* Action Panel (Theme Switcher) */}
        <div className="nav-actions">
          <div className="theme-toggle-wrapper">
            <button 
              className="theme-palette-btn" 
              onClick={() => setIsPaletteOpen(!isPaletteOpen)}
              title="Change Accent Theme"
            >
              <Palette size={18} />
            </button>
            {isPaletteOpen && (
              <div className="theme-dropdown glass-card">
                {accents.map((acc) => (
                  <button
                    key={acc.name}
                    className={`accent-dot-btn ${currentAccent === acc.name ? 'active' : ''}`}
                    onClick={() => {
                      onAccentChange(acc.name);
                      setIsPaletteOpen(false);
                    }}
                    title={acc.label}
                  >
                    <span className="accent-dot" style={{ backgroundColor: acc.color }}></span>
                    <span className="accent-label">{acc.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay glass-card">
          <div className="mobile-nav-links">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#cv" 
              className="mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick();
                onOpenCV();
              }}
            >
              Resume
            </a>
          </div>
        </div>
      )}

      {/* Styles local to Navbar */}
      <style>{`
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar-container.scrolled {
          height: 70px;
          background: rgba(7, 7, 11, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-glass);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .navbar-content {
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 20px;
          color: var(--text-white);
          text-decoration: none;
          letter-spacing: 0.05em;
        }
        .logo-icon {
          color: var(--accent);
          filter: drop-shadow(0 0 5px var(--accent));
        }
        .nav-links-desktop {
          display: flex;
          gap: 32px;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
        }
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
          padding: 4px 0;
        }
        .nav-link:hover {
          color: var(--text-white);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-accent);
          transition: width 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .theme-toggle-wrapper {
          position: relative;
        }
        .theme-palette-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .theme-palette-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--accent);
          border-color: var(--accent);
        }
        .theme-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 180px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 1001;
        }
        .accent-dot-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          transition: all 0.2s;
        }
        .accent-dot-btn:hover, .accent-dot-btn.active {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.06);
        }
        .accent-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-light);
        }
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }
        }
        .mobile-nav-overlay {
          position: fixed;
          top: 80px;
          left: 16px;
          right: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 999;
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          text-align: center;
        }
        .mobile-nav-link {
          color: var(--text-light);
          text-decoration: none;
          font-size: 18px;
          font-family: var(--font-heading);
          font-weight: 600;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover {
          color: var(--accent);
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Mail, ArrowUpRight, Download } from 'lucide-react';
import profileImg from '../assets/profile.png';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);


const TYPING_WORDS = ["Full-Stack Developer", "Creative Engineer", "UI/UX Practitioner", "Problem Solver"];
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const DELAY_BETWEEN_WORDS = 2000;

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakIntro = () => {
    // Cancel currently active utterance
    window.speechSynthesis.cancel();

    const text = "Hi, I am Theekshana. Welcome to my portfolio!";
    const utterance = new SpeechSynthesisUtterance(text);

    // Choose appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (engVoice) {
      utterance.voice = engVoice;
    }

    utterance.rate = 0.92;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Typing Effect
  useEffect(() => {
    let timer;
    const currentWord = TYPING_WORDS[wordIdx];

    if (!isDeleting) {
      if (typedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        }, TYPING_SPEED);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, DELAY_BETWEEN_WORDS);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        }, ERASING_SPEED);
      } else {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % TYPING_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  // Particle System Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 20000));
    const connectionDist = 120;

    let mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interact with mouse
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Get CSS custom variable for accent
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        ctx.fillStyle = accentColor || '#00f2fe';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      const accentColor = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim();
      const rgb = accentColor || '0, 242, 254';

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="hero-particles-canvas" />

      <div className="container hero-container">
        {/* Left Column: Text & Actions */}
        <div className="hero-content">
          <div className="hero-badge glass-card">
            <span className="badge-pulse"></span>
            Available for new opportunities
          </div>

          <h1 className="hero-title">
            Hi <span className="waving-hand">👋</span>, I'm <span className="text-glow-accent">Theekshana Thushan</span>
          </h1>

          <div className="hero-subtitle">
            I build <span className="typing-text">{typedText}</span><span className="cursor-blink">|</span>
          </div>

          <p className="hero-description">
            Crafting premium interactive digital experiences where cutting-edge technology meets beautiful, clean interfaces. Specializing in highly performant React web apps and creative animations.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Let's Collaborate <ArrowUpRight size={18} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Work
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <a href="https://github.com/G-T-Thushan" target="_blank" rel="noreferrer" className="social-icon-btn glass-card" title="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/theekshana-thushan-57b866328" target="_blank" rel="noreferrer" className="social-icon-btn glass-card" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn glass-card" title="Twitter">
              <Twitter size={20} />
            </a>
            <a href="mailto:theekshanathushan89@gmail.com" className="social-icon-btn glass-card" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Profile Frame */}
        <div className="hero-image-wrap" onClick={speakIntro} style={{ cursor: 'pointer' }} title="Click to hear me say hi!">
          <div className={`hero-image-glow-ring ${isSpeaking ? 'speaking' : ''}`}></div>

          {/* Dynamic Audio Visualizer Waves */}
          {isSpeaking && (
            <div className="audio-visualizer-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          )}

          <div className={`hero-profile-image-container glass-card ${isSpeaking ? 'speaking' : ''}`}>
            <img src={profileImg} alt="Theekshana Thushan Profile" className="hero-profile-image" />

            {/* Sound indicator overlay (shown when NOT speaking) */}
            {!isSpeaking && (
              <div className="profile-audio-overlay">
                <div className="overlay-pulse-circle">
                  <span className="speaker-emoji">🔊</span>
                </div>
                <span className="audio-overlay-text">Listen Intro</span>
              </div>
            )}

            {/* Audio Equalizer bars when speaking */}
            {isSpeaking && (
              <div className="speaking-audio-bars">
                <span className="equalizer-bar bar-1"></span>
                <span className="equalizer-bar bar-2"></span>
                <span className="equalizer-bar bar-3"></span>
                <span className="equalizer-bar bar-4"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles local to Hero */}
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: all;
        }
        .hero-container {
          z-index: 1;
          position: relative;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 48px;
          align-items: center;
          text-align: left;
        }
        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
        }
        .hero-content {
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 992px) {
          .hero-content {
            align-items: center;
          }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-light);
          margin-bottom: 24px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
        }
        .badge-pulse {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: 56px;
          line-height: 1.1;
          margin-bottom: 16px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .waving-hand {
          display: inline-block;
          animation: wave-hand 2.5s infinite;
          transform-origin: 70% 70%;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
          }
        }
        .hero-subtitle {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 600;
          color: var(--text-light);
          margin-bottom: 24px;
          min-height: 48px;
        }
        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 24px;
            min-height: 36px;
          }
        }
        .typing-text {
          color: var(--accent);
          text-shadow: 0 0 15px rgba(var(--accent-rgb), 0.35);
        }
        .cursor-blink {
          color: var(--accent);
          font-weight: 300;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }
        .hero-description {
          font-size: 17px;
          color: var(--text-muted);
          max-width: 620px;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .hero-description {
            font-size: 15px;
          }
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }
        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
        }
        .hero-socials {
          display: flex;
          gap: 16px;
        }
        .social-icon-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.3s;
          background: rgba(255, 255, 255, 0.02);
        }
        .social-icon-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(var(--accent-rgb), 0.15);
        }

        /* Profile image elements */
        .hero-image-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }
        .hero-image-glow-ring {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: var(--gradient-accent);
          filter: blur(28px);
          opacity: 0.3;
          animation: pulseGlow 4s infinite alternate ease-in-out;
          pointer-events: none;
        }
        .hero-profile-image-container {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--border-glass);
          z-index: 2;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(var(--accent-rgb), 0.1) inset;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-profile-image:hover {
          transform: scale(1.06);
        }
        @media (max-width: 992px) {
          .hero-image-glow-ring {
            width: 240px;
            height: 240px;
          }
          .hero-profile-image-container {
            width: 220px;
            height: 220px;
            margin-top: 10px;
          }
        }

        /* Click overlay on hover */
        .profile-audio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(7, 7, 11, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 4;
        }
        .hero-profile-image-container:hover .profile-audio-overlay {
          opacity: 1;
        }
        .overlay-pulse-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px var(--accent);
          margin-bottom: 8px;
          animation: pulseIcon 1.5s infinite alternate ease-in-out;
        }
        .speaker-emoji {
          font-size: 20px;
          color: var(--bg-dark);
        }
        .audio-overlay-text {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-white);
          letter-spacing: 0.05em;
        }

        /* Audio visualizer wave rings expanding outward */
        .audio-visualizer-rings {
          position: absolute;
          width: 280px;
          height: 280px;
          z-index: 1;
          pointer-events: none;
        }
        .ring {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2.5px solid rgba(var(--accent-rgb), 0.6);
          border-radius: 50%;
          animation: ringExpand 2s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
        }
        .ring-2 { animation-delay: 0.6s; }
        .ring-3 { animation-delay: 1.2s; }

        /* Equalizer bars showing audio activity */
        .speaking-audio-bars {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 5;
          background: rgba(7, 7, 11, 0.75);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--border-glass);
          backdrop-filter: blur(4px);
        }
        .equalizer-bar {
          width: 3.5px;
          height: 20px;
          background-color: var(--accent);
          border-radius: 2px;
          transform-origin: bottom;
          animation: equalizerPlay 1.2s ease-in-out infinite alternate;
          box-shadow: 0 0 5px var(--accent);
        }
        .bar-1 { animation-delay: 0.1s; animation-duration: 0.9s; }
        .bar-2 { animation-delay: 0.3s; animation-duration: 1.3s; }
        .bar-3 { animation-delay: 0.0s; animation-duration: 1.1s; }
        .bar-4 { animation-delay: 0.4s; animation-duration: 0.8s; }

        /* Pulse animations during speaking */
        .hero-profile-image-container.speaking {
          animation: avatarPulse 2s infinite ease-in-out;
          border-color: var(--accent);
          box-shadow: 0 0 25px rgba(var(--accent-rgb), 0.5);
        }
        .hero-image-glow-ring.speaking {
          filter: blur(36px);
          opacity: 0.55;
          transform: scale(1.1);
        }

        @keyframes ringExpand {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
        @keyframes equalizerPlay {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.1); }
        }
        @keyframes avatarPulse {
          0% { transform: scale(1.0); }
          50% { transform: scale(1.025); }
          100% { transform: scale(1.0); }
        }
        @keyframes pulseIcon {
          0% { transform: scale(0.95); box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.4); }
          100% { transform: scale(1.05); box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.7); }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        @keyframes blink {
          from, to { color: transparent }
          50% { color: var(--accent); }
        }
        @keyframes wave-hand {
          0% { transform: rotate( 0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }
        @keyframes pulseGlow {
          0% {
            transform: scale(0.95);
            opacity: 0.25;
          }
          100% {
            transform: scale(1.05);
            opacity: 0.45;
          }
        }
      `}</style>
    </section>
  );
}

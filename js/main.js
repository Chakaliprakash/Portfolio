/**
 * MAIN INTERACTIVITY & ARCHITECTURE ENGINE - PRAKASH CHAKALI PORTFOLIO
 * Features:
 * - Custom Glowing Cursor with Magnetic Effect
 * - Typing Animation
 * - 3D Card Physics Tilt
 * - Animated Stats Counters (Intersection Observer)
 * - Interactive System Architecture Modals
 * - Full Developer CLI Terminal Simulator
 * - Synthesizer Sound Feedback (Web Audio API)
 * - Copy-to-Clipboard & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -----------------------------------------------------------------
  // 1. CUSTOM GLOWING CURSOR (Desktop)
  // -----------------------------------------------------------------
  const cursor = document.getElementById('custom-cursor');
  const trailer = document.getElementById('cursor-trailer');

  if (cursor && trailer && window.innerWidth > 1024) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailerX = mouseX;
    let trailerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function renderCursorTrailer() {
      trailerX += (mouseX - trailerX) * 0.15;
      trailerY += (mouseY - trailerY) * 0.15;
      trailer.style.left = `${trailerX}px`;
      trailer.style.top = `${trailerY}px`;
      requestAnimationFrame(renderCursorTrailer);
    }
    renderCursorTrailer();

    document.querySelectorAll('a, button, .magnetic, .skill-tag, .project-card, .pillar-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // -----------------------------------------------------------------
  // 2. TYPING TEXT ANIMATION
  // -----------------------------------------------------------------
  const typedTextEl = document.getElementById('typed-text');
  const phrases = [
    'Enterprise Java & Spring Boot Systems',
    'Autonomous Spring AI Agents & Tool Calling',
    'Stateless JWT E-Commerce Architectures',
    'Optimized MySQL & PostgreSQL Databases',
    'Cloud REST APIs & Chrome Extensions'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 75;
  const deletingSpeed = 35;
  const holdDelay = 1900;

  function typeEffect() {
    if (!typedTextEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delta = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delta = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delta = 400;
    }

    setTimeout(typeEffect, delta);
  }
  typeEffect();

  // -----------------------------------------------------------------
  // 3. 3D CARD TILT EFFECT (Vanilla JS Physics)
  // -----------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt], .tech-card-hero');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // -----------------------------------------------------------------
  // 4. ANIMATED STAT COUNTERS (Intersection Observer)
  // -----------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const decimal = parseInt(stat.getAttribute('data-decimal') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 35;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = (decimal > 0 ? current.toFixed(decimal) : Math.floor(current)) + suffix;
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.section-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // -----------------------------------------------------------------
  // 5. SYSTEM ARCHITECTURE MODALS ("VIEW ARCHITECTURE")
  // -----------------------------------------------------------------
  const archModal = document.getElementById('arch-modal');
  const archModalTitle = document.getElementById('arch-modal-title');
  const archModalBody = document.getElementById('arch-modal-body');
  const archModalClose = document.getElementById('arch-modal-close');

  const archData = {
    'ai-agent': {
      title: 'Personal AI Agent — Architecture & Tool Pipeline',
      content: `
        <p style="color: var(--text-sub); margin-bottom: 16px; font-size: 0.95rem;">
          A Spring Boot 3.x intelligent agent architecture featuring stateful session context, 
          MySQL conversation persistence, and autonomous tool calling.
        </p>
        <div class="arch-flow-diagram">
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-desktop"></i> Client Chat Interface</div>
            <span class="arch-node-tech">REST / JSON Payload</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-shield-halved"></i> Spring Boot Controller Layer</div>
            <span class="arch-node-tech">@RestController / Session Interceptor</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-robot"></i> Spring AI & Tool Calling Engine</div>
            <span class="arch-node-tech">Weather, Notes, To-Do Function Calling</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-database"></i> MySQL Conversation History Storage</div>
            <span class="arch-node-tech">Persistent Context Memory / JPA</span>
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #a3e635;">
          ✓ Verified: Enables LLM to act on tasks rather than just responding with text.
        </div>
      `
    },
    'ecommerce': {
      title: 'Ecommerce Platform — Controller-Service-Repository Flow',
      content: `
        <p style="color: var(--text-sub); margin-bottom: 16px; font-size: 0.95rem;">
          Production-style modular 3-tier enterprise architecture with JWT stateless auth, 
          MySQL transactional data consistency, and an AI Support Chatbot.
        </p>
        <div class="arch-flow-diagram">
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-brands fa-react"></i> React Single Page App</div>
            <span class="arch-node-tech">Client-Side State & JWT Headers</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-lock"></i> Spring Security & JWT Auth Filter</div>
            <span class="arch-node-tech">Bearer Token Validation / Role Guards</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-leaf"></i> Service Layer & Support Chatbot</div>
            <span class="arch-node-tech">Business Logic, Cart, Orders & Real-Time AI</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-server"></i> MySQL Database & JPA Repositories</div>
            <span class="arch-node-tech">ACID Transactions & Catalog Storage</span>
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #38bdf8;">
          ✓ Architecture: Controller-Service-Repository pattern for maximum scalability and test isolation.
        </div>
      `
    },
    'ai-email': {
      title: 'AI Email Generator — Browser Extension & Cloud Pipeline',
      content: `
        <p style="color: var(--text-sub); margin-bottom: 16px; font-size: 0.95rem;">
          End-to-end contextual email generation system integrating a client Chrome extension 
          with cloud-hosted Spring Boot REST APIs on Render.
        </p>
        <div class="arch-flow-diagram">
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-brands fa-chrome"></i> Chrome Browser Extension</div>
            <span class="arch-node-tech">In-Context UI / Content Scripts</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-network-wired"></i> Spring Boot REST Endpoints</div>
            <span class="arch-node-tech">Email Context, Tone & Prompt Normalizer</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-wand-magic-sparkles"></i> LLM API Completion Service</div>
            <span class="arch-node-tech">High-Precision Contextual Draft Generation</span>
          </div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i></div>
          <div class="arch-node-box">
            <div class="arch-node-title"><i class="fa-solid fa-cloud"></i> Render Cloud Deployment</div>
            <span class="arch-node-tech">Automated CI/CD via render.yaml</span>
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; color: #a855f7;">
          ✓ Deployment: Declarative cloud orchestration with Render automated pipelines.
        </div>
      `
    }
  };

  document.querySelectorAll('.view-arch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      if (archData[projKey]) {
        archModalTitle.textContent = archData[projKey].title;
        archModalBody.innerHTML = archData[projKey].content;
        archModal.classList.add('open');
        playBeep(750, 'triangle', 0.08);
      }
    });
  });

  if (archModalClose) {
    archModalClose.addEventListener('click', () => archModal.classList.remove('open'));
  }

  if (archModal) {
    archModal.addEventListener('click', (e) => {
      if (e.target === archModal) archModal.classList.remove('open');
    });
  }

  // -----------------------------------------------------------------
  // 6. SYNTHESIZER SOUND FEEDBACK (Web Audio API)
  // -----------------------------------------------------------------
  let soundEnabled = false;
  let audioCtx = null;
  const soundToggleBtn = document.getElementById('sound-toggle');

  function playBeep(freq = 600, type = 'sine', duration = 0.06) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const icon = soundToggleBtn.querySelector('i');
      if (soundEnabled) {
        icon.className = 'fa-solid fa-volume-high';
        soundToggleBtn.style.borderColor = 'var(--accent-emerald)';
        soundToggleBtn.style.color = 'var(--accent-emerald)';
        playBeep(800, 'triangle', 0.1);
        showToast('Audio Feedback Activated');
      } else {
        icon.className = 'fa-solid fa-volume-xmark';
        soundToggleBtn.style.borderColor = 'var(--border-glow)';
        soundToggleBtn.style.color = 'var(--text-sub)';
        showToast('Audio Feedback Muted');
      }
    });
  }

  document.querySelectorAll('button, a, .skill-tag, .contact-row').forEach(el => {
    el.addEventListener('mouseenter', () => playBeep(450, 'sine', 0.04));
    el.addEventListener('click', () => playBeep(880, 'triangle', 0.08));
  });

  // -----------------------------------------------------------------
  // 7. COPY TO CLIPBOARD & TOAST NOTIFICATION
  // -----------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.copyable-text').forEach(item => {
    item.addEventListener('click', () => {
      const textToCopy = item.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          playBeep(1000, 'sine', 0.1);
        }).catch(() => {
          showToast('Failed to copy');
        });
      }
    });
  });

  // -----------------------------------------------------------------
  // 8. NAVBAR SCROLL & ACTIVE LINK SPY
  // -----------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // -----------------------------------------------------------------
  // 9. INTERACTIVE DEVELOPER CLI TERMINAL
  // -----------------------------------------------------------------
  const terminalModal = document.getElementById('terminal-modal');
  const terminalTrigger = document.getElementById('terminal-trigger');
  const termCloseBtn = document.getElementById('term-close-btn');
  const termClearBtn = document.getElementById('term-clear-btn');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  function openTerminal() {
    terminalModal.classList.add('open');
    terminalInput.focus();
    playBeep(700, 'triangle', 0.1);
  }

  function closeTerminal() {
    terminalModal.classList.remove('open');
  }

  if (terminalTrigger) terminalTrigger.addEventListener('click', openTerminal);
  if (termCloseBtn) termCloseBtn.addEventListener('click', closeTerminal);
  if (termClearBtn) {
    termClearBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '<div class="term-line output">Terminal cleared. Type <span class="term-cmd-highlight">help</span> for available commands.</div>';
    });
  }

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  const termCommands = {
    help: () => `Available commands:
  • <span class="term-cmd-highlight">about</span>          - Bio & core Java engineering pillars
  • <span class="term-cmd-highlight">skills</span>         - Technical skills matrix & tech stack
  • <span class="term-cmd-highlight">projects</span>       - Summary of Personal AI Agent, Ecommerce & Email Gen
  • <span class="term-cmd-highlight">dsa</span>            - Data structures & problem solving track
  • <span class="term-cmd-highlight">education</span>      - B.Tech details & academic milestones
  • <span class="term-cmd-highlight">certifications</span> - GeeksforGeeks & Smart Interviews credentials
  • <span class="term-cmd-highlight">contact</span>        - Email, phone, location & profiles
  • <span class="term-cmd-highlight">clear</span>          - Clear terminal display
  • <span class="term-cmd-highlight">exit</span>           - Exit terminal session`,

    about: () => `<strong>Prakash Chakali</strong>
Position: Java Software Engineer | Backend Developer
Location: Hyderabad, Telangana, India
Summary: Focused on building reliable Java & Spring Boot backend systems, Spring AI tool integrations, and Controller-Service-Repository architectures.`,

    skills: () => `<strong>Technical Skills:</strong>
• Languages: Java 17+, SQL (MySQL, PostgreSQL), JavaScript
• Backend: Spring Boot, Spring AI, Spring Security, Lang4j, RESTful APIs, JWT
• AI & Agents: AI Agent Development, Tool/Function Calling, Prompt Eng, RAG
• Frontend & Tools: HTML5, CSS3, React, Chrome Extension APIs, Git, Render`,

    projects: () => `<strong>Verified Projects:</strong>
1. <strong>Personal AI Agent</strong>: Spring Boot + Spring AI with conversation memory & function calling tools.
2. <strong>Ecommerce Web Application</strong>: Full-stack platform with JWT security, MySQL & real-time support chatbot.
3. <strong>AI Email Generator</strong>: Full-stack LLM email generation tool + Chrome extension + Render deploy.`,

    dsa: () => `<strong>Problem Solving & DSA:</strong>
• Smart Interviews — DSA in Java Certified
• Topics: Arrays, Strings, Binary Search, Trees, Graphs, Dynamic Programming, Complexity Optimization.`,

    education: () => `<strong>Education:</strong>
• <strong>Sri Indu College of Engineering & Technology</strong> (Jul 2022 – Jul 2026)
  B.Tech in Computer Science (CS)
  Current CGPA: 7.6 / 10 | Class XII: 80.8% | Class X: 100%`,

    certifications: () => `<strong>Certifications:</strong>
1. SQL + Java Backend Course – GeeksforGeeks
2. Smart Interviews – Data Structures & Algorithms in Java`,

    github: () => `<strong>GitHub Profile:</strong> <a href="https://github.com/Chakaliprakash" target="_blank" style="color:var(--accent-cyan);">https://github.com/Chakaliprakash</a>`,

    repo: () => `<strong>Portfolio Repository:</strong> <a href="https://github.com/Chakaliprakash/Portfolio" target="_blank" style="color:var(--accent-cyan);">https://github.com/Chakaliprakash/Portfolio</a>`,

    resume: () => {
      window.print();
      return `Opening print-optimized resume dialog...`;
    },

    contact: () => `<strong>Contact Details:</strong>
• Email: <a href="mailto:prakashchakali6216@gmail.com" style="color:var(--accent-cyan);">prakashchakali6216@gmail.com</a>
• Phone: <a href="tel:+916302714896" style="color:var(--accent-cyan);">+91 6302714896</a>
• GitHub: <a href="https://github.com/Chakaliprakash" target="_blank" style="color:var(--accent-cyan);">@Chakaliprakash</a>
• Location: Hyderabad, Telangana, India`,

    whoami: () => `prakash_chakali (Java Backend Software Engineer)`,

    date: () => new Date().toLocaleString(),

    exit: () => {
      setTimeout(closeTerminal, 300);
      return 'Terminating session...';
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        if (!inputVal) return;

        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">prakash@dev:~$</span> <span>${escapeHtml(inputVal)}</span>`;
        terminalBody.appendChild(cmdLine);

        const responseLine = document.createElement('div');
        responseLine.className = 'term-line output';

        if (inputVal === 'clear') {
          terminalBody.innerHTML = '';
        } else if (termCommands[inputVal]) {
          responseLine.innerHTML = termCommands[inputVal]();
          terminalBody.appendChild(responseLine);
        } else {
          responseLine.innerHTML = `<span style="color:#f43f5e;">Command '${escapeHtml(inputVal)}' not recognized. Type <span class="term-cmd-highlight">'help'</span> for list of commands.</span>`;
          terminalBody.appendChild(responseLine);
        }

        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
        playBeep(520, 'sine', 0.05);
      }
    });
  }

  // Global Escape key listener to dismiss modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (terminalModal && terminalModal.classList.contains('open')) {
        closeTerminal();
      }
      if (archModal && archModal.classList.contains('open')) {
        archModal.classList.remove('open');
      }
    }
  });
});

// Contact Form Handler (Web3Forms Direct Email Integration)
window.handleContactSubmit = async function () {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  const contactForm = document.getElementById('contact-form');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
  feedback.className = 'form-feedback';
  feedback.style.display = 'none';

  const accessKeyInput = document.getElementById('web3forms-access-key');
  const accessKey = accessKeyInput ? accessKeyInput.value.trim() : 'YOUR_ACCESS_KEY_HERE';

  // If user hasn't added their custom Web3Forms access key yet, provide direct fallback
  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.innerHTML = `Thank you, <strong>${escapeHtml(name)}</strong>! Please insert your free Web3Forms Access Key to auto-deliver to Gmail, or click <a href="mailto:prakashchakali6216@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}" style="color:var(--accent-cyan); text-decoration:underline;">here to send immediately via email</a>.`;
      contactForm.reset();
    }, 700);
    return;
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `New Portfolio Message from ${name}`,
        from_name: 'Prakash Portfolio Contact Form'
      })
    });

    const result = await response.json();

    if (response.status === 200 && result.success) {
      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHtml(name)}</strong>! Your message has been sent directly to Prakash's inbox.`;
      contactForm.reset();
    } else {
      feedback.className = 'form-feedback error';
      feedback.style.display = 'block';
      feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${result.message || 'Submission error. Please email directly to prakashchakali6216@gmail.com'}`;
    }
  } catch (err) {
    feedback.className = 'form-feedback error';
    feedback.style.display = 'block';
    feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please email directly to <a href="mailto:prakashchakali6216@gmail.com" style="color:var(--accent-cyan);">prakashchakali6216@gmail.com</a>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
  }
};

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

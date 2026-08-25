# 🌐 3D Responsive Portfolio - Prakash Chakali

An interactive, responsive 3D developer portfolio website built for **Prakash Chakali** (Software Engineer — Java Developer & AI Engineer).

---

## ✨ Features

- **Interactive 3D WebGL Canvas**: Powered by **Three.js** featuring a dynamic particle constellation, floating wireframe geometries (icosahedron, octahedron, torus ring), and mouse parallax tracking.
- **3D Tilt Cards**: Glassmorphism cards with realistic perspective hover physics and glow effects.
- **Interactive Developer CLI Terminal**: Built-in modal terminal simulator (`help`, `skills`, `projects`, `education`, `contact`, `whoami`).
- **Synthesizer Sound Feedback**: Built using the native Web Audio API (no external sound files required) with sound mute/enable toggle.
- **Comprehensive Resume Showcase**:
  - **Education**: B.Tech CS at Sri Indu College of Engineering & Technology (CGPA: 7.6 / 10).
  - **Featured Projects**:
    1. *AI Email Generator* (Spring Boot, LLM API, Chrome Extension, Render Cloud).
    2. *Ecommerce Web Application* (Spring Boot REST APIs, React, MySQL, JWT Auth, AI Chatbot).
  - **Skill Matrix**: Java, SQL, Spring Boot, Spring AI, Lang4j, LLMs & Agents, React, Chrome Extension APIs.
  - **Certifications**: GeeksforGeeks (SQL + Java Backend), Smart Interviews (DSA in Java).
- **Responsive & Accessible**: Optimized for mobile, tablet, laptop, and ultra-wide screens.

---

## 📁 Project Structure

```
Portfolio/
├── index.html            # Main HTML5 semantic structure
├── css/
│   └── style.css         # Glassmorphism, 3D CSS transforms, cyber-aurora theme
├── js/
│   ├── three-scene.js    # Three.js 3D WebGL background & particle network
│   └── main.js           # Typing animation, 3D tilt, terminal CLI & UI logic
├── src/
│   └── Main.java         # Hello World Java starter application
└── README.md             # Project documentation
```

---

## 🚀 How to View & Run

### 1. View the 3D Portfolio Website
Simply double-click or open `index.html` in any web browser:
- Direct file path: `C:/Users/vicky/.gemini/antigravity/scratch/Portfolio/index.html`

Or serve it with any lightweight HTTP server:
```powershell
# Python
python -m http.server 8000

# Or Node npx
npx serve .
```

### 2. Run the Java Program
From the `Portfolio` root folder:
```powershell
# Quick Run (Java 11+)
java src/Main.java

# Or compile and run
javac -d bin src/Main.java
java -cp bin Main
```

---

## 📬 Contact Details
- **Developer**: Prakash Chakali
- **Email**: `prakashchakali6216@gmail.com`
- **Phone**: `+91 6302714896`
- **Location**: Hyderabad, Telangana, India

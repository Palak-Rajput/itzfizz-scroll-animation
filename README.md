# 🏎️ ITZFIZZ Digital // Scroll-Driven Hero Section Animation

> **Submission for Itzfizz Digital Web Development Internship Evaluation (6 Months)**  
> **Candidate:** Palak Rajput ([palakrajput8170@gmail.com](mailto:palakrajput8170@gmail.com))  
> **Reference Inspiration:** [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🌟 Live Demo & Repository
- **Live Demo Link:** `https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/`
- **GitHub Repository Link:** `https://github.com/Palak-Rajput/itzfizz-scroll-animation`

---

## 📌 Project Overview & Objectives
This project is an advanced, production-grade recreation of the scroll-driven hero section animation designed for **Itzfizz Digital**. Built using vanilla web technologies and **GSAP ScrollTrigger**, it demonstrates smooth 60 FPS hardware-accelerated motion, responsive layout scaling, dynamic letter collision lighting, interactive telemetry, and real-time Web Audio API sound synthesis.

---

## ✅ Functional Requirements Compliance

| # | Requirement | Implementation Status | Details |
|---|---|:---:|---|
| **1** | **Hero Section Layout** | **Completed** | Full above-the-fold viewport with letter-spaced `WELCOME ITZFIZZ` and 4 distinct floating impact metric cards. |
| **2** | **Initial Load Animation** | **Completed** | Orchestrated GSAP timeline reveals the header, executes staggered letter reveal, car pit-entry, HUD ignition, and subtle metric cards entrance. |
| **3** | **Scroll-Based Animation (Core)** | **Completed** | Buttery smooth momentum scrub (`scrub: 1.2`) pinning the hero canvas, translating the McLaren 720S, expanding a neon exhaust trail, dynamically illuminating letters on proximity, and activating metric count-ups. |
| **4** | **Motion & Performance** | **Completed** | Zero layout thrashing (`requestAnimationFrame`, pre-cached letter offsets, 100% GPU `transform` and `opacity` properties, live 60 FPS monitor). |
| **5** | **Responsive Design** | **Completed** | Scales seamlessly across ultrawide monitors, desktop laptops, tablets, and mobile screens. |
| **6** | **GitHub Pages Deployment** | **Completed** | Zero build step required — pure vanilla architecture ready for instant 1-click GitHub Pages deployment. |

---

## 🚀 Key Engineering & Motion Features

### 1. 🏎️ McLaren 720S Pinned Highway & Scrubbing
- **Interpolated Momentum:** Uses GSAP ScrollTrigger with `scrub: 1.2` for realistic vehicular acceleration and deceleration without jerky motion.
- **Micro-Inertia Tilt:** The vehicle exhibits dynamic pitch angle based on scroll velocity.
- **Volumetric Headlight Projection:** Dual forward-facing cones of light illuminate upcoming road segments and headline text.
- **Neon Exhaust Trail:** Dynamic gradient energy beam expanding seamlessly from the rear bumper to the track origin.

### 2. 💡 Real-Time Spatial Letter Collision
- As the vehicle travels along the road, the lead edge of the car calculates real-time proximity against pre-cached spatial coordinates for each letter in **`WELCOME ITZFIZZ`**.
- Letters smoothly transition from dormant outline state to **`illuminated`** white, and ignite into **`hyper-glow`** neon when in direct contact with the McLaren body.

### 3. 📊 Dynamic Impact Metric Cards & Count-Up Counters
- Four glassmorphic metric cards (`58%`, `23%`, `94%`, `40%`) animate in at specific scroll milestones.
- Numeric counters smoothly count up from `0%` to their target values via GSAP tween interpolation.

### 4. 🎛️ Interactive Cockpit HUD & Web Audio API
- **Live Telemetry HUD:** Displays real-time speed in MPH calculated directly from user scroll velocity, along with active gear shifting (`N`, `1ST`, `2ND`, `3RD`, `4TH`, `5TH`, `6TH`).
- **Autopilot Demo Mode:** Allows one-click automated scrolling across the full sequence.
- **Synthesized Twin-Turbo V8 Engine Sound:** Pure native browser Web Audio API oscillator nodes that pitch-shift with scroll speed — zero external audio files required.

---

## 📂 Project Directory Structure

```plaintext
├── index.html                           # Semantic HTML5 markup, telemetry HUD, metrics & specs
├── style.css                            # Modern dark luxury design system, responsive breakpoints, neon effects
├── script.js                            # GSAP 3 + ScrollTrigger logic, spatial matrices, audio synth
├── assets/
│   ├── car.png                          # High-resolution McLaren 720S top-view transparent PNG
│   └── mclaren.png                      # Backup asset reference
├── McLaren_720S_2022_top_view.png       # Original source vehicle asset
└── README.md                            # Comprehensive documentation & deployment guide
```

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Palak-Rajput/itzfizz-scroll-animation.git
   cd itzfizz-scroll-animation
   ```

2. **Serve with any local HTTP server:**
   - With Python:
     ```bash
     python -m http.server 5173
     ```
   - With Node / npx:
     ```bash
     npx serve .
     ```
   - Or simply open `index.html` in any modern web browser.

---

---

## 📬 Contact & Candidate Information
- **Candidate:** Palak Rajput
- **Email:** [palakrajput8170@gmail.com](mailto:palakrajput8170@gmail.com)
- **Role:** Web Development Intern (6 Months)
- **Company:** Itzfizz Digital

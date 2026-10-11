/**
 * Itzfizz Digital - Frontend Internship Assignment
 * Candidate: Palak Rajput
 * Feature: Scroll-Driven Hero Section Animation (McLaren 720S)
 * Built with: Vanilla JS, GSAP 3, ScrollTrigger, Web Audio API
 */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const car = document.getElementById('carWrapper');
  const trail = document.getElementById('trail');
  const letters = gsap.utils.toArray('.value-letter:not(.word-gap)');
  const valueAdd = document.querySelector('.value-add');
  const progressBar = document.getElementById('progress-bar');
  const telemetrySpeed = document.getElementById('telemetrySpeed');
  const telemetryGear = document.getElementById('telemetryGear');
  const telemetryProgress = document.getElementById('telemetryProgress');
  const fpsDisplay = document.getElementById('fpsDisplay');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const autoPlayBtn = document.getElementById('autoPlayBtn');

  // Calculate coordinates
  let valueRect = valueAdd.getBoundingClientRect();
  let letterOffsets = letters.map((letter) => letter.offsetLeft);
  let roadWidth = window.innerWidth;
  let carWidth = car ? (car.offsetWidth || 260) : 260;

  function updateMetrics() {
    valueRect = valueAdd.getBoundingClientRect();
    letterOffsets = letters.map((letter) => letter.offsetLeft);
    roadWidth = window.innerWidth;
    carWidth = car ? (car.offsetWidth || 260) : 260;
  }
  window.addEventListener('resize', () => {
    updateMetrics();
    ScrollTrigger.refresh();
  });
  updateMetrics();

  // -------------------------------------------------------------
  // 1. INITIAL LOAD ANIMATION (Requirement 2)
  // On page load:
  // - Headline appears smoothly (staggered reveal + fade)
  // - Statistics animate in one by one with a subtle delay
  // -------------------------------------------------------------
  const introTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  introTL.from('.navbar', {
    y: -70,
    opacity: 0,
    duration: 0.8
  });

  introTL.from(letters, {
    y: 25,
    opacity: 0,
    stagger: 0.04,
    duration: 0.8,
    ease: 'back.out(1.4)'
  }, '-=0.4');

  introTL.from('.telemetry-item, .stage-badge, .scroll-indicator', {
    opacity: 0,
    y: 12,
    stagger: 0.08,
    duration: 0.5
  }, '-=0.3');

  // Statistics animate in one by one with subtle delay
  introTL.to('.stat-card', {
    opacity: 0.35,
    y: 0,
    stagger: 0.15,
    duration: 0.6
  }, '-=0.2');

  // -------------------------------------------------------------
  // 2. SCROLL-BASED CAR ANIMATION (Requirement 3 & 4)
  // -------------------------------------------------------------
  let targetSpeed = 0;
  let currentSpeed = 0;

  gsap.to(car, {
    scrollTrigger: {
      trigger: '#heroSection',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      pin: '#heroTrack',
      onUpdate: (self) => {
        const progress = self.progress;

        // Progress bar & HUD
        progressBar.style.width = `${progress * 100}%`;
        telemetryProgress.textContent = `${Math.round(progress * 100)}%`;

        // Car position & Trail
        const currentCarX = gsap.getProperty(car, 'x');
        const carHeadX = currentCarX + carWidth * 0.95;
        const carRearX = currentCarX + 35;
        gsap.set(trail, { width: Math.max(0, carRearX) });

        // Letter illumination as car passes
        letters.forEach((letter, i) => {
          const letterX = valueRect.left + letterOffsets[i];
          if (carHeadX >= letterX) {
            letter.classList.add('illuminated');
            if (currentCarX <= letterX && (currentCarX + carWidth) >= letterX) {
              letter.classList.add('hyper-glow');
            } else {
              letter.classList.remove('hyper-glow');
            }
          } else {
            letter.classList.remove('illuminated', 'hyper-glow');
          }
        });

        // Speedometer velocity
        const velocity = Math.abs(self.getVelocity() || 0);
        targetSpeed = Math.min(218, Math.round((velocity / 28) + (progress * 75)));

        // Transmission
        let gear = 'N';
        if (progress > 0.02 && progress <= 0.22) gear = '1ST';
        else if (progress > 0.22 && progress <= 0.42) gear = '2ND';
        else if (progress > 0.42 && progress <= 0.62) gear = '3RD';
        else if (progress > 0.62 && progress <= 0.82) gear = '4TH';
        else if (progress > 0.82 && progress < 0.98) gear = '5TH';
        else if (progress >= 0.98) gear = 'TOP (6TH)';
        telemetryGear.textContent = gear;

        // Sound Throttle
        if (soundEngine.isPlaying) {
          soundEngine.updateThrottle(progress, velocity);
        }
      }
    },
    x: () => window.innerWidth - (car.offsetWidth * 0.72),
    ease: 'none'
  });

  // Stat boxes animations with counting numbers
  const boxes = [
    { id: '#box1', target: 58, progress: '85%', startOffset: 250, endOffset: 650 },
    { id: '#box2', target: 23, progress: '72%', startOffset: 550, endOffset: 950 },
    { id: '#box3', target: 94, progress: '94%', startOffset: 850, endOffset: 1250 },
    { id: '#box4', target: 40, progress: '65%', startOffset: 1150, endOffset: 1550 }
  ];

  boxes.forEach((b) => {
    const el = document.querySelector(b.id);
    if (!el) return;
    const numEl = el.querySelector('.stat-number');
    const fillEl = el.querySelector('.stat-progress-fill');
    let hasCounted = false;

    gsap.to(el, {
      scrollTrigger: {
        trigger: '#heroSection',
        start: `top+=${b.startOffset} top`,
        end: `top+=${b.endOffset} top`,
        scrub: true,
        onEnter: () => activate(),
        onEnterBack: () => activate(),
        onLeave: () => deactivate(),
        onLeaveBack: () => deactivate(),
      },
      opacity: 1,
    });

    function activate() {
      if (fillEl) fillEl.style.width = b.progress;
      if (!hasCounted) {
        hasCounted = true;
        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: b.target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (numEl) numEl.textContent = Math.round(countObj.val);
          }
        });
      }
    }

    function deactivate() {
      // return to subtle resting preview
    }
  });

  // Speedometer lerp
  function updateSpeedometer() {
    currentSpeed += (targetSpeed - currentSpeed) * 0.12;
    if (Math.abs(targetSpeed - currentSpeed) < 0.5) targetSpeed = 0;
    telemetrySpeed.textContent = Math.round(currentSpeed);
    requestAnimationFrame(updateSpeedometer);
  }
  updateSpeedometer();

  // -------------------------------------------------------------
  // 3. AUTOPILOT / DEMO MODE
  // -------------------------------------------------------------
  let isAutoPlaying = false;
  let autoPlayTween = null;

  if (autoPlayBtn) {
    autoPlayBtn.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        autoPlayBtn.classList.add('active');
        autoPlayBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          Pause Demo
        `;
        
        const scrollDistance = document.getElementById('heroSection').offsetHeight - window.innerHeight;
        autoPlayTween = gsap.to(window, {
          scrollTo: { y: scrollDistance, autoKill: true },
          duration: 9,
          ease: 'power1.inOut',
          onComplete: () => {
            stopAutoPlay();
          }
        });
      } else {
        stopAutoPlay();
      }
    });

    window.addEventListener('wheel', () => { if (isAutoPlaying) stopAutoPlay(); }, { passive: true });
    window.addEventListener('touchstart', () => { if (isAutoPlaying) stopAutoPlay(); }, { passive: true });
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayTween) autoPlayTween.kill();
    if (autoPlayBtn) {
      autoPlayBtn.classList.remove('active');
      autoPlayBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Autopilot Demo
      `;
    }
  }

  // -------------------------------------------------------------
  // 4. WEB AUDIO SYNTHESIS ENGINE
  // -------------------------------------------------------------
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.osc1 = null;
      this.subOsc = null;
      this.filterNode = null;
      this.gainNode = null;
      this.isPlaying = false;
    }

    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sawtooth';
        this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

        this.subOsc = this.ctx.createOscillator();
        this.subOsc.type = 'triangle';
        this.subOsc.frequency.setValueAtTime(25, this.ctx.currentTime);

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(220, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(3, this.ctx.currentTime);

        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);

        this.osc1.connect(this.filterNode);
        this.subOsc.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.osc1.start();
        this.subOsc.start();
        this.isPlaying = true;
      } catch (e) {
        console.warn('Web Audio not allowed or supported', e);
      }
    }

    updateThrottle(progress, velocity) {
      if (!this.ctx || !this.isPlaying) return;
      const baseFreq = 40 + (progress * 120) + Math.min(180, velocity / 15);
      this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, this.ctx.currentTime, 0.05);
      this.filterNode.frequency.setTargetAtTime(baseFreq * 3.5, this.ctx.currentTime, 0.05);
    }

    stop() {
      if (this.ctx) {
        this.ctx.close();
        this.isPlaying = false;
      }
    }
  }

  const soundEngine = new AudioEngine();

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!soundEngine.isPlaying) {
        soundEngine.init();
        audioToggleBtn.classList.add('active');
        audioToggleBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          Engine Sound [ON]
        `;
      } else {
        soundEngine.stop();
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
          Engine Sound [OFF]
        `;
      }
    });
  }

  // -------------------------------------------------------------
  // 5. REAL-TIME 60 FPS COUNTER
  // -------------------------------------------------------------
  let frameCount = 0;
  let lastTime = performance.now();

  function calcFPS(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      if (fpsDisplay) fpsDisplay.textContent = `${fps} FPS`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(calcFPS);
  }
  requestAnimationFrame(calcFPS);
});

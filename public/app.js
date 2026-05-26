/* ══════════════════════════════════════════════
   MONEDITO — app.js
   Features:
   · Carrusel de pantallas en el teléfono (swipe/drag)
   · Selector de temas (Rosa · Azul · Dark)
   · Cursor personalizado con efecto lag
   · Parallax en blobs del hero
   · Tilt 3D en tarjetas
   · Confetti en botones primarios
   · Scroll reveal
   · Counter animado en el balance
   · Nav shadow on scroll
   · Mobile menu
══════════════════════════════════════════════ */

/* ─── 1. NAV MOBILE ─────────────────────────── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.nav__burger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

/* ─── 2. NAV SHADOW ON SCROLL ───────────────── */
window.addEventListener('scroll', () => {
  document.querySelector('.nav').style.boxShadow =
    window.scrollY > 12 ? '0 2px 20px rgba(0,0,0,.09)' : '';
});

/* ─── 3. PHONE CAROUSEL ─────────────────────── */
class PhoneCarousel {
  constructor() {
    this.carousel = document.getElementById('phoneCarousel');
    this.track    = document.getElementById('phoneTrack');
    this.dotsEl   = document.getElementById('phoneDots');
    this.nameEl   = document.getElementById('screenName');
    if (!this.carousel) return;

    this.dots     = Array.from(this.dotsEl.querySelectorAll('.phone__dot'));
    this.current  = 0;
    this.total    = this.track.children.length;  // auto-detect screens
    this.startX   = 0;
    this.currentX = 0;
    this.dragging = false;
    this.names    = ['Dashboard', 'Mis metas', 'Gastos', 'Voz IA'];

    this.init();
  }

  init() {
    const el = this.carousel;

    // Touch
    el.addEventListener('touchstart', e => this.onStart(e.touches[0].clientX), { passive: true });
    el.addEventListener('touchmove',  e => {
      if (this.dragging) e.preventDefault();
      this.onMove(e.touches[0].clientX);
    }, { passive: false });
    el.addEventListener('touchend', () => this.onEnd());

    // Mouse
    el.addEventListener('mousedown', e => { e.preventDefault(); this.onStart(e.clientX); });
    window.addEventListener('mousemove', e => this.onMove(e.clientX));
    window.addEventListener('mouseup',   () => this.onEnd());

    // Dots
    this.dots.forEach(d => {
      d.addEventListener('click', () => {
        this.goTo(+d.dataset.index);
        this.stopAuto();
        this.startAuto();
      });
    });

    // Auto-play
    this.startAuto();

    // Swipe hint desaparece al primer swipe
    document.getElementById('swipeHint')?.addEventListener('click', () => {
      this.goTo(1);
    });
  }

  onStart(x) {
    this.startX   = x;
    this.currentX = x;
    this.dragging = true;
    this.carousel.classList.add('dragging');
    this.track.style.transition = 'none';
    this.stopAuto();
  }

  onMove(x) {
    if (!this.dragging) return;
    this.currentX = x;
    const diff    = this.startX - x;
    const pct     = -this.current * 100 - (diff / this.carousel.offsetWidth) * 100;
    const min     = -(this.total - 1) * 100;
    this.track.style.transform = `translateX(${Math.max(min, Math.min(0, pct))}%)`;
  }

  onEnd() {
    if (!this.dragging) return;
    this.dragging = false;
    this.carousel.classList.remove('dragging');

    const diff = this.startX - this.currentX;
    if (Math.abs(diff) > 45) {
      this.goTo(diff > 0 ? this.current + 1 : this.current - 1);
    } else {
      this.goTo(this.current);  // snap back
    }

    // Ocultar swipe hint tras primer swipe
    const hint = document.getElementById('swipeHint');
    if (hint && Math.abs(diff) > 20) {
      hint.style.transition = 'opacity .4s';
      hint.style.opacity = '0';
    }

    this.startAuto();
  }

  goTo(index) {
    this.current = Math.max(0, Math.min(index, this.total - 1));
    this.track.style.transition = 'transform .45s cubic-bezier(.25,.46,.45,.94)';
    this.track.style.transform  = `translateX(-${this.current * 100}%)`;

    this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
    if (this.nameEl) this.nameEl.textContent = this.names[this.current] || '';

    // Animar barras del chart en pantalla 1 cuando está visible
    if (this.current === 0) this.animateBars();
  }

  animateBars() {
    document.querySelectorAll('.chart-bars .bar').forEach((b, i) => {
      const h = b.style.height;
      b.style.height = '0';
      setTimeout(() => { b.style.transition = 'height .5s ease'; b.style.height = h; }, i * 60);
    });
  }

  startAuto() {
    this.stopAuto();
    this.autoTimer = setInterval(() => this.goTo((this.current + 1) % this.total), 4200);
  }

  stopAuto() { clearInterval(this.autoTimer); }
}

/* ─── 4. SELECTOR DE TEMAS ──────────────────── */
class ThemeSwitcher {
  constructor() {
    this.btns = document.querySelectorAll('.ts-btn');
    this.body = document.body;
    this.current = 'pink';
    this.init();
  }

  init() {
    // Restaurar tema guardado
    const saved = localStorage.getItem('monedito-theme') || 'pink';
    this.apply(saved, false);

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        if (theme === this.current) return;
        this.apply(theme, true);
      });
    });
  }

  apply(theme, animate) {
    if (animate) {
      this.body.classList.add('theme-transitioning');
      setTimeout(() => this.body.classList.remove('theme-transitioning'), 650);
    }

    this.body.setAttribute('data-theme', theme);
    this.current = theme;
    localStorage.setItem('monedito-theme', theme);

    // Actualizar botón activo
    this.btns.forEach(b => b.classList.toggle('ts-btn--active', b.dataset.theme === theme));

    // Actualizar color del cursor
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const cursorDot = document.getElementById('cursorDot');
    if (cursorDot) cursorDot.style.background = primary;
  }
}

/* ─── 5. CURSOR PERSONALIZADO ───────────────── */
class CustomCursor {
  constructor() {
    this.cursor    = document.getElementById('cursor');
    this.dot       = document.getElementById('cursorDot');
    if (!this.cursor) return;

    this.mouseX = 0; this.mouseY = 0;
    this.cursorX = 0; this.cursorY = 0;
    this.visible = false;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Dot sigue inmediatamente
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top  = e.clientY + 'px';

      if (!this.visible) {
        this.visible = true;
        this.cursor.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('visible');
      this.visible = false;
    });

    // Hover effect
    const hoverEls = 'a, button, .feature-card, .tcard, .plan, .store-badge, .ts-btn, .phone__dot, .s-chip, .s-add-btn';
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
    });

    // Click effect
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('clicking');
      this.cursor.classList.remove('hovering');
    });
    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('clicking');
    });

    // RAF loop para el outer cursor con lag
    this.animate();
  }

  animate() {
    this.cursorX += (this.mouseX - this.cursorX) * 0.11;
    this.cursorY += (this.mouseY - this.cursorY) * 0.11;
    this.cursor.style.left = this.cursorX + 'px';
    this.cursor.style.top  = this.cursorY + 'px';
    requestAnimationFrame(() => this.animate());
  }
}

/* ─── 6. PARALLAX EN BLOBS ──────────────────── */
function initParallax() {
  const b1 = document.querySelector('.blob--1');
  const b2 = document.querySelector('.blob--2');
  const b3 = document.querySelector('.blob--3');
  if (!b1) return;

  let ticking = false;
  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      b1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      b2.style.transform = `translate(${-x * 0.35}px, ${-y * 0.35}px)`;
      b3.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      ticking = false;
    });
  });
}

/* ─── 7. TILT 3D EN TARJETAS ────────────────── */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const cx   = rect.width  / 2;
      const cy   = rect.height / 2;
      const rx   = ((y - cy) / cy) * -6;
      const ry   = ((x - cx) / cx) *  6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── 8. CONFETTI ───────────────────────────── */
function spawnConfetti(originX, originY) {
  const COLORS = ['#f472b6','#ec4899','#818cf8','#60a5fa','#34d399','#fbbf24','#f97316','#fb7185'];
  const count  = 32;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';

    const angle   = Math.random() * 2 * Math.PI;
    const speed   = 90 + Math.random() * 180;
    const dx      = Math.cos(angle) * speed;
    const dy      = Math.sin(angle) * speed - (100 + Math.random() * 100);
    const rot     = Math.random() * 720 - 360;
    const size    = 5 + Math.random() * 7;
    const color   = COLORS[Math.floor(Math.random() * COLORS.length)];
    const radius  = Math.random() > .5 ? '50%' : '2px';

    p.style.cssText = `
      left: ${originX}px;
      top:  ${originY}px;
      width:  ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${radius};
      --dx: ${dx}px;
      --dy: ${dy}px;
      --rot: ${rot}deg;
      animation-duration: ${.7 + Math.random() * .4}s;
      animation-delay: ${Math.random() * .1}s;
    `;

    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

function initConfetti() {
  document.querySelectorAll('.confetti-trigger').forEach(btn => {
    btn.addEventListener('click', e => spawnConfetti(e.clientX, e.clientY));
  });
}

/* ─── 9. SCROLL REVEAL ──────────────────────── */
function initReveal() {
  const targets = document.querySelectorAll(
    '.feature-card, .step, .tcard, .plan, .section-header, .trust, .swipe-hint'
  );
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); } });
  }, { threshold: 0.10 });

  targets.forEach(el => {
    el.classList.add('reveal');
    obs.observe(el);
  });
}

/* ─── 10. BALANCE COUNTER ───────────────────── */
function initCounter() {
  const el = document.getElementById('balanceAmount');
  if (!el) return;
  let triggered = false;

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !triggered) {
      triggered = true;
      const target = 24350;
      let val = 0;
      const step = Math.ceil(target / 55);
      const timer = setInterval(() => {
        val = Math.min(val + step, target);
        el.innerHTML = `$${val.toLocaleString('es-MX')}<small>.00</small>`;
        if (val >= target) clearInterval(timer);
      }, 22);
    }
  }, { threshold: 0.6 }).observe(el);
}

/* ─── 11. KEYBOARD NAVIGATION (ACCESIBILIDAD) ── */
function initKeyNav() {
  document.addEventListener('keydown', e => {
    const focused = document.activeElement;
    // Arrow keys en los dots del carrusel
    if (focused?.closest('.phone__dots')) {
      if (e.key === 'ArrowRight') carousel?.goTo(carousel.current + 1);
      if (e.key === 'ArrowLeft')  carousel?.goTo(carousel.current - 1);
    }
  });
}

/* ─── 12. SWIPE PHONE (GASTOS ↔ INGRESOS) ───── */
class SwipePhone {
  constructor() {
    this.track  = document.getElementById('swTrack');
    this.thumb  = document.getElementById('swThumb');
    this.label  = document.getElementById('swControlLabel');
    this.arrows = document.getElementById('swArrows');
    if (!this.track) return;

    this.mode        = document.body.getAttribute('data-mode') || 'gastos';
    this.startX      = 0;
    this.thumbX      = this.mode === 'ingresos' ? this.maxX : 0;
    this.startThumbX = this.thumbX;
    this.dragging    = false;

    this.init();
  }

  get maxX() {
    const tw = this.track.getBoundingClientRect().width || this.track.offsetWidth;
    const th = this.thumb.getBoundingClientRect().width || this.thumb.offsetWidth;
    return Math.max(tw - th - 12, 0);
  }

  init() {
    // Mouse
    this.thumb.addEventListener('mousedown',  e => { e.preventDefault(); this.onStart(e.clientX); });
    window.addEventListener('mousemove',      e => this.onMove(e.clientX));
    window.addEventListener('mouseup',        e => this.onEnd(e.clientX));

    // Touch
    this.thumb.addEventListener('touchstart', e => this.onStart(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove',      e => {
      if (this.dragging) { e.preventDefault(); this.onMove(e.touches[0].clientX); }
    }, { passive: false });
    window.addEventListener('touchend',       e => this.onEnd(e.changedTouches[0].clientX), { passive: true });
  }

  onStart(x) {
    this.startX      = x;
    this.startThumbX = this.thumbX;
    this.dragging    = true;
    this.thumb.style.transition = 'none';
  }

  onMove(x) {
    if (!this.dragging) return;
    const dx = x - this.startX;
    this.thumbX = Math.max(0, Math.min(this.startThumbX + dx, this.maxX));
    this.thumb.style.transform = `translateX(${this.thumbX}px)`;

    // Fade arrows as user swipes right
    const progress = this.thumbX / (this.maxX || 1);
    if (this.arrows) this.arrows.style.opacity = String(Math.max(0, 1 - progress * 1.8));
  }

  onEnd(x) {
    if (!this.dragging) return;
    this.dragging = false;
    this.thumb.style.transition = 'transform .38s cubic-bezier(.4,0,.2,1)';

    const progress = this.thumbX / (this.maxX || 1);
    this.setMode(progress > 0.48 ? 'ingresos' : 'gastos');
  }

  setMode(mode) {
    this.mode = mode;

    if (mode === 'ingresos') {
      this.thumbX = this.maxX;
      this.thumb.style.transform = `translateX(${this.maxX}px)`;
      if (this.arrows) this.arrows.style.opacity = '0';
    } else {
      this.thumbX = 0;
      this.thumb.style.transform = 'translateX(0)';
      if (this.arrows) this.arrows.style.opacity = '1';
    }

    if (this.label) {
      this.label.textContent = mode === 'ingresos' ? 'Ingresos' : 'Gastos';
    }

    // Cambia colores de toda la página
    document.body.classList.add('theme-transitioning');
    document.body.setAttribute('data-mode', mode);
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 650);
  }
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
let carousel;

document.addEventListener('DOMContentLoaded', () => {
  carousel = new PhoneCarousel();
  new ThemeSwitcher();
  new CustomCursor();
  new SwipePhone();
  initParallax();
  initTilt();
  initConfetti();
  initReveal();
  initCounter();
  initKeyNav();

  // Primer animación de barras
  setTimeout(() => carousel?.animateBars(), 800);
});

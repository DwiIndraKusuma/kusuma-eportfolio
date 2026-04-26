
/* ── Cursor ─────────────────────────── */
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
cx += (mx - cx) * 0.18;
cy += (my - cy) * 0.18;
cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, .portfolio-item, .skill-tag').forEach(el => {
el.addEventListener('mouseenter', () => cursor.classList.add('big'));
el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

/* ── Nav scroll ─────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Marquee clone ──────────────────── */
['marquee-tpl','marquee-tpl2'].forEach(id => {
const tpl = document.getElementById(id);
if (!tpl) return;
const inner = tpl.closest('.marquee-inner');
const clone = tpl.content.cloneNode(true);
const clone2 = tpl.content.cloneNode(true);
inner.appendChild(clone);
inner.appendChild(clone2);
tpl.remove();
});

/* ── Hero typewriter ────────────────── */
const phrases = ['& IT Analyst', '& Data Engineer', '& Problem Solver'];
let pi = 0, ci = 0, deleting = false;
const typed = document.getElementById('hero-typed');
function type() {
const word = phrases[pi];
if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
} else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
}
setTimeout(type, deleting ? 60 : 90);
}
type();

/* ── Scroll reveal ──────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Project hover preview ──────────── */
const preview = document.getElementById('proj-preview');
const previewImg = document.getElementById('proj-preview-img');
document.querySelectorAll('.portfolio-item[data-preview]').forEach(item => {
item.addEventListener('mouseenter', e => {
    previewImg.src = item.dataset.preview;
    preview.classList.add('show');
});
item.addEventListener('mouseleave', () => preview.classList.remove('show'));
item.addEventListener('mousemove', e => {
    preview.style.left = (e.clientX + 20) + 'px';
    preview.style.top  = (e.clientY - 90) + 'px';
});
});

/* ── Contact form ───────────────────── */
function handleSubmit(e) {
e.preventDefault();
e.target.style.opacity = '0.4';
setTimeout(() => {
    e.target.reset();
    e.target.style.opacity = '1';
    document.getElementById('form-success').style.display = 'block';
}, 600);
}

/* ── Smooth section number highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
let current = '';
sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#'+current ? '#F3FE00' : '';
});
});

/* ══════════════════════════════════════════
    LOADER LOGIC
══════════════════════════════════════════ */
(function() {
const loader  = document.getElementById('loader');
const bar     = document.getElementById('loader-bar');
const pct     = document.getElementById('loader-pct');
const wipe    = document.getElementById('loader-wipe');

// inject a dynamic <style> to control ::after clip-path
const fillStyle = document.createElement('style');
fillStyle.id = 'loader-fill-style';
fillStyle.textContent = '.loader-name::after { clip-path: inset(0 100% 0 0); }';
document.head.appendChild(fillStyle);

document.body.classList.add('loading');

let progress = 0;
const duration = 2400;
const startTime = performance.now();

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    progress = Math.round(easeOutExpo(t) * 100);

    // progress bar + counter
    bar.style.width = progress + '%';
    pct.textContent = progress + '%';

    // fill name text left-to-right
    const remaining = 100 - progress;
    fillStyle.textContent = `.loader-name::after { clip-path: inset(0 ${remaining}% 0 0); }`;

    if (t < 1) {
    requestAnimationFrame(tick);
    } else {
    // done — wipe transition
    setTimeout(() => {
        wipe.classList.add('go');
        setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        }, 700);
    }, 250);
    }
}

requestAnimationFrame(tick);
})();
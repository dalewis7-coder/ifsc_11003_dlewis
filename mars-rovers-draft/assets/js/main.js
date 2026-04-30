/* ============================================================
   NASA Mars Rovers – main.js
   ============================================================ */

// ── Dark / Light mode toggle ──────────────────────────────────
(function () {
    const STORAGE_KEY = 'mars-theme';
    const btn = document.getElementById('dark-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (btn) btn.textContent = '☾ DARK';
        } else {
            body.classList.remove('light-mode');
            if (btn) btn.textContent = '☼ LIGHT';
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }

    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyTheme(saved);

    if (btn) {
        btn.addEventListener('click', function () {
            const current = body.classList.contains('light-mode') ? 'light' : 'dark';
            applyTheme(current === 'light' ? 'dark' : 'light');
        });
    }
})();

// ── FAQ accordion ────────────────────────────────────────────
(function () {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;

        btn.addEventListener('click', function () {
            const isOpen = item.classList.contains('open');

            // Close all
            items.forEach(function (i) {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();

// ── Starfield canvas ─────────────────────────────────────────
(function () {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    const COUNT = 220;

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < COUNT; i++) {
            stars.push({
                x:    Math.random() * canvas.width,
                y:    Math.random() * canvas.height,
                r:    Math.random() * 1.2 + 0.2,
                a:    Math.random(),
                da:   (Math.random() - 0.5) * 0.003
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(function (s) {
            s.a += s.da;
            if (s.a < 0.1) s.da = Math.abs(s.da);
            if (s.a > 1)   s.da = -Math.abs(s.da);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(210, 220, 255, ${s.a})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    window.addEventListener('resize', function () {
        resize();
        initStars();
    });
})();

// Harshkumar Narendra — portfolio scripts
(function () {
    const root = document.documentElement;

    // --- Theme toggle (initial theme is applied inline in <head> to avoid a flash) ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = root.dataset.theme ||
                (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const next = current === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        });
    }

    // --- Mobile menu ---
    const menuBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-links');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', open);
        });
        menu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                menu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Reveal on scroll ---
    const items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach((el) => io.observe(el));
    } else {
        items.forEach((el) => el.classList.add('in'));
    }

    // --- Contact form (Formspree) ---
    const form = document.getElementById('contact-form');
    if (form) {
        const status = document.getElementById('form-status');
        const submit = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.className = 'form-status';
            status.textContent = 'Sending…';
            submit.disabled = true;
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                if (res.ok) {
                    status.classList.add('ok');
                    status.textContent = "Thanks, your message is on its way. I'll reply by email.";
                    form.reset();
                } else {
                    const data = await res.json().catch(() => ({}));
                    status.classList.add('err');
                    status.textContent = (data.errors && data.errors.map((x) => x.message).join(', ')) ||
                        'That didn’t send. Please try again or email me directly.';
                }
            } catch (err) {
                status.classList.add('err');
                status.innerHTML = 'Network error. Please <a href="mailto:harshnarendra07@gmail.com">email me directly</a>.';
            } finally {
                submit.disabled = false;
            }
        });
    }
})();

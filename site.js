/* =====================================================================
   Harshkumar Narendra — interactions (timings mirror the reference site)
   Requires: GSAP 3 + ScrollTrigger, Lenis
   ===================================================================== */

/* ---------- Project data (drives the work list, previews and case pages) ---------- */
window.PROJECTS = [
  { id: 'sales-analytics', title: 'Sales Analytics', cat: 'data', type: 'Data analytics · BI', stack: 'Python, PostgreSQL, Power BI', year: '2025',
    role: 'Personal project', tone: '#16307f',
    lead: 'Raw transaction data taken all the way to a dashboard a manager could use, doing each step properly.',
    sections: [
      ['What I did', ['Wrote a Python pipeline to clean the raw datasets and fill in missing values, so the reporting could be trusted.',
        'Loaded the cleaned data into PostgreSQL and reconciled it with window functions and CTEs.',
        'Modelled it in Power BI as a star schema: one sales fact table with customer, product, date and region dimensions.',
        'Used DAX variables and removed redundant columns and relationships to keep the report fast.']],
      ['What it showed', ['A small share of customers brings in a large share of total revenue.',
        'Returning customers spend more on average than new ones.']]],
    links: [['GitHub', 'https://github.com/harshnarendra07-ai/customer_behavior_analysis'],
      ['Download .pbix', 'https://1drv.ms/u/c/d13601dfe1b270ff/IQTe0o_hCLhxTbGRlRDvDA1JAVWQyZDhoQi6uGiPtGJZ9mM'],
      ['Analytics report', 'https://1drv.ms/p/c/d13601dfe1b270ff/IQSTqu4QUmf5RIac2jD5tnujAaiIwICgRmqqYuUdmcNguMU']] },
  { id: 'wecan', title: 'WeCanCIC', cat: 'software', type: 'Client work', stack: 'React, TypeScript, Supabase', year: '2026',
    role: 'Junior Consultant Intern, The Cloud Crew', tone: '#2f6bff',
    lead: 'WeCan collects empty cans, sells them for scrap and buys food for people in need. We won a hackathon working on their problems, then built their platform as interns.',
    sections: [
      ['The problem', ['The charity had no central place for volunteer sign-ups, community discussion or events.']],
      ['What we built', ['Gathered requirements with the client and delivered an MVP on Supabase: volunteer sign-up, a forum, an FAQ chatbot and points-based recognition.',
        'Released page by page in weekly sprints. I learned React and TypeScript in a month to build the front end, in a 3-developer team.',
        "Applied the Data Protection Act and GDPR to 300+ users' data, storing volunteer locations at city level unless signed in."]],
      ['Outcome', ['The client now runs the platform themselves and reports more volunteer engagement and social reach.']]],
    links: [['GitHub', 'https://github.com/gifted-debug/we_can_cic']] },
  { id: 'sky', title: 'Sky Directory', cat: 'software', type: 'Team lead · Full stack', stack: 'Django, Python, Bootstrap 5', year: '2025–26',
    role: 'Team lead, University of Westminster', tone: '#0b1a4a',
    lead: 'An engineering directory and meeting-scheduling app for Sky, built by a 6-person team over 12 weeks and presented to Sky engineers.',
    sections: [
      ['What I did', ['Led the team and designed the relational database and full logical ERD.',
        'Wrote a data-seeding script and safer local test databases to stop merge conflicts.',
        'Built the meeting-coordination backend with live alerts to teams when an event is created.']],
      ['Security & delivery', ['PBKDF2/SHA256 password hashing, login-protected routes and CSRF testing.',
        'Ran sprints on Trello and managed the Git repository, branches and merges.']]],
    links: [['GitHub', 'https://github.com/harshnarendra07-ai/westminster_group_project']] },
  { id: 'cheese', title: 'Cheese Forecast', cat: 'data', type: 'Data modelling', stack: 'Excel, Power Query, SQL', year: '—',
    role: 'Predictive data modelling', tone: '#b9ccff', image: 'images/projects/cheese_data_dashboard.png',
    lead: "A model for a UK cheese importer that forecasts profit and loss under different Euro–Pound exchange rates and economic conditions.",
    sections: [
      ['What I did', ['Built a multi-layered data model in Excel and SQL for historical analysis and forecasting.',
        'Built a prediction sheet that calculates future values automatically, removing manual recalculation from budgeting.',
        'Charted how the variables relate to support long-term budget planning.']]],
    links: [['GitHub', 'https://github.com/harshnarendra07-ai/cheese_forecasting_data_model'],
      ['Live Excel model', 'https://1drv.ms/x/c/d13601dfe1b270ff/IQSFA0HYPFdFRJjbdliA7fHlAU3WtcX0xI3jplRL35kQsCk'],
      ['Strategy deck', 'https://1drv.ms/p/c/d13601dfe1b270ff/IQQc73nuCjotQakJl2ZXN0NNAcGcb1z5KiVXAh1SNAc_mFo']] },
  { id: 'smart-campus', title: 'Smart Campus API', cat: 'software', type: 'Back end', stack: 'Java, JAX-RS, Maven', year: '2026',
    role: 'University of Westminster', tone: '#050a1f',
    lead: 'A RESTful API in Java managing the state and sensor readings of thousands of rooms and sensors on a simulated campus.',
    sections: [
      ['What I did', ['Custom exception mappers return clean 403, 409 and 422 responses instead of leaking errors.',
        "Sub-resource locators keep each sensor's latest reading in step when new readings are posted.",
        'HATEOAS discovery links, following REST conventions; tested end to end in Postman.']]],
    links: [['GitHub', 'https://github.com/harshnarendra07-ai/SmartCampusAPI']] },
  { id: 'trazer', title: 'Trazer', cat: 'hackathon', type: 'Hackathon · Finalist', stack: 'Research, LLMs, RAG', year: '2026',
    role: 'UK Parliament Hackathon (EasyA)', tone: '#1b2d6b',
    lead: 'Top 100 of 1,000+ applicants at the UK Parliament Hackathon, pitched inside the Houses of Parliament.',
    sections: [
      ['The idea', ["Parliament records what ministers promise but doesn't track whether it happens.",
        'Trazer pulls commitments out of Hansard debates and written answers, looks for later evidence, and marks each as fulfilled, in progress or no evidence found, with a source link.']],
      ['My part', ['Researched the idea and built and presented the pitch deck; a teammate built the data pipeline.']]],
    links: [] },
  { id: 'eurocontrol', title: 'EUROCONTROL', cat: 'data', type: 'Machine learning', stack: 'Python', year: 'Ongoing',
    role: 'EUROCONTROL Data Challenge', tone: '#7f8ab3',
    lead: 'Building a machine-learning model in Python to predict aircraft taxi-out times.',
    sections: [['Status', ['In progress. Write-up to follow.']]], links: [] }
];

(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);

  if (!hasGSAP) { const l = q('.loading-container'); if (l) l.remove(); }
  else gsap.registerPlugin(ScrollTrigger);

  /* ---------- Case page: render from data before anything animates ---------- */
  const caseRoot = q('#case');
  if (caseRoot) {
    const id = new URLSearchParams(location.search).get('p') || PROJECTS[0].id;
    const i = Math.max(0, PROJECTS.findIndex(p => p.id === id));
    const p = PROJECTS[i], next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.title} • Harshkumar Narendra`;
    document.body.dataset.label = p.title;
    q('#case-title').textContent = p.title;
    q('#case-meta').innerHTML = [['Role', p.role], ['Type', p.type], ['Stack', p.stack], ['Year', p.year]]
      .map(([k, v]) => `<div><h5>${k}</h5><p>${v}</p></div>`).join('');
    q('#case-lead').textContent = p.lead;
    q('#case-cols').innerHTML = p.sections.map(([h, items]) =>
      `<div><h5>${h}</h5><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('');
    q('#case-links').innerHTML = p.links.map(([t, u]) =>
      `<div class="btn btn-normal"><a href="${u}" target="_blank" rel="noopener" class="btn-click magnetic" data-strength="25" data-strength-text="15"><div class="btn-fill"></div><span class="btn-text"><span class="btn-text-inner change">${t} ↗</span></span></a></div>`).join('');
    if (p.image) q('#case-shot').innerHTML = `<img src="${p.image}" alt="${p.title} screenshot">`; else q('#case-shot').remove();
    const n = q('#next-case'); n.href = `project.html?p=${next.id}`; n.dataset.label = next.title; q('#next-title').textContent = next.title;
  }

  /* ---------- Work lists + floating preview tiles from data ---------- */
  qa('[data-work-list]').forEach(ul => {
    const mode = ul.dataset.workList; // "home" (5 items, 2 cols) or "all" (7 items, 4 cols)
    const list = mode === 'home' ? PROJECTS.slice(0, 5) : PROJECTS;
    ul.innerHTML = list.map(p => `<li data-cat="${p.cat}" data-id="${p.id}"><div class="stripe"></div>
      <a href="project.html?p=${p.id}" data-label="${p.title}">
        <div class="flex-col"><h4><span>${p.title}</span></h4></div>
        ${mode === 'home' ? `<div class="flex-col"><p>${p.type}</p></div>` :
          `<div class="flex-col"><p>${p.type}</p></div><div class="flex-col"><p>${p.stack}</p></div><div class="flex-col"><p>${p.year}</p></div>`}
      </a></li>`).join('') + '<div class="stripe"></div>';
    const wrap = q('.float-image-wrap');
    if (wrap) wrap.innerHTML = list.map(p => `<div class="tile" data-id="${p.id}" style="background:${p.tone}">
      <div class="card" style="${p.image ? `background-image:url(${p.image})` : `background:linear-gradient(160deg,#16307f,#090d22)`}">
      ${p.image ? '' : `<b>${p.title}</b><small>${p.stack}</small>`}</div></div>`).join('');
  });

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (hasGSAP && !RM && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const stop = () => lenis && lenis.stop();
  const start = () => lenis && lenis.start();

  /* ---------- Loader (signature on first visit to home) ---------- */
  const screen = q('.loading-screen'), words = q('.loading-words');
  const bottomWrap = q('.loading-screen .rounded-div-wrap.bottom'), topWrap = q('.loading-screen .rounded-div-wrap.top');
  const label = document.body.dataset.label || 'Home';
  const wordHTML = t => `<h2><span class="dot"></span>${t}</h2>`;
  const SIGN = '<svg class="signature" viewBox="0 0 1000 220" aria-label="Harshkumar Narendra"><text x="500" y="150" text-anchor="middle">Harshkumar Narendra</text></svg>';

  function runLoader() {
    if (!hasGSAP || RM || !screen) return;
    const big = innerWidth > 540;
    let first = false;
    try { first = document.body.dataset.page === 'home' && !sessionStorage.getItem('sig'); sessionStorage.setItem('sig', '1'); } catch (e) {}
    const onceIn = qa('main .once-in');
    html.classList.add('is-loading'); stop();
    const tl = gsap.timeline();
    tl.set(screen, { top: 0 });
    tl.set(onceIn, { y: big ? '50vh' : '10vh' });
    tl.set(bottomWrap, { height: big ? '10vh' : '5vh' });
    if (first) {
      words.innerHTML = SIGN;
      tl.set(words, { opacity: 0, y: -50 });
      tl.to(words, { duration: .8, opacity: 1, y: -50, ease: 'power4.out', delay: .5 });
      tl.to('.signature text', { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, '-=.6');
      tl.to('.signature text', { fill: '#fff', strokeWidth: 0, duration: .5, ease: 'none' }, '-=.35');
      tl.to({}, { duration: .35 });
    } else {
      words.innerHTML = wordHTML(label);
      tl.set(words, { opacity: 1, y: -50 });
      tl.to({}, { duration: .5 });
    }
    tl.addLabel('up');
    tl.to(screen, { duration: .8, top: '-100%', ease: 'power4.inOut' }, 'up');
    tl.to(bottomWrap, { duration: 1, height: '0vh', ease: 'power4.inOut' }, 'up');
    tl.to(words, { duration: .3, opacity: 0, ease: 'none' }, 'up+=.2');
    tl.to(onceIn, { duration: first ? 1.5 : 1, y: '0vh', stagger: first ? .07 : .05, ease: 'expo.out', clearProps: 'transform' }, 'up+=.2');
    tl.call(() => { html.classList.remove('is-loading'); start(); ScrollTrigger.refresh(); }, null, 'up+=.4');
  }

  /* ---------- Page transitions (cover, then navigate) ---------- */
  function transitionTo(href, text) {
    if (!hasGSAP || RM || !screen) { location.href = href; return; }
    setMenu(false); stop(); html.classList.add('is-loading');
    words.innerHTML = wordHTML(text);
    const tl = gsap.timeline();
    tl.set(screen, { top: '100%' });
    tl.set(words, { opacity: 0, y: 0 });
    tl.set(bottomWrap, { height: innerWidth > 540 ? '10vh' : '5vh' });
    tl.set(topWrap, { height: 0 });
    tl.to(screen, { duration: .5, top: '0%', ease: 'power4.in' });
    tl.to(topWrap, { duration: .4, height: '10vh', ease: 'power4.in' }, '-=.5');
    tl.to(words, { duration: .8, opacity: 1, y: -50, ease: 'power4.out', delay: .05 });
    tl.call(() => { location.href = href; }, null, .55);
  }
  const nameFor = url => /projects/.test(url) ? 'Work' : /contact/.test(url) ? 'Contact' : /experiences/.test(url) ? 'Experience' : /blog/.test(url) ? 'Blog' : 'Home';
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin || !(/\.html$/.test(url.pathname) || url.pathname.endsWith('/'))) return;
    if (url.pathname === location.pathname && url.hash) {           // same-page anchor: smooth scroll
      e.preventDefault(); setMenu(false);
      const t = q(url.hash); if (t) lenis ? lenis.scrollTo(t, { offset: 0, duration: 1.4 }) : t.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (url.pathname === location.pathname && url.search === location.search) { e.preventDefault(); setMenu(false); return; }
    e.preventDefault();
    transitionTo(url.href, a.dataset.label || nameFor(url.pathname));
  });
  addEventListener('pageshow', e => { if (e.persisted) location.reload(); });

  /* ---------- Menu ---------- */
  const main = q('main');
  function setMenu(open) {
    if (!main) return;
    main.classList.toggle('nav-active', open);
    qa('.btn-hamburger, .btn-menu').forEach(b => b.classList.toggle('active', open));
    open ? stop() : start();
  }
  qa('.btn-hamburger, .btn-menu').forEach(b => b.addEventListener('click', () => setMenu(!main.classList.contains('nav-active'))));
  qa('.fixed-nav-back').forEach(b => b.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  /* ---------- One-minute summary video ---------- */
  const vModal = q('#overview-modal'), vEl = q('#overview-video');
  let vOpener = null, vTimer = null;
  function setVideo(open) {
    if (!vModal || !vEl) return;
    clearTimeout(vTimer);
    if (open) {
      vOpener = document.activeElement;
      if (!vEl.getAttribute('src')) vEl.setAttribute('src', vEl.dataset.src);
      vModal.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => vModal.classList.add('open')));
      stop();
      vEl.play().catch(() => {});
      q('.video-close', vModal).focus({ preventScroll: true });
    } else {
      vModal.classList.remove('open');
      vEl.pause();
      vTimer = setTimeout(() => { vModal.hidden = true; }, 600);
      start();
      if (vOpener) vOpener.focus({ preventScroll: true });
    }
  }
  qa('[data-video-open]').forEach(b => b.addEventListener('click', () => setVideo(true)));
  qa('[data-video-close]').forEach(b => b.addEventListener('click', () => setVideo(false)));
  addEventListener('keydown', e => {
    if (!vModal || vModal.hidden) return;
    if (e.key === 'Escape') setVideo(false);
    if (e.key === 'Tab') { // keep focus inside the dialog
      const f = qa('button, video', vModal);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  const onScroll = () => main && main.classList.toggle('scrolled', scrollY > innerHeight * .3);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Magnetic + fill buttons ---------- */
  if (hasGSAP && innerWidth > 540 && !TOUCH) {
    qa('.magnetic').forEach(m => {
      const txt = q('.btn-text', m);
      const s = +(m.dataset.strength || 25), st = +(m.dataset.strengthText || 15);
      m.addEventListener('mousemove', e => {
        const b = m.getBoundingClientRect();
        const rx = (e.clientX - b.left) / m.offsetWidth - .5, ry = (e.clientY - b.top) / m.offsetHeight - .5;
        gsap.to(m, { duration: 1.5, x: rx * s, y: ry * s, rotate: '0.001deg', ease: 'power4.out' });
        if (txt) gsap.to(txt, { duration: 1.5, x: rx * st, y: ry * st, rotate: '0.001deg', ease: 'power4.out' });
      });
      m.addEventListener('mouseleave', () => {
        gsap.to(m, { duration: 1.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' });
        if (txt) gsap.to(txt, { duration: 1.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }
  if (hasGSAP) qa('.btn-click').forEach(b => {
    const fill = q('.btn-fill', b), change = q('.btn-text-inner.change', b);
    if (!fill && !change) return;
    b.addEventListener('mouseenter', () => {
      if (b.closest('.btn-normal.active')) return;
      if (fill) gsap.fromTo(fill, { y: '76%' }, { y: '0%', duration: .6, ease: 'power2.inOut' });
      if (change && !b.closest('.theme-dark')) gsap.fromTo(change, { color: '#0f1430' }, { color: '#ffffff', duration: .3, ease: 'power3.in' });
    });
    b.addEventListener('mouseleave', () => {
      if (b.closest('.btn-normal.active')) return;
      if (fill) gsap.to(fill, { y: '-76%', duration: .6, ease: 'power2.inOut' });
      if (change && !b.closest('.theme-dark')) gsap.to(change, { color: '#0f1430', duration: .3, ease: 'power3.out', delay: .3 });
    });
  });

  /* ---------- Logo roll: measure real word widths ---------- */
  const sizeLogo = () => qa('.btn-left-top').forEach(l => {
    const cb = q('.code-by', l), first = q('.first', l), last = q('.last', l);
    if (cb && first && last) {
      l.style.setProperty('--code-w', cb.offsetWidth + 'px');
      l.style.setProperty('--last-w', last.offsetWidth + 'px');
      l.style.setProperty('--first-w', (first.offsetWidth - parseFloat(getComputedStyle(first).paddingRight)) + 'px');
    }
  });
  sizeLogo(); document.fonts && document.fonts.ready.then(sizeLogo);

  /* ---------- Local time (London) ---------- */
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' });
  const clocks = qa('[data-clock]');
  const tick = () => { const s = fmt.format(new Date()).replace(/\s?GMT\+1/, ' BST'); clocks.forEach(c => { c.textContent = s; }); };
  tick(); setInterval(tick, 1000);

  /* ---------- Scroll animations ---------- */
  if (hasGSAP && !RM) {
    // Big name: seamless roll that flips direction with the scroll direction
    const h1 = q('.name-wrap h1');
    if (h1) {
      const clone = h1.cloneNode(true); h1.parentNode.appendChild(clone);
      const place = () => gsap.set(clone, { position: 'absolute', top: h1.offsetTop, left: h1.offsetLeft + h1.offsetWidth });
      place();
      const roll = gsap.timeline({ repeat: -1, onReverseComplete() { this.totalTime(this.rawTime() + this.duration() * 10); } });
      roll.to([h1, clone], { xPercent: -100, duration: 18, ease: 'none' }, 0);
      addEventListener('resize', () => { const t = roll.totalTime(); roll.totalTime(0); place(); roll.totalTime(t); });
      let dir = 1;
      ScrollTrigger.create({ onUpdate(self) { if (self.direction !== dir) { dir *= -1; gsap.to(roll, { timeScale: dir, overwrite: true }); } } });
    }
    ScrollTrigger.matchMedia({
      '(min-width: 721px)': () => {
        if (q('.home-header')) {
          gsap.to('.personal-image', { y: () => innerHeight * .3, ease: 'none', scrollTrigger: { trigger: '.home-header', start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to('.name-h1', { x: () => -innerWidth * .22, ease: 'none', scrollTrigger: { trigger: '.home-header', start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to('.header-above-h4', { y: () => -innerHeight * .08, ease: 'none', scrollTrigger: { trigger: '.home-header', start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to('.home-header .arrow', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.home-header', start: '100% 100%', end: '100% 0%', scrub: 0 } });
        }
        if (q('.footer-wrap')) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: '.footer-wrap', start: '0% 100%', end: '100% 100%', scrub: 0 } });
          tl.to('.footer-rounded-div .rounded-div-wrap', { height: 0, ease: 'none' }, 0)
            .from('.footer .arrow', { rotate: 15, ease: 'none' }, 0)
            .from('.footer', { yPercent: -35, ease: 'none' }, 0)
            .from('.footer .btn-fixed .btn', { x: () => -innerWidth * .08, ease: 'none' }, 0);
        }
        qa('[data-speed]').forEach(el => {
          const sp = +el.dataset.speed;
          gsap.fromTo(el, { y: () => innerHeight * .06 * sp }, { y: () => -innerHeight * .06 * sp, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      },
      '(max-width: 720px)': () => {
        if (q('.footer-wrap')) gsap.to('.footer-rounded-div .rounded-div-wrap', { height: 0, ease: 'none', scrollTrigger: { trigger: '.footer-wrap', start: '0% 100%', end: '100% 100%', scrub: 0 } });
      }
    });
    // Word-by-word reveal
    qa('.span-lines').forEach(el => {
      el.innerHTML = el.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="span-line"><span class="span-line-inner">$2</span></span>');
      gsap.from(q('.span-line-inner', el) ? qa('.span-line-inner', el) : el, { y: '100%', stagger: .01, ease: 'power3.out', duration: 1,
        scrollTrigger: { trigger: el, toggleActions: 'play none none reset', start: '0% 100%', end: '100% 0%' } });
    });
    qa('.fade-in').forEach(el => gsap.from(el, { y: '2em', opacity: 0, ease: 'expo.out', duration: 1.75,
      scrollTrigger: { trigger: el, toggleActions: 'play none none reset', start: '0% 110%', end: '100% 0%' } }));
  }

  /* ---------- Hero lens: avatar on top, real photo revealed ---------- */
  const lensSvg = q('#lensSvg');
  if (lensSvg && hasGSAP) {
    const dot = q('#lensDot'), ring = q('#lensRing'), tag = q('#lensTag'), turb = q('#turb'), hero = q('.home-header');
    const R = 300; let tx = 564, ty = 330, lx = 564, ly = 330, r = 0, tr = TOUCH ? R * .85 : 0; const t0 = performance.now();
    if (!TOUCH) {
      hero.addEventListener('pointermove', e => {
        const pt = lensSvg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const p = pt.matrixTransform(lensSvg.getScreenCTM().inverse()); tx = p.x; ty = p.y; tr = R;
      });
      hero.addEventListener('pointerleave', () => { tr = 0; });
    }
    gsap.ticker.add(() => {
      if (TOUCH) { const t = (performance.now() - t0) / 1000; tx = 564 + Math.cos(t * .5) * 110; ty = 340 + Math.sin(t * .8) * 80; }
      lx += (tx - lx) * .14; ly += (ty - ly) * .14; r += (tr - r) * .12;
      dot.setAttribute('cx', lx); dot.setAttribute('cy', ly); dot.setAttribute('r', r);
      ring.setAttribute('cx', lx); ring.setAttribute('cy', ly); ring.setAttribute('r', r);
      tag.setAttribute('x', lx); tag.setAttribute('y', ly - r - 24); tag.setAttribute('opacity', Math.min(1, r / R));
      turb.setAttribute('baseFrequency', (0.010 + Math.sin(performance.now() / 800) * 0.002).toFixed(4));
    });
  }

  /* ---------- Floating preview + "View" cursor (lag 12 / 7 / 6) ---------- */
  const img = q('.mouse-pos-list-image'), cBtn = q('.mouse-pos-list-btn'), cSpan = q('.mouse-pos-list-span');
  if (img && hasGSAP && !TOUCH) {
    let mx = 0, my = 0, ix = 0, iy = 0, bx = 0, by = 0, sx = 0, sy = 0, seeded = false;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; if (!seeded) { ix = bx = sx = mx; iy = by = sy = my; seeded = true; } });
    gsap.ticker.add(() => {
      ix += (mx - ix) / 12; iy += (my - iy) / 12; bx += (mx - bx) / 7; by += (my - by) / 7; sx += (mx - sx) / 6; sy += (my - sy) / 6;
      gsap.set(img, { left: ix, top: iy }); gsap.set(cBtn, { left: bx, top: by }); gsap.set(cSpan, { left: sx, top: sy });
    });
    const trio = [img, cBtn, cSpan];
    qa('.mouse-pos-list-image-wrap li').forEach(li => {
      const a = q('a', li);
      a.addEventListener('mouseenter', () => {
        trio.forEach(x => x.classList.add('active'));
        const vis = qa('.mouse-pos-list-image-wrap li:not(.is-hidden)'), idx = vis.indexOf(li);
        gsap.to('.float-image-wrap', { y: (idx * 100) / (vis.length * -1) + '%', duration: .6, ease: 'power2.inOut' });
      });
      a.addEventListener('mouseleave', () => trio.forEach(x => x.classList.remove('active')));
    });
    main.addEventListener('mousedown', () => [cBtn, cSpan].forEach(x => x.classList.add('pressed')));
    main.addEventListener('mouseup', () => [cBtn, cSpan].forEach(x => x.classList.remove('pressed')));
  }

  /* ---------- Work filters ---------- */
  const filterBtns = qa('[data-filter]');
  filterBtns.forEach(b => b.addEventListener('click', () => {
    if (b.classList.contains('active')) return;
    filterBtns.forEach(x => x.classList.toggle('active', x === b));
    const f = b.dataset.filter, list = q('.work-items');
    const apply = () => {
      qa('.work-items li').forEach(li => li.classList.toggle('is-hidden', f !== 'all' && li.dataset.cat !== f));
      qa('.float-image-wrap .tile').forEach(t => { const li = q(`.work-items li[data-id="${t.dataset.id}"]`); t.style.display = li && li.classList.contains('is-hidden') ? 'none' : ''; });
      hasGSAP && ScrollTrigger.refresh();
    };
    if (hasGSAP) {
      gsap.to(list, { opacity: 0, y: 20, duration: .3 });
      setTimeout(() => { apply(); gsap.to(list, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }); }, 300);
    } else apply();
  }));

  /* ---------- Contact form ---------- */
  qa('.form .field').forEach(f => {
    const upd = () => f.parentElement.classList.toggle('not-empty', f.value.trim().length > 0);
    f.addEventListener('input', upd); f.addEventListener('blur', upd); upd();
  });
  const form = q('#contact-form');
  if (form) form.addEventListener('submit', async e => {
    e.preventDefault();
    const st = q('#form-status'); st.className = 'form-status'; st.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { st.textContent = "Thanks, your message is on its way. I'll reply by email."; form.reset(); qa('.form-col', form).forEach(c => c.classList.remove('not-empty')); }
      else { st.classList.add('err'); st.textContent = "That didn't send. Please try again or email me directly."; }
    } catch (err) { st.classList.add('err'); st.textContent = 'Network error. Please email harshnarendra07@gmail.com.'; }
  });

  runLoader();
})();

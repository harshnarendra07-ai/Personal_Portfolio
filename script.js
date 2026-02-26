document.addEventListener("DOMContentLoaded", () => {
    // --- Splash Screen & Nav Logo Assembly ---
    const splashScreen = document.getElementById("splash-screen");
    const navLogo = document.getElementById("nav-logo");

    // Only run splash logic if we are on a page with a splash screen (i.e., index.html)
    if (splashScreen) {
        // Force scroll to top on reload so the intro works
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden"; // Prevent scrolling initially

        const handleFirstScroll = (e) => {
            // Prevent default scroll behavior initially
            e.preventDefault();

            // Fade out the splash screen
            splashScreen.classList.add("fade-out");

            // Allow normal scrolling again
            document.body.style.overflow = "";

            // Wait for splash fade (1.5s as defined in CSS), then assemble the nav logo
            setTimeout(() => {
                if (navLogo) {
                    navLogo.classList.add("animate-typing");
                }
            }, 1000); // Trigger slightly before splash is completely gone for fluidity

            // Remove the listeners since splash is gone
            window.removeEventListener("wheel", handleFirstScroll);
            window.removeEventListener("touchmove", handleFirstScroll);
        };

        // Listen for the first scroll attempt (mouse wheel or touch swipe)
        window.addEventListener("wheel", handleFirstScroll, { passive: false });
        window.addEventListener("touchmove", handleFirstScroll, { passive: false });
    } else if (navLogo) {
        // If on another page (no splash screen), just assemble immediately
        navLogo.classList.add("animate-typing");
    }

    // Current year for footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        rootEl.setAttribute('data-theme', savedTheme);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = rootEl.getAttribute('data-theme');
            if (currentTheme === 'light') {
                rootEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                rootEl.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Dynamic Backend Fetching ---

    // Fetch Projects
    const fetchProjects = async () => {
        const grid = document.querySelector('.features-grid'); // projects wrapper
        if (!grid || window.location.pathname.indexOf('projects.html') === -1) return;

        try {
            const res = await fetch('http://localhost:3000/api/projects');
            if (res.ok) {
                const projects = await res.json();
                if (projects.length > 0) {
                    grid.innerHTML = ''; // clear hardcoded
                    projects.forEach((proj, i) => {
                        const delayClass = i > 0 ? `delay-${i}` : '';
                        grid.innerHTML += `
                            <article class="feature-card fade-up ${delayClass} is-visible">
                                <div class="feature-icon ${proj.iconClass || 'icon-computing'}"></div>
                                <h3 class="feature-title">${proj.title}</h3>
                                <p class="feature-desc" style="margin-bottom: var(--space-3);">${proj.description}</p>
                                <a href="${proj.link}" target="_blank" style="color: var(--accent-gold); font-size: 14px; text-decoration: underline; font-weight: 500;">View Prototype</a>
                            </article>
                        `;
                    });
                }
            }
        } catch (e) {
            console.log('Backend not available or projects empty, using HTML fallback.');
        }
    };
    fetchProjects();

    // Fetch Experiences
    const fetchExperiences = async () => {
        const timeline = document.getElementById('experience-timeline');
        if (!timeline || window.location.pathname.indexOf('experiences.html') === -1) return;

        try {
            const res = await fetch('http://localhost:3000/api/experiences');
            if (res.ok) {
                const experiences = await res.json();
                if (experiences.length > 0) {
                    // We only want to remove the article tags, keep the lines
                    const articles = timeline.querySelectorAll('article');
                    articles.forEach(a => a.remove());

                    experiences.forEach((exp, i) => {
                        const delayClass = i > 0 ? `delay-${i}` : '';
                        const endStr = exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present';
                        const startStr = new Date(exp.startDate).getFullYear();
                        const timeStr = `${startStr} - ${endStr}`;

                        let descHtml = '';
                        if (exp.description && exp.description.length > 0) {
                            descHtml = `<ul style="color: var(--text-muted); line-height: 1.6; list-style-type: disc; padding-left: var(--space-2);">
                                ${exp.description.map(d => `<li>${d}</li>`).join('')}
                            </ul>`;
                        } else {
                            descHtml = `<p style="color: var(--text-muted); line-height: 1.6;">Role involves core responsibilities inside ${exp.company}.</p>`;
                        }

                        // Append new article
                        const articleHtml = `
                            <article class="timeline-item fade-up ${delayClass} is-visible" style="position: relative; padding-left: var(--space-6); margin-bottom: var(--space-8);">
                                <div class="timeline-dot" style="position: absolute; left: 8px; top: 0; width: 16px; height: 16px; background: var(--accent-gold); border-radius: 50%; box-shadow: 0 0 0 4px var(--bg-dark); z-index: 3; transition: background var(--transition-base);"></div>
                                <span style="display: block; color: var(--accent-gold); font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: var(--space-1);">${timeStr}</span>
                                <h3 style="font-size: 24px; color: var(--text-cream); margin-bottom: var(--space-1);">${exp.title}</h3>
                                <p style="color: var(--text-offwhite); font-weight: 500; margin-bottom: var(--space-2);">${exp.company} (${exp.type})</p>
                                ${descHtml}
                            </article>
                        `;
                        timeline.insertAdjacentHTML('beforeend', articleHtml);
                    });
                }
            }
        } catch (e) {
            console.log('Backend not available or experiences empty, using HTML fallback.');
        }
    };
    fetchExperiences();

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusEl = document.getElementById('form-status');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (statusEl && submitBtn) {
                statusEl.style.display = 'block';
                statusEl.style.color = 'var(--text-offwhite)';
                statusEl.textContent = 'Sending message...';
                submitBtn.disabled = true;

                const formData = new FormData(contactForm);

                try {
                    // Replace YOUR_FORMSPREE_ID with the actual code from Formspree
                    const response = await fetch('https://formspree.io/f/mzdaowaa', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    const result = await response.json();

                    if (response.ok) {
                        statusEl.style.color = 'var(--accent-gold)';
                        statusEl.textContent = 'Message sent successfully! I will be in touch shortly.';
                        contactForm.reset();
                    } else {
                        statusEl.style.color = '#ff6b6b';
                        statusEl.textContent = result.error || 'Failed to send message. Please try again.';
                    }
                } catch (error) {
                    console.error('API Error:', error);
                    statusEl.style.color = '#ff6b6b';
                    statusEl.innerHTML = 'There was a network error. Please <a href="mailto:harshnarendra07@gmail.com" style="color: var(--accent-gold); text-decoration: underline;">email me directly</a>.';
                } finally {
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        if (statusEl.style.color === 'var(--accent-gold)') {
                            statusEl.style.display = 'none';
                        }
                    }, 5000);
                }
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-up');

    elementsToAnimate.forEach(el => {
        if (prefersReducedMotion) {
            // If user prefers reduced motion, just show everything immediately
            el.classList.add('is-visible');
        } else {
            observer.observe(el);
        }
    });

    // --- Robust Fallback for Fade-Up Animations ---
    // In case IntersectionObserver fails (e.g., on Vercel deployment edge cases),
    // we use a scroll event listener and a timeout to ensure content is always revealed.
    const revealElementsFallback = () => {
        document.querySelectorAll('.fade-up:not(.is-visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            // If element is within viewport
            if (rect.top <= window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    };

    // Run fallback on scroll
    window.addEventListener('scroll', revealElementsFallback, { passive: true });

    // Run fallback immediately and after a short delay for elements above the fold
    revealElementsFallback();
    setTimeout(revealElementsFallback, 500);

    // --- Canvas Hero Animation ---
    const canvas = document.getElementById("hero-canvas");
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext("2d");
        const frameCount = 150;
        const images = [];
        let loadedImages = 0;
        let currentFrame = 0;

        // Sizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(); // re-render on resize
        };
        window.addEventListener('resize', resizeCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Load images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            // Using Make_this_cinematic_extended_9d076d2d50_000.jpg format
            const frameIndex = i.toString().padStart(3, '0');
            img.src = `images/heroanimation/Make_this_cinematic_extended_9d076d2d50_${frameIndex}.jpg`;
            img.onload = () => {
                loadedImages++;
                // Draw first frame right away to prevent blank screen
                if (i === 0) {
                    renderFrame();
                }
                if (loadedImages === frameCount) {
                    startAnimation();
                }
            };
            images.push(img);
        }

        const renderFrame = () => {
            if (images[currentFrame] && images[currentFrame].complete) {
                // Calculate cover math
                const imgRatio = images[currentFrame].width / images[currentFrame].height;
                const canvasRatio = canvas.width / canvas.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(images[currentFrame], offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const wrapper = document.getElementById('hero-scroll-wrapper');

        const updateOnScroll = () => {
            if (!wrapper) return;
            // Calculate scroll progress within wrapper
            const wrapperStart = wrapper.offsetTop;
            const scrollDistance = wrapper.offsetHeight - window.innerHeight;
            const scrolled = window.scrollY - wrapperStart;

            // Map scroll progress (0 to 1)
            let progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

            // Map progress to frame
            currentFrame = Math.floor(progress * (frameCount - 1));

            // --- Scroll Text Animation Logic ---
            const mainContent = document.querySelector('.hero-content');
            const t1 = document.getElementById('scroll-text-1');
            const t2 = document.getElementById('scroll-text-2');
            const t3 = document.getElementById('scroll-text-3');

            // 1. Fade out main hero content quickly
            if (mainContent) {
                let mainOpacity = Math.max(0, 1 - (progress / 0.15));
                mainContent.style.opacity = mainOpacity;
                mainContent.style.transform = `translateY(${progress * -100}px)`;
                // Disable pointer events when faded out
                mainContent.style.pointerEvents = mainOpacity === 0 ? 'none' : 'auto';
            }

            // Helper to animate text based on a start and end progress window
            const animateText = (el, p, start, end) => {
                if (!el) return;
                if (p > start && p < end) {
                    const localP = (p - start) / (end - start); // 0 to 1
                    // Sine wave for opacity (0 -> 1 -> 0)
                    const opacity = Math.sin(localP * Math.PI);
                    // Scale goes from 0.8 to 1.2
                    const scale = 0.8 + (localP * 0.4);

                    el.style.opacity = opacity.toFixed(3);
                    el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
                } else if (p >= end && el.id === 'scroll-text-3') {
                    // Keep the last text visible at the end of the scroll
                    el.style.opacity = 0; // Wait, actually the user continues to the next section, so let it fade out or stay? Let's let it fade out so it doesn't overlap the next section.
                    // Wait, if it fades out, it's consistent. Let's just use the strict start/end.
                } else {
                    el.style.opacity = 0;
                }
            };

            // Cleaned up animateText version:
            const runTextAnimation = (el, p, start, end) => {
                if (!el) return;
                if (p > start && p < end) {
                    const localP = (p - start) / (end - start);
                    el.style.opacity = Math.sin(localP * Math.PI).toFixed(3);
                    el.style.transform = `translate(-50%, -50%) scale(${(0.8 + (localP * 0.4)).toFixed(3)})`;
                } else {
                    el.style.opacity = 0;
                }
            };

            runTextAnimation(t1, progress, 0.15, 0.40);
            runTextAnimation(t2, progress, 0.40, 0.65);
            runTextAnimation(t3, progress, 0.65, 0.90);

            requestAnimationFrame(renderFrame);
        };

        const startAnimation = () => {
            window.addEventListener('scroll', updateOnScroll);
            updateOnScroll(); // init first frame based on scroll pos
        };

    } else if (canvas && prefersReducedMotion) {
        // Just load and draw the first frame
        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFirstFrame();
        };
        window.addEventListener('resize', resizeCanvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const img = new Image();
        img.src = `images/heroanimation/Make_this_cinematic_extended_9d076d2d50_000.jpg`;
        const renderFirstFrame = () => {
            if (img.complete && img.width > 0) {
                const imgRatio = img.width / img.height;
                const canvasRatio = canvas.width / canvas.height;
                let drawWidth, drawHeight, offsetX, offsetY;
                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };
        img.onload = renderFirstFrame;
    }

    // --- Experience Timeline Animation ---
    const timelineContainer = document.getElementById('experience-timeline');
    const journeyFill = document.getElementById('journey-line-fill');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineContainer && journeyFill && timelineItems.length > 0 && !prefersReducedMotion) {

        // Remove standard fade-up observation so they are strictly controlled by the line
        timelineItems.forEach(item => {
            observer.unobserve(item);
            item.classList.remove('is-visible');
        });

        const updateJourneyLine = () => {
            // Screen center line
            const triggerY = window.innerHeight * 0.6;

            // Container boundary maths
            const containerRect = timelineContainer.getBoundingClientRect();

            // If container is above the trigger line, how far down are we?
            let fillHeight = 0;
            if (containerRect.top < triggerY) {
                fillHeight = triggerY - containerRect.top;
            }

            // Cap the fill line to the container bounds
            const maxFill = containerRect.height;
            const percentage = Math.max(0, Math.min(100, (fillHeight / maxFill) * 100));
            journeyFill.style.height = `${percentage}%`;

            // Trigger items as the line passes them
            timelineItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const dot = item.querySelector('.timeline-dot');
                if (itemRect.top < triggerY) {
                    item.classList.add('is-visible');
                    if (dot) dot.style.background = 'var(--accent-gold)';
                } else {
                    item.classList.remove('is-visible');
                    if (dot) dot.style.background = 'var(--surface-border)';
                }
            });
        };

        window.addEventListener('scroll', updateJourneyLine);
        window.addEventListener('resize', updateJourneyLine);

        // Init state
        setTimeout(updateJourneyLine, 100);
    } else if (timelineContainer && prefersReducedMotion) {
        // Fallback: Just show them all standardly
        timelineItems.forEach(item => {
            item.classList.add('is-visible');
            const dot = item.querySelector('.timeline-dot');
            if (dot) dot.style.background = 'var(--accent-gold)';
        });
        if (journeyFill) journeyFill.style.height = '100%';
    }
});

/* ==========================================================================
   Project Page Presentation Slider Logic
   ========================================================================== */
let currentSlideIndex = 0;

window.changeSlide = function (direction) {
    const slides = document.querySelectorAll('.presentation-slide');
    const slideCounter = document.getElementById('current-slide');

    if (!slides || slides.length === 0) return;

    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');

    // Calculate new index
    currentSlideIndex += direction;

    // Loop bounds
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');

    // Update counter text
    if (slideCounter) {
        slideCounter.textContent = currentSlideIndex + 1;
    }
};

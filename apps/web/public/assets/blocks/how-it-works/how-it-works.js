(function () {
    const blocks = document.querySelectorAll('[data-how-it-works]');

    blocks.forEach((block) => {
        const stepsRoot = block.querySelector('.how-it-works__steps');
        const cards = Array.from(block.querySelectorAll('[data-how-step]'));
        const progress = block.querySelector('.how-it-works__progress-bar');

        if (!cards.length) return;

        const dayTotal = parseInt(stepsRoot?.getAttribute('data-day-total') || '0', 10);
        const openFirst = stepsRoot?.getAttribute('data-open-first') === '1';

        // Two jobs, one measuring pass:
        //   1. Each description's natural height -> --how-desc-height, so the
        //      active card can expand to its real copy without clipping.
        //   2. The tallest card's natural (expanded) height -> --how-row-height
        //      on the grid. align-items:stretch then equalises every card to
        //      it, so the row is one content-driven height with no hard-coded
        //      Figma pixels.
        // We reveal every description at once and drop the reserved row height,
        // letting the grid size to its tallest content, then read it back.
        function measureLayout() {
            if (!stepsRoot) return;

            const prevRowMinHeight = stepsRoot.style.minHeight;
            stepsRoot.style.minHeight = '0px';

            const saved = cards.map((card) => {
                const desc = card.querySelector('.how-it-works__description');
                if (!desc) return null;
                const entry = {
                    desc,
                    maxHeight: desc.style.maxHeight,
                    transition: desc.style.transition,
                };
                desc.style.transition = 'none';
                desc.style.maxHeight = 'none';
                return entry;
            });

            // Force layout with every description expanded.
            void stepsRoot.offsetHeight;

            let rowHeight = 0;
            cards.forEach((card, index) => {
                const cardHeight = card.getBoundingClientRect().height;
                if (cardHeight > rowHeight) rowHeight = cardHeight;

                const entry = saved[index];
                if (entry) {
                    const h = entry.desc.scrollHeight;
                    if (h > 0) card.style.setProperty('--how-desc-height', `${h}px`);
                }
            });

            // Restore descriptions to their CSS-driven state.
            saved.forEach((entry) => {
                if (!entry) return;
                entry.desc.style.maxHeight = entry.maxHeight;
                void entry.desc.offsetHeight;
                entry.desc.style.transition = entry.transition;
            });

            stepsRoot.style.minHeight = prevRowMinHeight;
            if (rowHeight > 0) {
                stepsRoot.style.setProperty('--how-row-height', `${Math.ceil(rowHeight)}px`);
            }
        }

        function setActive(index) {
            const activeIndex = Math.max(0, Math.min(index, cards.length - 1));

            cards.forEach((card, cardIndex) => {
                const isActive = cardIndex === activeIndex;
                card.classList.toggle('is-active', isActive);
                card.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            if (!progress) return;

            const active = cards[activeIndex];
            const dayStart = parseInt(active.getAttribute('data-day-start') || '0', 10);
            const dayEnd = parseInt(active.getAttribute('data-day-end') || '0', 10);

            if (dayTotal > 0 && dayStart > 0 && dayEnd > 0) {
                const left = ((dayStart - 1) / dayTotal) * 100;
                const width = ((dayEnd - dayStart + 1) / dayTotal) * 100;
                progress.style.left = `${left}%`;
                progress.style.width = `${width}%`;
            } else {
                // Fallback: fill up to the active card's position.
                progress.style.left = '0%';
                progress.style.width = `${((activeIndex + 1) / cards.length) * 100}%`;
            }
        }

        let autoTimer = null;
        let autoIndex = 0;
        let userInteracted = false;
        const AUTO_INTERVAL = 3500;

        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
        }

        function startAuto() {
            if (autoTimer || userInteracted || !openFirst) return;
            if (window.matchMedia('(max-width: 767px)').matches) return;
            if (cards.length <= 1) return;
            autoTimer = setInterval(() => {
                autoIndex = (autoIndex + 1) % cards.length;
                setActive(autoIndex);
            }, AUTO_INTERVAL);
        }

        cards.forEach((card, index) => {
            const activate = () => {
                if (window.matchMedia('(max-width: 767px)').matches) return;
                userInteracted = true;
                stopAuto();
                autoIndex = index;
                setActive(index);
            };
            card.addEventListener('mouseenter', activate);
            card.addEventListener('focus', activate);
            card.addEventListener('click', activate);
        });

        measureLayout();
        // Always open one card on load. Leaving every card collapsed rendered the
        // section as titles over dead space on desktop, while mobile showed the
        // descriptions anyway. `openFirst` now controls only the auto-cycle below,
        // so a page can show its steps without opting into moving content.
        autoIndex = Math.max(0, cards.findIndex((card) => card.classList.contains('is-active')));
        setActive(autoIndex);

        // Auto-cycle when section is visible
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startAuto();
                    } else {
                        stopAuto();
                    }
                });
            }, { threshold: 0.25 });
            io.observe(block);
        } else {
            startAuto();
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(measureLayout, 150);
        });
    });
})();

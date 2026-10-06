const highlightClass = 'capability-trio__card--highlighted';

function initCapabilityTrio(block: Element): void {
  if (block.getAttribute('data-capability-trio-ready') === 'true') {
    return;
  }

  const cardsWrap = block.querySelector<HTMLElement>('.capability-trio__cards');
  const cards = Array.from(block.querySelectorAll<HTMLElement>('.capability-trio__card'));

  if (!cardsWrap || cards.length < 2) {
    return;
  }

  block.setAttribute('data-capability-trio-ready', 'true');

  let active = Math.max(0, cards.findIndex((card) => card.classList.contains(highlightClass)));
  const glowStops = [10, 44, 76];
  const isTrio = cardsWrap.classList.contains('capability-trio__cards--trio') && cards.length === glowStops.length;
  let glowDistance = isTrio ? (glowStops[active] ?? 0) : 0;
  let timer: number | undefined;
  let hovering = false;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const apply = (): void => {
    cards.forEach((card, index) => {
      card.classList.toggle(highlightClass, index === active);
    });
    cardsWrap.setAttribute('data-active', String(active + 1));
    if (isTrio) {
      const target = glowStops[active] ?? 0;
      const forward = ((target - (glowDistance % 100)) % 100 + 100) % 100;
      glowDistance += forward;
      cardsWrap.style.setProperty('--ct-glow-distance', `${glowDistance}%`);
    }
  };

  const setActive = (index: number): void => {
    if (index !== active) {
      active = index;
      apply();
    }
  };

  const stop = (): void => {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  const start = (): void => {
    if (timer === undefined && !hovering && !reduceMotion.matches) {
      timer = window.setInterval(() => setActive((active + 1) % cards.length), 2000);
    }
  };

  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      hovering = true;
      stop();
      setActive(index);
    });
    card.addEventListener('mouseleave', () => {
      hovering = false;
      start();
    });
  });

  apply();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(block);
    return;
  }

  start();
}

export function initCapabilityTrios(root: ParentNode = document): void {
  root.querySelectorAll('[data-capability-trio]').forEach(initCapabilityTrio);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initCapabilityTrios(), { once: true });
} else {
  initCapabilityTrios();
}

const roots = document.querySelectorAll<HTMLElement>('[data-agent-solutions]');

if (roots.length > 0) {
  const desktop = window.matchMedia('(min-width: 768px)');

  roots.forEach((root) => {
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-agent-solution-card]'));
    if (cards.length === 0) return;

    const setActive = (index: number) => {
      const activeIndex = Math.max(0, Math.min(index, cards.length - 1));

      cards.forEach((card, cardIndex) => {
        const isActive = cardIndex === activeIndex;
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    };

    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        if (desktop.matches) setActive(index);
      });

      card.addEventListener('focus', () => {
        if (desktop.matches) setActive(index);
      });

      card.addEventListener('click', () => {
        if (desktop.matches) setActive(index);
      });
    });

    setActive(cards.findIndex((card) => card.classList.contains('is-active')));
  });
}

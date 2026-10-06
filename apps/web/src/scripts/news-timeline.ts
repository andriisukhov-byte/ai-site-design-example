const root = document.querySelector<HTMLElement>('[data-news-root]');

if (root) {
  const rail = root.querySelector<HTMLElement>('[data-news-rail]');
  const list = root.querySelector<HTMLElement>('[data-news-list]');

  if (rail && list) {
    const gradientId = 'newsRailGradient';
    const mediaQuery = window.matchMedia('(min-width: 601px)');
    let fillLine: SVGLineElement | null = null;
    let railHeight = 0;
    let ticking = false;
    let resizeTimer: number | undefined;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const buildSvg = (height: number) => {
      rail.innerHTML =
        '<svg class="news-timeline__svg" width="2" height="' + height + '" ' +
        'viewBox="0 0 2 ' + height + '" preserveAspectRatio="none" fill="none" aria-hidden="true">' +
        '<defs><linearGradient id="' + gradientId + '" x1="0" y1="0" x2="0" y2="' + height + '" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="#3A87D9"/>' +
        '<stop offset="0.25" stop-color="#2F1A6B"/>' +
        '<stop offset="0.5" stop-color="#200000"/>' +
        '<stop offset="0.75" stop-color="#AD3822"/>' +
        '<stop offset="1" stop-color="#F7A75F"/>' +
        '</linearGradient></defs>' +
        '<line x1="1" y1="0" x2="1" y2="' + height + '" stroke="#E8E8E8" stroke-width="2"/>' +
        '<line class="news-timeline__svg-fill" x1="1" y1="0" x2="1" y2="' + height + '" ' +
        'stroke="url(#' + gradientId + ')" stroke-width="2" ' +
        'stroke-dasharray="' + height + '" stroke-dashoffset="' + height + '"/>' +
        '</svg>';

      fillLine = rail.querySelector<SVGLineElement>('.news-timeline__svg-fill');
    };

    const update = () => {
      if (!fillLine || !railHeight || !mediaQuery.matches) {
        return;
      }

      const railRect = rail.getBoundingClientRect();
      const reference = window.innerHeight * 0.5;
      const progress = clamp((reference - railRect.top) / railHeight, 0, 1);

      fillLine.style.strokeDashoffset = String(railHeight * (1 - progress));
    };

    const measure = () => {
      if (!mediaQuery.matches) {
        rail.style.display = 'none';
        return;
      }

      rail.style.display = 'block';

      const nodes = list.querySelectorAll<HTMLElement>('.news-card__node');
      if (nodes.length < 2) {
        rail.style.display = 'none';
        return;
      }

      const listRect = list.getBoundingClientRect();
      const firstRect = nodes[0].getBoundingClientRect();
      const lastRect = nodes[nodes.length - 1].getBoundingClientRect();
      const top = firstRect.top - listRect.top + firstRect.height / 2;
      const bottom = lastRect.top - listRect.top + lastRect.height / 2;
      railHeight = Math.max(0, Math.round(bottom - top));

      rail.style.top = `${Math.round(top)}px`;
      rail.style.height = `${railHeight}px`;

      buildSvg(railHeight);
      update();
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    root.addEventListener('news:appended', measure);
    measure();
  }
}

export {};

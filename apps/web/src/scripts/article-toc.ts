const articles = document.querySelectorAll<HTMLElement>('.single-article');

for (const article of articles) {
  const links = [...article.querySelectorAll<HTMLAnchorElement>('.single-article__toc-link')];
  const headings = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter((heading): heading is HTMLElement => Boolean(heading));

  if (!links.length || !headings.length || !('IntersectionObserver' in window)) {
    continue;
  }

  const setActive = (id: string): void => {
    for (const link of links) {
      const isActive = link.hash === `#${id}`;
      link.classList.toggle('is-active', isActive);
      link.parentElement?.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

      if (visible?.target.id) {
        setActive(visible.target.id);
      }
    },
    { rootMargin: '-96px 0px -65% 0px', threshold: [0, 1] },
  );

  headings.forEach((heading) => observer.observe(heading));
  setActive(headings[0].id);
}

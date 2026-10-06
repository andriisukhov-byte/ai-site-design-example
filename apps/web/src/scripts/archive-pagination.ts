type ArchiveImage = {
  src?: string;
  alt?: string;
};

type ArchiveItem = {
  title: string;
  path: string;
  excerpt?: string;
  image?: ArchiveImage;
  date?: string;
  readTime: string;
  rating?: string;
  category?: string;
  tags?: string[];
};

type ArchivePayload = {
  variant: 'blog' | 'guides';
  perPage: number;
  firstPageCount?: number;
  items: ArchiveItem[];
};

document.querySelectorAll<HTMLElement>('[data-archive-root]').forEach((root) => {
  const payloadNode = root.querySelector<HTMLScriptElement>('[data-archive-payload]');
  const list = root.querySelector<HTMLElement>('[data-archive-list]');
  const pagination = root.querySelector<HTMLElement>('[data-archive-pagination]');
  const payload = parsePayload(payloadNode?.textContent ?? '');

  if (!list || payload.items.length === 0) {
    return;
  }

  const query = new URLSearchParams(window.location.search);
  const requestedFilter = payload.variant === 'blog' ? query.get('tag') : query.get('category');
  let filteredItems = requestedFilter
    ? payload.items.filter((item) => matchesFilter(payload.variant, item, requestedFilter))
    : payload.items;
  const archive = root.closest<HTMLElement>('.blog-archive-page, .guide-archive');
  if (payload.variant === 'blog') {
    const featured = filteredItems[0];

    if (featured && archive) {
      updateBlogFeatured(archive, featured);
    }

    filteredItems = filteredItems.slice(1);
  }
  const filterLinks = [...(archive?.querySelectorAll<HTMLAnchorElement>('[data-archive-filter]') ?? [])];
  let currentPage = 1;
  const firstPageCount = Math.max(1, payload.firstPageCount ?? payload.perPage);
  const maxPages = filteredItems.length <= firstPageCount
    ? 1
    : 1 + Math.ceil((filteredItems.length - firstPageCount) / payload.perPage);

  for (const link of filterLinks) {
    const active = normalizeFilter(link.dataset.archiveFilter || '') === normalizeFilter(requestedFilter || '');
    link.classList.toggle('active', active);
    link.classList.toggle('blog-filters__tab--active', active);
    active ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current');
  }

  const render = (nextPage: number, scroll = false) => {
    currentPage = Math.min(Math.max(1, nextPage), maxPages);
    const start = currentPage === 1
      ? 0
      : firstPageCount + (currentPage - 2) * payload.perPage;
    const count = currentPage === 1 ? firstPageCount : payload.perPage;
    const items = filteredItems.slice(start, start + count);
    list.innerHTML = items.map((item) => renderCard(payload.variant, item)).join('');
    if (pagination) {
      renderPagination(pagination, maxPages, currentPage);
    }

    if (scroll) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  pagination?.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-page]');
    if (!button || button.disabled) {
      return;
    }

    render(Number(button.dataset.page || '1'), true);
  });

  render(1);
});

function parsePayload(value: string): ArchivePayload {
  try {
    const parsed = JSON.parse(value) as Partial<ArchivePayload>;
    return {
      variant: parsed.variant === 'blog' ? 'blog' : 'guides',
      perPage: Number(parsed.perPage) || 9,
      firstPageCount: Number(parsed.firstPageCount) || undefined,
      items: Array.isArray(parsed.items) ? parsed.items as ArchiveItem[] : [],
    };
  } catch {
    return { variant: 'guides', perPage: 9, items: [] };
  }
}

function renderPagination(root: HTMLElement, maxPages: number, currentPage: number): void {
  if (maxPages <= 1) {
    root.innerHTML = '';
    return;
  }

  const pages = paginationTokens(maxPages, currentPage).map((page) => {
    if (page === 'dots') {
      return '<span class="page-numbers dots" aria-hidden="true">…</span>';
    }

    const current = page === currentPage ? ' current' : '';
    return `<button type="button" class="page-numbers${current}" data-page="${page}">${page}</button>`;
  }).join('');

  root.innerHTML = `
    <button type="button" class="ca-pagination__arrow ca-pagination__arrow--prev${currentPage === 1 ? ' is-disabled' : ''}" data-page="${Math.max(1, currentPage - 1)}"${currentPage === 1 ? ' disabled' : ''} aria-label="Previous page">
      ${paginationIcon('prev')}
    </button>
    <div class="ca-pagination__pages">${pages}</div>
    <button type="button" class="ca-pagination__arrow ca-pagination__arrow--next${currentPage === maxPages ? ' is-disabled' : ''}" data-page="${Math.min(maxPages, currentPage + 1)}"${currentPage === maxPages ? ' disabled' : ''} aria-label="Next page">
      ${paginationIcon('next')}
    </button>`;
}

function paginationTokens(maxPages: number, currentPage: number): Array<number | 'dots'> {
  if (maxPages <= 4) {
    return Array.from({ length: maxPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    maxPages,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ]);
  const visible = [...pages]
    .filter((page) => page >= 1 && page <= maxPages)
    .sort((left, right) => left - right);
  const tokens: Array<number | 'dots'> = [];

  for (const page of visible) {
    const previous = tokens.at(-1);

    if (typeof previous === 'number' && page - previous > 1) {
      tokens.push('dots');
    }

    tokens.push(page);
  }

  return tokens;
}

function renderCard(variant: ArchivePayload['variant'], item: ArchiveItem): string {
  if (variant === 'blog') {
    return `<a href="${escapeAttribute(item.path)}" class="guide-card guide-card__link">
      ${item.image?.src ? `<div class="guide-card__image"><img src="${escapeAttribute(item.image.src)}" alt="${escapeAttribute(item.image.alt || item.title)}" loading="lazy" decoding="async" /></div>` : ''}
      <div class="guide-card__content">
        <div class="blog-posts__tags"><div class="blog-posts__tag">${escapeHtml(item.category || 'Article')}</div></div>
        <div class="guide-card__title">${escapeHtml(item.title)}</div>
        <div class="guide-card__info">
          <div class="guide-card__info-item"><div class="blog-posts__rating"><span class="kk-star-ratings"><span class="kksr-stars" aria-hidden="true"></span>${item.rating ? `<span class="kksr-legend">${escapeHtml(item.rating)}</span>` : ''}</span></div></div>
          <div class="guide-card__info-item read"><img src="/assets/blocks/news-insights/clock.svg" alt="" width="20" height="20" loading="lazy" /><span>${escapeHtml(item.readTime)}</span></div>
        </div>
      </div>
    </a>`;
  }

  return `<article class="guide-card">
    <a href="${escapeAttribute(item.path)}" class="guide-card__link" aria-label="${escapeAttribute(item.title)}">
      <div class="guide-card__image">
        ${item.image?.src ? `<img src="${escapeAttribute(item.image.src)}" alt="${escapeAttribute(item.image.alt || item.title)}" loading="lazy" decoding="async" />` : '<span class="guide-card__image-placeholder" aria-hidden="true"></span>'}
      </div>
      <h2 class="guide-card__title">${escapeHtml(item.title)}</h2>
      <div class="guide-card__info">
        <div class="guide-card__info-item date"><img src="/assets/blocks/news-insights/calendar.svg" alt="" width="20" height="20" loading="lazy" /><span>${escapeHtml(item.date || '')}</span></div>
        <div class="guide-card__info-item read"><img src="/assets/blocks/news-insights/clock.svg" alt="" width="20" height="20" loading="lazy" /><span>${escapeHtml(item.readTime)}</span></div>
      </div>
    </a>
  </article>`;
}

function matchesFilter(variant: ArchivePayload['variant'], item: ArchiveItem, filter: string): boolean {
  const normalized = normalizeFilter(filter);

  if (variant === 'blog') {
    return (item.tags ?? []).some((tag) => normalizeFilter(tag) === normalized);
  }

  return normalizeFilter(item.category || '') === normalized;
}

function updateBlogFeatured(archive: HTMLElement, item: ArchiveItem): void {
  const title = archive.querySelector<HTMLAnchorElement>('[data-blog-featured-title]');
  const button = archive.querySelector<HTMLAnchorElement>('[data-blog-featured-button]');
  const excerpt = archive.querySelector<HTMLElement>('[data-blog-featured-excerpt]');
  const image = archive.querySelector<HTMLImageElement>('[data-blog-featured-image]');

  if (title) {
    title.href = item.path;
    title.textContent = item.title;
  }

  if (button) {
    button.href = item.path;
  }

  if (excerpt) {
    excerpt.textContent = item.excerpt || '';
  }

  if (image) {
    image.src = item.image?.src || '/assets/brand/acme-logo.svg';
    image.alt = item.image?.alt || item.title;
  }
}

function normalizeFilter(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function paginationIcon(direction: 'prev' | 'next'): string {
  const path = direction === 'prev'
    ? 'M19 12H5M5 12L12 19M5 12L12 5'
    : 'M5 12H19M19 12L12 5M19 12L12 19';

  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="${path}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}

export {};

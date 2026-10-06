type TipItem = {
  title: string;
  excerptHtml: string;
  searchText: string;
  category: string;
  archiveWidth: number;
  icons: Array<{ src: string; alt?: string; width?: number; height?: number }>;
};

type TipsPayload = {
  items: TipItem[];
  perPage: number;
};

const root = document.querySelector<HTMLElement>('[data-tips-root]');

if (root) {
  const payloadNode = root.querySelector<HTMLScriptElement>('[data-tips-payload]');
  const searchInput = root.querySelector<HTMLInputElement>('[data-tips-search]');
  const searchForm = root.querySelector<HTMLFormElement>('[data-tips-search-form]');
  const categoriesContainer = root.querySelector<HTMLElement>('[data-tips-categories]');
  const gridContainer = root.querySelector<HTMLElement>('[data-tips-grid]');
  const paginationContainer = root.querySelector<HTMLElement>('[data-tips-pagination]');
  const statsContainer = root.querySelector<HTMLElement>('[data-tips-stats]');
  const payload = parsePayload(payloadNode?.textContent ?? '');

  const state = {
    search: '',
    category: '',
    page: 1,
    perPage: payload.perPage,
  };

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const readStateFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    state.search = urlParams.get('tips-s') || '';
    state.category = urlParams.get('cat') || '';
    state.page = Number(urlParams.get('page') || 1);

    if (!Number.isFinite(state.page) || state.page < 1) {
      state.page = 1;
    }
  };

  const pushUrlState = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    if (state.search) {
      params.set('tips-s', state.search);
    }

    if (state.category) {
      params.set('cat', state.category);
    }

    if (state.page !== 1) {
      params.set('page', String(state.page));
    }

    url.search = params.toString();
    window.history.pushState({ ...state }, '', url.toString());
  };

  const applyActiveCategoryClass = () => {
    categoriesContainer?.querySelectorAll('[data-cat]').forEach((button) => {
      const buttonCategory = button.getAttribute('data-cat') || '';
      button.classList.toggle('is-active', buttonCategory === state.category);
    });
  };

  const applySearchValue = () => {
    if (searchInput) {
      searchInput.value = state.search || '';
    }
  };

  const filteredItems = () => {
    const search = state.search.trim().toLowerCase();
    return payload.items.filter((item) =>
      (!state.category || item.category === state.category)
      && (!search || item.searchText.includes(search)),
    );
  };

  const render = (options?: { shouldPushState?: boolean; scroll?: boolean }) => {
    const shouldPushState = options?.shouldPushState ?? true;
    const items = filteredItems();
    const maxPages = Math.max(1, Math.ceil(items.length / state.perPage));
    state.page = Math.min(Math.max(1, state.page), maxPages);

    const from = items.length ? (state.page - 1) * state.perPage + 1 : 0;
    const to = items.length ? Math.min(items.length, state.page * state.perPage) : 0;
    const pageItems = items.slice((state.page - 1) * state.perPage, state.page * state.perPage);

    if (statsContainer) {
      statsContainer.innerHTML = items.length === 0
        ? 'Showing 0 results'
        : `<strong>Showing ${from} - ${to} of ${items.length} results</strong> <span>in ${escapeHtml(state.category || 'All')}</span>`;
    }

    if (gridContainer) {
      gridContainer.innerHTML = pageItems.length
        ? pageItems.map(renderCard).join('')
        : '<div class="tips-empty"><div class="tips-empty__title">No results found.</div><div class="tips-empty__text">Try another search term.</div></div>';
    }

    if (paginationContainer) {
      paginationContainer.innerHTML = renderPagination(maxPages, state.page);
    }

    if (shouldPushState) {
      pushUrlState();
    }

    applyActiveCategoryClass();

    if (options?.scroll) {
      scrollToTipsMain();
    }
  };

  const handleSearchInput = debounce(() => {
    if (!searchInput) {
      return;
    }

    state.search = (searchInput.value || '').trim();
    state.page = 1;
    render({ shouldPushState: true });
  }, 300);

  searchInput?.addEventListener('input', handleSearchInput);

  categoriesContainer?.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLElement>('[data-cat]');
    if (!button) {
      return;
    }

    state.category = button.getAttribute('data-cat') || '';

    state.page = 1;
    render({ shouldPushState: true });
  });

  paginationContainer?.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-page]');
    if (!button || button.disabled) {
      return;
    }

    const nextPage = Number(button.getAttribute('data-page') || 1);
    state.page = Number.isFinite(nextPage) && nextPage >= 1 ? nextPage : 1;
    render({ shouldPushState: true, scroll: true });
  });

  window.addEventListener('popstate', () => {
    readStateFromUrl();
    applySearchValue();
    applyActiveCategoryClass();
    render({ shouldPushState: false });
  });

  readStateFromUrl();
  applySearchValue();
  applyActiveCategoryClass();
  render({ shouldPushState: false });
}

function parsePayload(value: string): TipsPayload {
  try {
    const parsed = JSON.parse(value) as Partial<TipsPayload>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      perPage: Number(parsed.perPage) || 15,
    };
  } catch {
    return { items: [], perPage: 15 };
  }
}

function renderCard(item: TipItem): string {
  const width = [1, 2, 3].includes(item.archiveWidth) ? item.archiveWidth : 1;
  const icons = item.icons.length
    ? `<div class="tips-card__icons">${item.icons.slice(0, 2).map((icon, index) =>
        `<div class="tips-card__icon${index === 1 ? ' is-overlap' : ''}"><img src="${escapeHtml(icon.src)}" alt="${escapeHtml(item.title)}" loading="lazy"></div>`,
      ).join('')}</div>`
    : '';
  return `<article class="tips-card tips-card--span-${width}"><div class="tips-card__inner">${icons}<h3 class="tips-card__title">${escapeHtml(item.title)}</h3><div class="tips-card__excerpt">${item.excerptHtml}</div></div></article>`;
}

function renderPagination(maxPages: number, currentPage: number): string {
  if (maxPages <= 1) {
    return '';
  }

  const pages = Array.from({ length: maxPages }, (_, index) => {
    const page = index + 1;
    const activeClass = page === currentPage ? ' is-active' : '';
    return `<button type="button" class="tips-pagination__page${activeClass}" data-page="${page}">${page}</button>`;
  }).join('');

  return `<nav class="tips-pagination" data-max="${maxPages}">
    <button type="button" class="tips-pagination__prev" data-page="${Math.max(1, currentPage - 1)}"${currentPage === 1 ? ' disabled' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 12H5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        <path d="M11 6L5 12L11 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <div class="tips-pagination__pages">${pages}</div>
    <button type="button" class="tips-pagination__next" data-page="${Math.min(maxPages, currentPage + 1)}"${currentPage === maxPages ? ' disabled' : ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12H19" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        <path d="M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>`;
}

function scrollToTipsMain(): void {
  const element = document.querySelector<HTMLElement>('.tips__main');
  if (!element) {
    return;
  }

  const rect = element.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const paddingTop = parseFloat(window.getComputedStyle(element).paddingTop) || 0;
  const targetPosition = rect.top + scrollTop + paddingTop - 120;

  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

export {};

function debounce<T extends (...args: never[]) => void>(fn: T, delayMs: number): T {
  let timerId: number | undefined;

  return function debounced(this: ThisParameterType<T>, ...args: Parameters<T>) {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => fn.apply(this, args), delayMs);
  } as T;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

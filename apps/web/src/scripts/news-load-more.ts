type NewsItem = {
  title: string;
  path: string;
  publishedAt?: string;
  image?: { src: string; alt?: string };
  contentHtml: string;
};

const root = document.querySelector<HTMLElement>('[data-news-root]');

if (root) {
  const list = root.querySelector<HTMLElement>('[data-news-list]');
  const button = root.querySelector<HTMLButtonElement>('[data-news-more]');
  const payloadNode = root.querySelector<HTMLScriptElement>('[data-news-payload]');
  const payload = parsePayload(payloadNode?.textContent ?? '');

  button?.addEventListener('click', () => {
    if (!list) return;

    const current = Number(button.dataset.page || 1);
    const max = Number(button.dataset.max || 1);
    const next = current + 1;
    if (next > max) return;

    button.disabled = true;
    button.classList.add('is-loading');
    button.setAttribute('aria-busy', 'true');

    const start = (next - 1) * payload.perPage;
    appendGroups(list, renderGroups(payload.items.slice(start, start + payload.perPage)));
    button.dataset.page = String(next);

    if (next >= max) {
      button.parentElement?.remove();
    } else {
      button.disabled = false;
      button.classList.remove('is-loading');
      button.setAttribute('aria-busy', 'false');
    }

    root.dispatchEvent(new CustomEvent('news:appended'));
  });
}

function parsePayload(value: string): { items: NewsItem[]; perPage: number } {
  try {
    const data = JSON.parse(value) as { items?: NewsItem[]; perPage?: number };
    return { items: Array.isArray(data.items) ? data.items : [], perPage: Number(data.perPage) || 5 };
  } catch {
    return { items: [], perPage: 5 };
  }
}

function renderGroups(items: NewsItem[]): string {
  const groups = new Map<string, NewsItem[]>();
  for (const item of items) {
    const key = dateParts(item.publishedAt).key;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return [...groups].map(([key, groupItems]) => {
    const date = dateParts(groupItems[0]?.publishedAt);
    return `<div class="news-group" data-date="${key}"><time class="news-group__date" datetime="${date.datetime}">${date.label}</time><div class="news-group__cards">${groupItems.map(renderCard).join('')}</div></div>`;
  }).join('');
}

function renderCard(item: NewsItem): string {
  const id = `news-${item.path.replace(/^\/+|\/+$/g, '').replace(/[^A-Za-z0-9_-]+/g, '-')}`;
  const image = item.image?.src
    ? `<div class="news-card__media"><img class="news-card__image" src="${escapeHtml(item.image.src)}" alt="${escapeHtml(item.image.alt || item.title)}" loading="lazy" decoding="async"></div>`
    : '';
  const content = item.contentHtml ? `<div class="news-card__content entry-content">${item.contentHtml}</div>` : '';
  return `<article class="news-card" id="${id}"><span class="news-card__node" aria-hidden="true"></span><div class="news-card__body"><h2 class="news-card__title">${escapeHtml(item.title)}</h2>${image}${content}</div></article>`;
}

function appendGroups(list: HTMLElement, html: string): void {
  const template = document.createElement('template');
  template.innerHTML = html;
  const groups = [...template.content.querySelectorAll<HTMLElement>('.news-group')];
  const existing = list.querySelectorAll<HTMLElement>('.news-group');
  const lastGroup = existing.item(existing.length - 1);
  let start = 0;

  if (lastGroup && groups[0]?.dataset.date === lastGroup.dataset.date) {
    const target = lastGroup.querySelector('.news-group__cards');
    groups[0].querySelectorAll('.news-card').forEach((card) => target?.appendChild(card));
    start = 1;
  }

  groups.slice(start).forEach((group) => list.appendChild(group));
}

function dateParts(value?: string): { key: string; datetime: string; label: string } {
  const date = value ? new Date(value.replace(' ', 'T')) : new Date(0);
  const validDate = Number.isNaN(date.getTime()) ? new Date(0) : date;
  return {
    key: validDate.toISOString().slice(0, 10),
    datetime: validDate.toISOString(),
    label: validDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export {};

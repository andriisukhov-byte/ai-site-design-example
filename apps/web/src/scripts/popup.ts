export {};

const OPEN_CLASS = 'is-open';
const LEGACY_OPEN_CLASS = 'show-popup';
const BODY_OPEN_CLASS = 'has-popup-open';

const popupAliases: Record<string, string> = {
  popupRequestDemo: '.popupRequestDemo',
};

let activePopup: HTMLElement | null = null;

function getPopup(name: string) {
  if (!name) {
    return null;
  }

  const selector = popupAliases[name] ?? `.${CSS.escape(name)}`;
  return document.querySelector<HTMLElement>(selector);
}

function openPopup(popup: HTMLElement | null) {
  if (!popup) {
    return;
  }

  if (activePopup && activePopup !== popup) {
    closePopup(activePopup);
  }

  bindCloseHandlersOnce(popup);
  popup.classList.add(OPEN_CLASS, LEGACY_OPEN_CLASS);
  popup.setAttribute('aria-hidden', 'false');
  document.body.classList.add(BODY_OPEN_CLASS);
  activePopup = popup;

  popup.querySelector<HTMLElement>('[data-popup-close]')?.focus({ preventScroll: true });
}

function closePopup(popup: HTMLElement | null) {
  if (!popup) {
    return;
  }

  popup.classList.remove(OPEN_CLASS, LEGACY_OPEN_CLASS);
  popup.setAttribute('aria-hidden', 'true');

  if (activePopup === popup) {
    activePopup = null;
  }

  if (!document.querySelector(`.${OPEN_CLASS}.ca-popup`)) {
    document.body.classList.remove(BODY_OPEN_CLASS);
  }
}

function bindCloseHandlersOnce(popup: HTMLElement) {
  if (popup.dataset.closeBound === '1') {
    return;
  }

  popup.dataset.closeBound = '1';

  popup.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;

    if (target?.closest('[data-popup-close], .closePopup, .closePopup2, .closePopup3, .popup-close, .popup-close2, .popup-close3')) {
      closePopup(popup);
      return;
    }

    if (event.target === popup) {
      closePopup(popup);
    }
  });
}

function popupNameFromHref(element: Element) {
  const href = element.getAttribute('href') || '';
  const prefix = '#popup-open-';
  return href.startsWith(prefix) ? href.slice(prefix.length) : '';
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const button = target?.closest<HTMLElement>("[data-popup], a[href^='#popup-open-'], .openPopup, .openPopup2, .openPopup3");

  if (!button) {
    return;
  }

  event.preventDefault();

  let popupClass = button.dataset.popup || popupNameFromHref(button);

  if (!popupClass) {
    return;
  }

  openPopup(getPopup(popupClass));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activePopup) {
    closePopup(activePopup);
  }
});

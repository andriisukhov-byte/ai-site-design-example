export {};

const positionLogoDecor = (root: Element) => {
  const logo = root.querySelector<HTMLElement>('.contact-us__logo-wrap');
  const form = root.querySelector<HTMLElement>('.contact-us__form-card');

  if (!logo || !form) {
    logo?.style.removeProperty('--contact-us-logo-line-width');
    logo?.style.removeProperty('--contact-us-logo-line-height');
    return;
  }

  const logoRect = logo.getBoundingClientRect();
  const formRect = form.getBoundingClientRect();

  if (window.matchMedia('(max-width: 600px)').matches) {
    const lineHeight = Math.max(0, formRect.top - logoRect.bottom);
    logo.style.removeProperty('--contact-us-logo-line-width');
    logo.style.setProperty('--contact-us-logo-line-height', `${lineHeight}px`);
    return;
  }

  logo.style.removeProperty('--contact-us-logo-line-height');

  if (window.matchMedia('(max-width: 991px)').matches) {
    logo.style.removeProperty('--contact-us-logo-line-width');
    return;
  }

  const lineWidth = Math.max(0, formRect.left - logoRect.right);
  logo.style.setProperty('--contact-us-logo-line-width', `${lineWidth}px`);
};

const roots = () => document.querySelectorAll<HTMLElement>('[data-contact-us]');
const init = () => {
  roots().forEach((root) => {
    positionLogoDecor(root);
    window.setTimeout(() => {
      positionLogoDecor(root);
    }, 150);
    window.setTimeout(() => {
      positionLogoDecor(root);
    }, 700);
  });
};

const updateDecor = () => roots().forEach(positionLogoDecor);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('load', updateDecor);
window.addEventListener('resize', updateDecor);

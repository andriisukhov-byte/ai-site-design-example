import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';

function initTestimonial(root: Element): void {
  const slider = root.querySelector<HTMLElement>('[data-testimonial-slider]');
  const prev = root.querySelector<HTMLElement>('[data-testimonial-prev]');
  const next = root.querySelector<HTMLElement>('[data-testimonial-next]');

  if (!slider || !prev || !next || slider.classList.contains('swiper-initialized')) {
    return;
  }

  const slidesCount = slider.querySelectorAll('.swiper-slide').length;
  const canLoop = slidesCount > 1;

  new Swiper(slider, {
    modules: [A11y, Autoplay, Keyboard, Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    autoHeight: true,
    loop: canLoop,
    watchOverflow: !canLoop,
    speed: 650,
    autoplay: canLoop ? {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false,
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      prevSlideMessage: 'Previous testimonial',
      nextSlideMessage: 'Next testimonial',
    },
  });
}

export function initTestimonials(root: ParentNode = document): void {
  root.querySelectorAll('[data-testimonial]').forEach(initTestimonial);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initTestimonials(), { once: true });
} else {
  initTestimonials();
}

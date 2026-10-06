import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const SVG_NS = "http://www.w3.org/2000/svg";
const CORNER = 14;
const DESKTOP_QUERY = "(min-width: 992px)";

function initAgentCapabilitiesBlock(block: Element): void {
  if (block.getAttribute("data-capability-preview") === "1") return;

  const items = Array.from(
    block.querySelectorAll<HTMLElement>("[data-capability-icon]"),
  );
  const panels = Array.from(
    block.querySelectorAll<HTMLElement>("[data-capability-panel]"),
  );
  const prev = block.querySelector<HTMLButtonElement>("[data-capability-prev]");
  const next = block.querySelector<HTMLButtonElement>("[data-capability-next]");
  const swiperElement = block.querySelector<HTMLElement>(
    "[data-capability-swiper]",
  );
  const layout = block.querySelector<HTMLElement>(
    ".agent-capabilities__layout",
  );
  const grid = block.querySelector<HTMLElement>(".agent-capabilities__grid");
  const card = block.querySelector<HTMLElement>(".agent-capabilities__card");
  const badge = block.querySelector<HTMLElement>(".agent-capabilities__badge");
  const button = block.querySelector<HTMLAnchorElement>(
    "[data-capability-button]",
  );
  const buttonLabel = block.querySelector<HTMLElement>(
    "[data-capability-button-label]",
  );
  const side =
    block.getAttribute("data-capability-side") === "right" ? "right" : "left";

  if (!items.length || !panels.length || !swiperElement) return;

  const shouldAutoplay =
    block.getAttribute("data-capability-autoplay") === "true" &&
    items.length > 1;
  const parsedInterval = Number.parseInt(
    block.getAttribute("data-capability-autoplay-interval") || "5000",
    10,
  );
  const autoplayInterval = Number.isFinite(parsedInterval)
    ? Math.max(2000, parsedInterval)
    : 5000;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const render = (activeIndex: number): void => {
    items.forEach((item, index) => {
      const active = index === activeIndex;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    panels.forEach((panel, index) => {
      const active = index === activeIndex;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", String(!active));
    });

    if (!button) return;
    const activePanel = panels[activeIndex];
    const url = activePanel?.getAttribute("data-capability-link-url");
    if (!url) {
      button.classList.add("is-hidden");
      return;
    }
    button.href = url;
    if (buttonLabel)
      buttonLabel.textContent =
        activePanel.getAttribute("data-capability-link-label") || "Get more";
    const target = activePanel.getAttribute("data-capability-link-target");
    if (target) button.setAttribute("target", target);
    else button.removeAttribute("target");
    button.classList.remove("is-hidden");
  };

  let connector: SVGSVGElement | null = null;
  const removeConnector = (): void => {
    connector?.remove();
    connector = null;
  };
  const drawConnector = (): void => {
    const anchor = side === "right" ? card : badge;
    if (
      !layout ||
      !grid ||
      !card ||
      !anchor ||
      items.length < 2 ||
      !window.matchMedia(DESKTOP_QUERY).matches
    ) {
      removeConnector();
      return;
    }
    const origin = layout.getBoundingClientRect();
    const centerOf = (element: Element) => {
      const badgeBox = element
        .querySelector<HTMLElement>(".agent-capabilities__item-badge")
        ?.getBoundingClientRect();
      return badgeBox
        ? {
            x: badgeBox.left + badgeBox.width / 2 - origin.left,
            y: badgeBox.top + badgeBox.height / 2 - origin.top,
          }
        : null;
    };
    const columns: { x: number; top: number; bot: number; count: number }[] =
      [];
    items.forEach((item) => {
      const center = centerOf(item);
      if (!center) return;
      const column = columns.find((entry) => Math.abs(entry.x - center.x) < 24);
      if (!column)
        columns.push({ x: center.x, top: center.y, bot: center.y, count: 1 });
      else {
        column.top = Math.min(column.top, center.y);
        column.bot = Math.max(column.bot, center.y);
        column.x = (column.x * column.count + center.x) / (column.count + 1);
        column.count += 1;
      }
    });
    if (columns.length < 2) {
      removeConnector();
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const cardBottom = cardRect.bottom - origin.top;
    const anchorBottom = anchorRect.bottom - origin.top;
    const risers = columns.map((column) => ({
      x: column.x,
      startY: column.top,
    }));
    risers.push({
      x: anchorRect.left + anchorRect.width / 2 - origin.left,
      startY: cardBottom,
    });
    risers.sort((a, b) => a.x - b.x);
    const spineY =
      Math.max(...columns.map((column) => column.bot), anchorBottom) + 28;
    const first = risers[0];
    const last = risers[risers.length - 1];
    const main = `M ${first.x} ${first.startY} L ${first.x} ${spineY - CORNER} Q ${first.x} ${spineY} ${first.x + CORNER} ${spineY} L ${last.x - CORNER} ${spineY} Q ${last.x} ${spineY} ${last.x} ${spineY - CORNER} L ${last.x} ${last.startY}`;
    const drops = risers
      .slice(1, -1)
      .map((riser) => `M ${riser.x} ${riser.startY} L ${riser.x} ${spineY}`)
      .join(" ");
    const height = spineY + 4;
    if (!connector) {
      connector = document.createElementNS(SVG_NS, "svg");
      connector.classList.add("agent-capabilities__connector");
      connector.setAttribute("aria-hidden", "true");
      connector.setAttribute("preserveAspectRatio", "none");
      connector.append(
        document.createElementNS(SVG_NS, "path"),
        document.createElementNS(SVG_NS, "path"),
      );
      layout.prepend(connector);
    }
    connector.style.height = `${Math.round(height)}px`;
    connector.setAttribute(
      "viewBox",
      `0 0 ${Math.round(origin.width)} ${Math.round(height)}`,
    );
    const paths = connector.querySelectorAll("path");
    paths[0].setAttribute("d", main);
    paths[1].setAttribute("d", drops);
  };

  const swiper = new Swiper(swiperElement, {
    modules: [Autoplay, EffectFade, Navigation],
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    allowTouchMove: false,
    speed: 450,
    navigation: prev && next ? { prevEl: prev, nextEl: next } : undefined,
    autoplay:
      shouldAutoplay && !prefersReducedMotion
        ? {
            delay: autoplayInterval,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    on: {
      init(instance) {
        render(instance.realIndex);
        drawConnector();
      },
      slideChange(instance) {
        render(instance.realIndex);
        drawConnector();
      },
    },
  });

  items.forEach((item, index) =>
    item.addEventListener("click", () => swiper.slideTo(index)),
  );
  block.addEventListener("focusin", () => swiper.autoplay?.stop());
  block.addEventListener("focusout", () => swiper.autoplay?.start());

  let resizeRaf: number | undefined;
  const scheduleDraw = (): void => {
    if (resizeRaf !== undefined) window.cancelAnimationFrame(resizeRaf);
    resizeRaf = window.requestAnimationFrame(drawConnector);
  };
  window.addEventListener("resize", scheduleDraw, { passive: true });
  window.addEventListener("load", drawConnector);
  if ("ResizeObserver" in window && layout)
    new ResizeObserver(scheduleDraw).observe(layout);
  document.fonts?.ready.then(drawConnector);
}

export function initAgentCapabilities(root: ParentNode = document): void {
  root
    .querySelectorAll("[data-agent-capabilities]")
    .forEach(initAgentCapabilitiesBlock);
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", () => initAgentCapabilities(), {
    once: true,
  });
else initAgentCapabilities();

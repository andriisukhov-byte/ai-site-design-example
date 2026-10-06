import { useEffect, useId, useRef, useState } from "react";

export type TabsShowcaseIcon = string;

type ImageValue = {
  src: string;
  alt?: string;
};

export type TabsShowcaseStep = {
  text: string;
  icon?: TabsShowcaseIcon;
  customIcon?: ImageValue;
};

export type TabsShowcaseTab = {
  label: string;
  icon?: TabsShowcaseIcon;
  customIcon?: ImageValue;
  steps: TabsShowcaseStep[];
};

export type TabsShowcaseData = {
  type?: "tabs-showcase";
  background?: "white" | "gray";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  autoplaySeconds?: number;
  tabs: TabsShowcaseTab[];
};

type Props = {
  tabs: TabsShowcaseTab[];
  autoplayMs: number;
  ariaLabel: string;
};

const tabIcons = new Set([
  "briefcase",
  "shopping-basket",
  "hand-heart",
  "layers",
  "users",
  "stethoscope",
  "graduation-cap",
  "line-chart",
  "building",
  "shopping-cart",
  "headset",
  "megaphone",
]);

const stepIcons = new Set([
  "phone-outgoing",
  "bot",
  "loader",
  "calendar-days",
  "mail-check",
  "siren",
  "message-circle-question",
  "monitor-dot",
  "clipboard-check",
  "file-pen-line",
  "calendar-clock",
  "file-question",
  "user-check",
  "calendar-check-2",
  "folder-check",
  "folder-symlink",
  "mail-plus",
  "refresh-ccw-dot",
]);

export default function TabsShowcaseIsland({
  tabs,
  autoplayMs,
  ariaLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const idPrefix = `tabs-showcase-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const redraw = () => drawConnectors(panelRefs.current[activeIndex]);
    const frame = requestAnimationFrame(redraw);
    window.addEventListener("resize", redraw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", redraw);
    };
  }, [activeIndex, tabs]);

  useEffect(() => {
    if (
      userPaused ||
      hovered ||
      !visible ||
      autoplayMs <= 0 ||
      tabs.length <= 1 ||
      window.matchMedia("(max-width: 767px)").matches
    )
      return;
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % tabs.length),
      autoplayMs,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplayMs, hovered, tabs.length, userPaused, visible]);

  const activate = (index: number, pause = true) => {
    if (pause) setUserPaused(true);
    setActiveIndex(index);
  };

  return (
    <div
      ref={rootRef}
      className="tabs-showcase__layout"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="tabs-showcase__tabs"
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              className={`tabs-showcase__tab${selected ? " is-active" : ""}`}
              key={`${tab.label}-${index}`}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(index)}
              onFocus={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  const next = (index + 1) % tabs.length;
                  activate(next);
                  (
                    event.currentTarget.parentElement?.children[next] as
                      | HTMLElement
                      | undefined
                  )?.focus();
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next = (index - 1 + tabs.length) % tabs.length;
                  activate(next);
                  (
                    event.currentTarget.parentElement?.children[next] as
                      | HTMLElement
                      | undefined
                  )?.focus();
                }
              }}
            >
              <span className="tabs-showcase__tab-leading">
                <IconOrImage
                  customIcon={tab.customIcon}
                  icon={tab.icon}
                  iconSet={tabIcons}
                  directory="icons"
                  wrapperClass="tabs-showcase__tab-icon"
                  glyphClass="tabs-showcase__tab-icon-glyph"
                />
                <span className="tabs-showcase__tab-label">{tab.label}</span>
              </span>
              <span className="tabs-showcase__tab-arrow" aria-hidden="true">
                <Arrow />
              </span>
              {autoplayMs > 0 && (
                <span
                  className="tabs-showcase__tab-progress"
                  aria-hidden="true"
                >
                  <span
                    className={`tabs-showcase__tab-progress-bar${selected && !userPaused ? progressDurationClass(autoplayMs) : ""}`}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="tabs-showcase__panels">
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <div
              className={`tabs-showcase__panel${selected ? " is-active" : ""}`}
              id={`${idPrefix}-panel-${index}`}
              key={`${tab.label}-panel-${index}`}
              ref={(element) => {
                panelRefs.current[index] = element;
              }}
              role="tabpanel"
              aria-hidden={!selected}
              aria-labelledby={`${idPrefix}-tab-${index}`}
            >
              {tab.steps.length > 0 && <StepFlow steps={tab.steps} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepFlow({ steps }: { steps: TabsShowcaseStep[] }) {
  const flowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => drawConnectors(flowRef.current));
    return () => cancelAnimationFrame(frame);
  }, [steps]);
  return (
    <div
      ref={flowRef}
      className="tabs-showcase__flow"
      data-step-count={steps.length}
    >
      <svg
        className="tabs-showcase__connectors"
        aria-hidden="true"
        preserveAspectRatio="none"
      />
      <div className="tabs-showcase__steps">
        {steps.map((step, index) => (
          <div
            className="tabs-showcase__step"
            data-step={index}
            key={`${step.text}-${index}`}
          >
            <IconOrImage
              customIcon={step.customIcon}
              icon={step.icon}
              iconSet={stepIcons}
              directory="icons/steps"
              wrapperClass="tabs-showcase__step-icon"
              glyphClass="tabs-showcase__step-icon-glyph"
            />
            <span className="tabs-showcase__step-text">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Icon({
  name,
  directory,
  className,
}: {
  name: string;
  directory: string;
  className: string;
}) {
  const iconClass = `tabs-showcase__icon--${directory.replace(/\//g, "-")}-${name}`;

  return (
    <span
      className={`${className} ${iconClass}`}
      aria-hidden="true"
    />
  );
}

function progressDurationClass(autoplayMs: number) {
  const seconds = Math.round(autoplayMs / 1000);
  const clamped = Math.min(30, Math.max(1, seconds));

  return ` tabs-showcase__tab-progress-bar--${clamped}s`;
}

function IconOrImage({
  customIcon,
  icon,
  iconSet,
  directory,
  wrapperClass,
  glyphClass,
}: {
  customIcon?: ImageValue;
  icon?: string;
  iconSet: Set<string>;
  directory: string;
  wrapperClass: string;
  glyphClass: string;
}) {
  if (customIcon?.src) {
    return (
      <span className={wrapperClass}>
        <img
          src={customIcon.src}
          alt={customIcon.alt ?? ""}
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  if (icon && iconSet.has(icon)) {
    return (
      <span className={wrapperClass}>
        <Icon name={icon} directory={directory} className={glyphClass} />
      </span>
    );
  }

  return null;
}

function Arrow() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function drawConnectors(panel: HTMLDivElement | null) {
  const flow = panel?.querySelector<HTMLElement>("[data-step-count]");
  const svg = flow?.querySelector<SVGElement>(".tabs-showcase__connectors");
  const steps = flow
    ? Array.from(flow.querySelectorAll<HTMLElement>(".tabs-showcase__step"))
    : [];
  if (
    !flow ||
    !svg ||
    steps.length < 2 ||
    window.matchMedia("(max-width: 767px)").matches
  )
    return;
  const rect = flow.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  svg.replaceChildren();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  addConnectorDefs(svg);
  const boxes = steps.map((step) => {
    const box = step.getBoundingClientRect();
    return {
      left: box.left - rect.left,
      right: box.right - rect.left,
      midX: box.left - rect.left + box.width / 2,
      midY: box.top - rect.top + box.height / 2,
    };
  });

  const cornerRadius = 16;
  const outerExtension = 28;

  boxes.slice(0, -1).forEach((from, index) => {
    const to = boxes[index + 1]!;
    const sameRow = Math.abs(from.midY - to.midY) < 8;

    if (sameRow) {
      const fromX = to.midX >= from.midX ? from.right : from.left;
      const toX = to.midX >= from.midX ? to.left : to.right;
      addConnectorPath(svg, `M ${fromX} ${from.midY} L ${toX} ${to.midY}`);
      addConnectorDot(svg, fromX, from.midY);
      return;
    }

    const directionY = to.midY >= from.midY ? 1 : -1;
    const radius = Math.min(cornerRadius, Math.abs(to.midY - from.midY) / 2);
    const loopRight = (from.midX + to.midX) / 2 >= rect.width / 2;
    const fromX = loopRight ? from.right : from.left;
    const toX = loopRight ? to.right : to.left;
    const channelX = loopRight
      ? Math.min(Math.max(from.right, to.right) + outerExtension, rect.width + 30)
      : Math.max(Math.min(from.left, to.left) - outerExtension, -30);
    const stepBack = loopRight ? -1 : 1;

    addConnectorPath(
      svg,
      `M ${fromX} ${from.midY}` +
        ` L ${channelX + stepBack * radius} ${from.midY}` +
        ` Q ${channelX} ${from.midY} ${channelX} ${from.midY + directionY * radius}` +
        ` L ${channelX} ${to.midY - directionY * radius}` +
        ` Q ${channelX} ${to.midY} ${channelX + stepBack * radius} ${to.midY}` +
        ` L ${toX} ${to.midY}`,
    );
    addConnectorDot(svg, fromX, from.midY);
  });
}

function addConnectorDefs(svg: SVGElement) {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  gradient.setAttribute("id", "tabs-showcase-dot-gradient");
  gradient.setAttribute("x1", "0");
  gradient.setAttribute("y1", "0");
  gradient.setAttribute("x2", "1");
  gradient.setAttribute("y2", "0.21");

  [
    ["0", "#3A87D9"],
    ["0.25", "#2F1A6B"],
    ["0.5", "#200000"],
    ["0.75", "#AD3822"],
    ["1", "#F7A75F"],
  ].forEach(([offset, color]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    gradient.appendChild(stop);
  });

  defs.appendChild(gradient);
  svg.appendChild(defs);
}

function addConnectorPath(svg: SVGElement, d: string) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#B9B9B9");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-dasharray", "6 6");
  path.setAttribute("stroke-linecap", "round");
  svg.appendChild(path);
}

function addConnectorDot(svg: SVGElement, x: number, y: number) {
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", String(x));
  dot.setAttribute("cy", String(y));
  dot.setAttribute("r", "7");
  dot.setAttribute("fill", "url(#tabs-showcase-dot-gradient)");
  dot.setAttribute("stroke", "#fff");
  dot.setAttribute("stroke-width", "2");
  svg.appendChild(dot);
}

import { useEffect, useMemo, useState } from 'react';
import type { MegaMenuEntry, PrimaryNavigationItem, SiteChromeConfig } from '@acme/config';

type HeaderProps = {
  chrome: SiteChromeConfig;
};

type MegaMenuColumn = MegaMenuEntry[];

type MegaMenuRow = {
  columns: MegaMenuColumn[];
};

export function Header({ chrome }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePanel(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 0);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const headerClassName = [
    'site-header',
    isScrolled ? 'is-scrolled' : '',
    isOpen ? 'is-menu-open' : '',
    activePanel ? 'has-active-panel' : '',
  ].filter(Boolean).join(' ');

  const closeMenu = () => {
    setActivePanel(null);
    setIsOpen(false);
  };

  return (
    <header className={headerClassName}>
      <nav className="site-header__nav" aria-label="Primary menu">
        <button
          className="site-header__icon-button site-header__toggle"
          type="button"
          aria-controls="site-primary-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => {
            setActivePanel(null);
            setIsOpen((value) => !value);
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="site-header__logo-link" href="/" aria-label={`${chrome.siteName} home`} onClick={closeMenu}>
          <img
            className="site-header__logo"
            src={chrome.logo.src}
            width={chrome.logo.width}
            height={chrome.logo.height}
            alt={chrome.siteName}
          />
        </a>

        <div className="site-header__panel" id="site-primary-menu">
          <ul className="site-header__menu">
            {chrome.primaryNavigation.map((item) => (
              <NavigationEntry
                activePanel={activePanel}
                item={item}
                key={`${item.label}:${item.href}`}
                onClose={closeMenu}
                onOpenPanel={setActivePanel}
              />
            ))}
          </ul>

          <div className="site-header__actions">
            <a className="site-header__button site-header__button--secondary" href={chrome.headerActions.demo.href}>
              {chrome.headerActions.demo.label}
            </a>
            <a className="site-header__button site-header__button--primary" href={chrome.headerActions.startFree.href}>
              {chrome.headerActions.startFree.label}
            </a>
          </div>
        </div>

        <a className="site-header__icon-button site-header__account" href={chrome.headerActions.login.href} aria-label={chrome.headerActions.login.label}>
          <svg className="site-header__icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </nav>
    </header>
  );
}

function NavigationEntry({
  activePanel,
  item,
  onClose,
  onOpenPanel,
}: {
  activePanel: string | null;
  item: PrimaryNavigationItem;
  onClose: () => void;
  onOpenPanel: (label: string | null) => void;
}) {
  const hasMega = item.variant === 'mega' && Boolean(item.items?.length);
  const isActive = activePanel === item.label;
  const className = [
    'site-header__menu-item',
    hasMega ? 'has-mega' : '',
    isActive ? 'is-active' : '',
  ].filter(Boolean).join(' ');

  return (
    <li className={className}>
      <a
        className="site-header__menu-link"
        href={item.href}
        aria-expanded={hasMega ? isActive : undefined}
        onClick={(event) => {
          if (hasMega && isTouchMenu()) {
            event.preventDefault();
            onOpenPanel(item.label);
          } else {
            onClose();
          }
        }}
      >
        {item.label}
      </a>
      {hasMega && <MegaMenu item={item} onBack={() => onOpenPanel(null)} onClose={onClose} />}
    </li>
  );
}

function MegaMenu({ item, onBack, onClose }: { item: PrimaryNavigationItem; onBack: () => void; onClose: () => void }) {
  const layout = useMemo(() => buildMegaMenuLayout(item.items ?? []), [item.items]);

  return (
    <div className="site-mega" aria-label={`${item.label} menu`}>
      <button className="site-mega__back" type="button" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {item.label}
      </button>

      {layout.rows.map((row, rowIndex) => (
        <div className="site-mega__row" key={`${item.label}:row:${rowIndex}`}>
          {row.columns.map((column, columnIndex) => (
            <div className="site-mega__col" key={`${item.label}:row:${rowIndex}:col:${columnIndex}`}>
              {column.map((entry) => <MegaMenuEntryView entry={entry} key={`${entry.label}:${entry.href}`} onClose={onClose} />)}
            </div>
          ))}
        </div>
      ))}

      {layout.allItems.length > 0 && (
        <>
          <div className="site-mega__foot-divider" />
          {layout.allItems.map((entry) => (
            <a className="site-mega__all" href={entry.href} key={`${entry.label}:${entry.href}`} onClick={onClose}>
              {entry.label}
              <svg className="site-mega__all-arrow" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </>
      )}
    </div>
  );
}

function MegaMenuEntryView({ entry, onClose }: { entry: MegaMenuEntry; onClose: () => void }) {
  if (entry.role === 'heading' || entry.role === 'span-heading') {
    const className = entry.role === 'span-heading' ? 'site-mega__heading site-mega__heading--span' : 'site-mega__heading';
    return <div className={className}>{entry.label}</div>;
  }

  return (
    <a className="site-mega__link" href={entry.href} onClick={onClose}>
      {entry.icon && <span className={`site-mega__link-icon site-mega__link-icon--${entry.icon}`} aria-hidden="true" data-icon={entry.icon} />}
      <span>{entry.label}</span>
    </a>
  );
}

function buildMegaMenuLayout(entries: MegaMenuEntry[]) {
  const rows: MegaMenuRow[] = [{ columns: [[]] }];
  const allItems: MegaMenuEntry[] = [];

  for (const entry of entries) {
    if (entry.role === 'all') {
      allItems.push(entry);
      continue;
    }

    if (entry.startRow && lastColumn(rows).length > 0) {
      rows.push({ columns: [[]] });
    }

    if (entry.startColumn && lastColumn(rows).length > 0) {
      rows[rows.length - 1]!.columns.push([]);
    }

    lastColumn(rows).push(entry);
  }

  return {
    rows: rows
      .map((row) => ({ columns: row.columns.filter((column) => column.length > 0) }))
      .filter((row) => row.columns.length > 0),
    allItems,
  };
}

function lastColumn(rows: MegaMenuRow[]) {
  const row = rows[rows.length - 1]!;
  return row.columns[row.columns.length - 1]!;
}

function isTouchMenu() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1150px)').matches;
}

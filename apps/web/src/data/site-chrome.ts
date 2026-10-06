import {
  siteChrome,
  type MegaMenuEntry,
  type PrimaryNavigationItem,
  type SiteChromeConfig,
} from '@acme/config';

type SiteSettingsResponse = {
  siteName?: unknown;
  siteUrl?: unknown;
  primaryNavigation?: unknown;
};

export async function getSiteChrome(): Promise<SiteChromeConfig> {
  const apiUrl = (
    process.env.PAYLOAD_API_URL ?? import.meta.env.PAYLOAD_API_URL
  )?.trim();
  if (!apiUrl) return siteChrome;

  try {
    const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/globals/site-settings`, {
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`site-settings returned HTTP ${response.status}`);

    const settings = await response.json() as SiteSettingsResponse;
    const navigation = parseNavigation(settings.primaryNavigation);
    return {
      ...siteChrome,
      ...(typeof settings.siteName === 'string' && settings.siteName.trim() ? { siteName: settings.siteName } : {}),
      ...(typeof settings.siteUrl === 'string' && settings.siteUrl.trim() ? { siteUrl: settings.siteUrl } : {}),
      ...(navigation.length ? { primaryNavigation: navigation } : {}),
    };
  } catch (error) {
    console.warn(`[content] site-settings fetch failed; using checked-in chrome: ${error instanceof Error ? error.message : String(error)}`);
    return siteChrome;
  }
}

function parseNavigation(value: unknown): PrimaryNavigationItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.label !== 'string' || !record.label.trim() || typeof record.href !== 'string' || !record.href.trim()) return [];
    const variant = record.variant === 'mega' ? 'mega' : 'link';
    return [{
      label: record.label,
      href: record.href,
      variant,
      ...(variant === 'mega' ? { items: parseMegaItems(record.items) } : {}),
    }];
  });
}

function parseMegaItems(value: unknown): MegaMenuEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.label !== 'string' || !record.label.trim() || typeof record.href !== 'string' || !record.href.trim()) return [];
    const role = ['link', 'heading', 'span-heading', 'all'].includes(String(record.role))
      ? record.role as MegaMenuEntry['role']
      : 'link';
    return [{
      label: record.label,
      href: record.href,
      role,
      ...(typeof record.icon === 'string' && record.icon.trim() ? { icon: record.icon } : {}),
      ...(record.startColumn === true ? { startColumn: true } : {}),
      ...(record.startRow === true ? { startRow: true } : {}),
    }];
  });
}

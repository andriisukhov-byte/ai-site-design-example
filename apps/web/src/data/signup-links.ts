import { resolveSignupHref } from '@acme/config';

export function resolveSignupLinks<T>(value: T, pathname: string): T {
  return resolveValue(value, pathname) as T;
}

export function resolveSignupHrefsInHtml(html: string, pathname: string): string {
  return html.replace(
    /\bhref\s*=\s*(["'])(.*?)\1/gi,
    (attribute, quote: string, href: string) => {
      const resolvedHref = resolveSignupHref(href, pathname);
      return resolvedHref === href ? attribute : `href=${quote}${resolvedHref}${quote}`;
    },
  );
}

function resolveValue(value: unknown, pathname: string, key?: string): unknown {
  if (typeof value === 'string') {
    if (key === 'href' || key === 'url') {
      return resolveSignupHref(value, pathname);
    }

    if (key?.toLowerCase().includes('html')) {
      return resolveSignupHrefsInHtml(value, pathname);
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, pathname));
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      resolveValue(entryValue, pathname, entryKey),
    ]),
  );
}

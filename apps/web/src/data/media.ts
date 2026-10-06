const mediaPath = /(^|[^a-zA-Z0-9])\/media\//g;

function configuredMediaBaseUrl(): string {
  const value = (
    process.env.PUBLIC_MEDIA_BASE_URL ||
    import.meta.env?.PUBLIC_MEDIA_BASE_URL ||
    ""
  )
    .trim()
    .replace(/\/+$/, "");
  if (value && !/^https?:\/\//i.test(value)) {
    throw new Error("PUBLIC_MEDIA_BASE_URL must be an absolute HTTP(S) URL.");
  }
  return value;
}

export function resolveMediaUrl(
  value: string,
  mediaBaseUrl = configuredMediaBaseUrl(),
): string {
  if (!mediaBaseUrl) {
    return value;
  }

  const baseUrl = mediaBaseUrl.replace(/\/+$/, "");
  return value.replace(
    mediaPath,
    (_match, prefix: string) => `${prefix}${baseUrl}/media/`,
  );
}

export function resolveMediaUrls<T>(
  value: T,
  mediaBaseUrl = configuredMediaBaseUrl(),
): T {
  if (typeof value === "string") {
    return resolveMediaUrl(value, mediaBaseUrl) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveMediaUrls(item, mediaBaseUrl)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveMediaUrls(item, mediaBaseUrl),
      ]),
    ) as T;
  }

  return value;
}

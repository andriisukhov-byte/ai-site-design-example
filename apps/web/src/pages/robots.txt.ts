import { siteChrome } from '@acme/config';

import { absoluteUrl } from '../data/site-index';

export function GET() {
  const text =
    import.meta.env.PUBLIC_SITE_NOINDEX === 'true'
      ? ['User-agent: *', 'Disallow: /', ''].join('\n')
      : [
          'User-agent: *',
          'Allow: /',
          '',
          `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
          `Host: ${new URL(siteChrome.siteUrl).host}`,
          '',
        ].join('\n');

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

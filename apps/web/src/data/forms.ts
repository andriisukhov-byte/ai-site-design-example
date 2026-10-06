export type FormIntent = 'contact' | 'enterprise' | 'blog-subscribe' | 'request-demo';

const defaultFormEndpoint = '/api/forms/submit';
const fallbackFormEndpoint = normalizeEndpoint(
  process.env.PUBLIC_FORM_ENDPOINT ?? import.meta.env.PUBLIC_FORM_ENDPOINT,
);

const endpointsByIntent: Record<FormIntent, string> = {
  contact: endpointFor(
    process.env.PUBLIC_FORM_ENDPOINT_CONTACT ??
      import.meta.env.PUBLIC_FORM_ENDPOINT_CONTACT,
  ),
  enterprise: endpointFor(
    process.env.PUBLIC_FORM_ENDPOINT_ENTERPRISE ??
      import.meta.env.PUBLIC_FORM_ENDPOINT_ENTERPRISE,
  ),
  'blog-subscribe': endpointFor(
    process.env.PUBLIC_FORM_ENDPOINT_BLOG_SUBSCRIBE ??
      import.meta.env.PUBLIC_FORM_ENDPOINT_BLOG_SUBSCRIBE,
  ),
  'request-demo': endpointFor(
    process.env.PUBLIC_FORM_ENDPOINT_REQUEST_DEMO ??
      import.meta.env.PUBLIC_FORM_ENDPOINT_REQUEST_DEMO,
  ),
};

export function formEndpointFor(intent: FormIntent): string {
  return endpointsByIntent[intent];
}

export const formSuccessRedirects = {
  contact: '/contact-us/thanks-page/',
  requestDemo: '/contact-us/demo-thanks-page/',
  enterprise: '/contact-us/thanks-page/',
  newsletter: '/contact-us/thanks-page/',
} as const;

export function formSuccessRedirectFor(intent: FormIntent): string {
  switch (intent) {
    case 'request-demo':
      return formSuccessRedirects.requestDemo;
    case 'blog-subscribe':
      return formSuccessRedirects.newsletter;
    default:
      return formSuccessRedirects[intent];
  }
}

function normalizeEndpoint(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') {
    return defaultFormEndpoint;
  }

  return value.trim();
}

function endpointFor(value: unknown, fallback = fallbackFormEndpoint): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

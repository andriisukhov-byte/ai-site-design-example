import posthog from 'posthog-js';

const projectApiKey = import.meta.env.PUBLIC_POSTHOG_KEY?.trim();

if (projectApiKey) {
  posthog.init(projectApiKey, {
    api_host: import.meta.env.PUBLIC_POSTHOG_HOST?.trim() || 'https://eu.i.posthog.com',
    defaults: '2026-05-30',
  });
}

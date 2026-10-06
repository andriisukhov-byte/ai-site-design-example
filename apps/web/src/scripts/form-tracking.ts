export {};

const FORM_SELECTOR = 'form[data-acme-form]';
const TRACKING_FIELD_SELECTOR = '[data-form-tracking-field]';

const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

const gtmStorageFields = {
  allpages_visited: 'allPagesVisited',
  first_page_visited: 'firstPageVisited',
  visitor_country: 'visitorCountry',
  visitor_city: 'visitorCity',
  visitor_continent: 'visitorContinent',
  visitor_calling_code: 'visitorCallingCode',
  visitor_channel: 'visitorChannel',
} as const;

function storageValue(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function sessionValue(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function storeSessionValue(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Form submission must continue when storage is unavailable.
  }
}

function currentTime(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function utmValue(name: typeof UTM_FIELDS[number], params: URLSearchParams): string {
  const fromUrl = params.get(name)?.trim() ?? '';

  if (fromUrl) {
    storeSessionValue(name, fromUrl);
    return fromUrl;
  }

  return sessionValue(name);
}

function setFieldValue(form: HTMLFormElement, name: string, value: string) {
  const field = form.querySelector<HTMLInputElement>(`input${TRACKING_FIELD_SELECTOR}[data-form-tracking-field="${name}"]`);

  if (field) {
    field.value = value;
  }
}

function populateTracking(form: HTMLFormElement) {
  const params = new URLSearchParams(window.location.search);

  setFieldValue(form, 'referrer', document.referrer);
  setFieldValue(form, 'source', window.location.href);
  setFieldValue(form, 'current-time', currentTime());

  for (const name of UTM_FIELDS) {
    setFieldValue(form, name, utmValue(name, params));
  }

  for (const [fieldName, storageKey] of Object.entries(gtmStorageFields)) {
    const value = storageValue(storageKey);
    if (value) {
      setFieldValue(form, fieldName, value);
    }
  }
}

function populateAllForms() {
  document.querySelectorAll<HTMLFormElement>(FORM_SELECTOR).forEach(populateTracking);
}

populateAllForms();

document.addEventListener('submit', (event) => {
  const form = event.target instanceof HTMLFormElement ? event.target : undefined;

  if (form?.matches(FORM_SELECTOR)) {
    populateTracking(form);
  }
});

export {};

const FORM_SELECTOR = 'form[data-acme-form]';
const STATUS_SELECTOR = '[data-form-status]';

function setStatus(form: HTMLFormElement, message: string, state: 'idle' | 'success' | 'error') {
  const status = form.querySelector<HTMLElement>(STATUS_SELECTOR);

  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.state = state;
}

function setSubmitting(form: HTMLFormElement, submitting: boolean) {
  form.toggleAttribute('data-submitting', submitting);
  form.querySelectorAll<HTMLButtonElement>('button[type="submit"]').forEach((button) => {
    button.disabled = submitting;
  });
}

async function submitForm(form: HTMLFormElement) {
  const action = form.action;

  if (!action) {
    return;
  }

  setSubmitting(form, true);
  setStatus(form, 'Sending...', 'idle');

  try {
    const response = await fetch(action, {
      method: form.method || 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: new FormData(form),
    });

    const payload = await readJson(response);

    if (!response.ok || payload?.ok === false) {
      throw new Error(responseMessage(payload) || 'Submission failed. Please try again.');
    }

    const redirect = payload?.redirectPath || form.dataset.successRedirect;

    if (typeof redirect === 'string' && redirect.startsWith('/')) {
      window.location.assign(redirect);
      return;
    }

    form.reset();
    setStatus(form, responseMessage(payload) || 'Thanks, your request has been received.', 'success');
  } catch (error) {
    setStatus(form, error instanceof Error ? error.message : 'Submission failed. Please try again.', 'error');
  } finally {
    setSubmitting(form, false);
  }
}

type FormResponse = {
  ok?: boolean;
  message?: unknown;
  redirectPath?: unknown;
  errors?: unknown;
};

async function readJson(response: Response): Promise<FormResponse | undefined> {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return undefined;
  }

  const payload: unknown = await response.json();

  return payload && typeof payload === 'object' ? payload as FormResponse : undefined;
}

function responseMessage(payload: FormResponse | undefined): string | undefined {
  if (typeof payload?.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  if (!Array.isArray(payload?.errors)) {
    return undefined;
  }

  const messages = payload.errors
    .map((error) => typeof error === 'string'
      ? error
      : error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
        ? error.message
        : undefined)
    .filter((message): message is string => Boolean(message?.trim()));

  return messages.join(' ');
}

document.addEventListener('submit', (event) => {
  const form = event.target instanceof HTMLFormElement ? event.target : undefined;

  if (!form?.matches(FORM_SELECTOR)) {
    return;
  }

  event.preventDefault();
  void submitForm(form);
});

'use client';

import { cloneElement, useRef, useState, type SyntheticEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Check, Handshake, LoaderCircle, Ship, Sprout } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { localizePath, type Locale } from '@/lib/i18n/config';
import { format } from '@/lib/i18n/format';
import type { InquiryFormCopy } from '@/lib/i18n/form-copy';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type InquiryType = 'buyer' | 'supplier' | 'general';
type FieldName = 'name' | 'company' | 'email' | 'country' | 'details' | 'consent';

const ease = [0.22, 1, 0.36, 1] as const;

const roleIcons: Record<InquiryType, typeof Ship> = { buyer: Ship, supplier: Sprout, general: Handshake };
const roleOrder: InquiryType[] = ['buyer', 'supplier', 'general'];

export function InquiryForm({
  locale,
  copy,
  defaultProduct = '',
  defaultInquiryType = 'buyer',
  defaultMarket = '',
  idPrefix = 'inquiry',
}: {
  locale: Locale;
  copy: InquiryFormCopy;
  defaultProduct?: string;
  defaultInquiryType?: InquiryType;
  defaultMarket?: string;
  /** Stable id prefix (useId is not stable across RSC hydration here). */
  idPrefix?: string;
}) {
  const id = idPrefix;
  // Chinese and Japanese run words together; every other locale spaces the link.
  const spaced = locale !== 'zh' && locale !== 'ja';
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedStart = useRef(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [role, setRole] = useState<InquiryType>(defaultInquiryType);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [detailsLength, setDetailsLength] = useState(0);

  const messages = copy.errors;
  const roles = roleOrder.map((value) => ({ value, icon: roleIcons[value], ...copy.roles[value] }));
  const activeRole = roles.find((item) => item.value === role) ?? roles[0];

  const validateField = (element: HTMLInputElement | HTMLTextAreaElement) => {
    const name = element.name as FieldName;
    if (!(name in messages)) return true;
    const valid =
      element.type === 'checkbox'
        ? (element as HTMLInputElement).checked
        : element.checkValidity() && element.value.trim().length >= (name === 'details' ? 20 : 2);
    setErrors((current) => ({ ...current, [name]: valid ? undefined : messages[name] }));
    return valid;
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-validate]'),
    );
    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      invalid[0].focus();
      setStatus('error');
      setServerMessage('');
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, consent: formData.get('consent') === 'on' }),
      });
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? copy.errors.rateLimited
            : response.status === 422
              ? copy.errors.invalid
              : copy.errors.generic,
        );
      }
      form.reset();
      setDetailsLength(0);
      setStatus('success');
      trackEvent('inquiry_submit_success', { inquiryType: role });
    } catch (error) {
      setStatus('error');
      // Network failures surface browser text; show our own localized copy instead.
      const known = Object.values(copy.errors) as string[];
      setServerMessage(error instanceof Error && known.includes(error.message) ? error.message : copy.errors.generic);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <m.section
          key="success"
          aria-live="polite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="rounded-3xl border border-forest/10 bg-white p-8 text-center md:p-14"
        >
          <m.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-ivory"
          >
            <Check size={28} strokeWidth={1.6} />
          </m.span>
          <p className="eyebrow mt-8 justify-center">{copy.success.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-md font-serif text-[clamp(1.9rem,4vw,2.4rem)] leading-tight">{copy.success.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-stone">{copy.success.body}</p>
          <button
            type="button"
            className="btn btn-outline mt-8"
            onClick={() => setStatus('idle')}
          >
            {copy.success.again}
          </button>
        </m.section>
      ) : (
        <m.form
          key="form"
          ref={formRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="rounded-3xl border border-forest/10 bg-white p-6 md:p-10"
          action="/api/inquiries"
          method="post"
          onSubmit={handleSubmit}
          onFocusCapture={() => {
            if (hasTrackedStart.current) return;
            hasTrackedStart.current = true;
            trackEvent('inquiry_form_start', { inquiryType: role });
          }}
          onBlurCapture={(event) => {
            const target = event.target;
            if (
              (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) &&
              target.dataset.validate !== undefined &&
              target.value
            ) {
              validateField(target);
            }
          }}
          aria-busy={status === 'submitting'}
          noValidate
        >
          <fieldset className="m-0 border-0 p-0">
            <legend className="eyebrow mb-4">{copy.roleLegend}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {roles.map(({ value, label, detail, icon: Icon }) => (
                <label
                  key={value}
                  className={cn(
                    'relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-start transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold',
                    role === value
                      ? 'border-forest bg-forest text-ivory'
                      : 'border-forest/15 hover:border-forest/40',
                  )}
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={value}
                    checked={role === value}
                    onChange={() => setRole(value)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      'grid size-9 shrink-0 place-items-center rounded-full',
                      role === value ? 'bg-sand text-forest' : 'bg-sand-soft',
                    )}
                  >
                    <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold leading-tight">{label}</span>
                    <span className={cn('mt-1 block text-sm', role === value ? 'text-ivory/70' : 'text-stone')}>
                      {detail}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="m-0 mt-10 border-0 p-0">
            <legend className="eyebrow mb-5">{copy.aboutYou}</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${id}-name`} label={copy.fields.name} error={errors.name}>
                <input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={100} data-validate="" />
              </Field>
              <Field id={`${id}-company`} label={copy.fields.company} error={errors.company}>
                <input id={`${id}-company`} name="company" autoComplete="organization" required minLength={2} maxLength={120} data-validate="" />
              </Field>
              <Field id={`${id}-email`} label={copy.fields.email} error={errors.email}>
                <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={180} data-validate="" />
              </Field>
              <Field id={`${id}-country`} label={copy.fields.country} error={errors.country}>
                <input id={`${id}-country`} name="country" autoComplete="country-name" required minLength={2} maxLength={100} defaultValue={defaultMarket} data-validate="" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="m-0 mt-10 border-0 p-0">
            <legend className="eyebrow mb-5">{copy.requirement}</legend>
            <div className="grid gap-5">
              <Field id={`${id}-product`} label={copy.fields.product} optional optionalLabel={copy.optional}>
                <select id={`${id}-product`} name="productInterest" defaultValue={defaultProduct}>
                  <option value="">{copy.fields.productPlaceholder}</option>
                  {copy.productOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                  <option value="Other / not listed">{copy.fields.productOther}</option>
                </select>
              </Field>
              <Field
                id={`${id}-details`}
                label={copy.fields.details}
                error={errors.details}
                hint={
                  <span className={cn(detailsLength > 0 && detailsLength < 20 && 'text-gold-ink')}>
                    {detailsLength < 20 ? format(copy.charsNeeded, { count: 20 - detailsLength }) : `${detailsLength} / 3000`}
                  </span>
                }
              >
                <textarea
                  id={`${id}-details`}
                  name="details"
                  required
                  minLength={20}
                  maxLength={3000}
                  rows={6}
                  placeholder={activeRole.placeholder}
                  onChange={(event) => setDetailsLength(event.target.value.trim().length)}
                  data-validate=""
                />
              </Field>
            </div>
          </fieldset>

          <div className="sr-only" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8">
            <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] text-stone">
              <input
                type="checkbox"
                name="consent"
                required
                data-validate=""
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
                onChange={(event) => validateField(event.currentTarget)}
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-forest"
              />
              <span>
                {copy.consentLead}{spaced ? ' ' : ''}
                <a href={localizePath(locale, '/privacy')} className="text-forest underline decoration-gold underline-offset-3">
                  {copy.privacyPolicy}
                </a>
                {copy.consentEnd} <span aria-hidden="true">*</span>
              </span>
            </label>
            <FieldError id={`${id}-consent-error`} message={errors.consent} />
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-forest/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-sm text-sm text-stone">{copy.commercialNote}</p>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn btn-forest min-w-48 disabled:cursor-wait disabled:opacity-80"
            >
              {status === 'submitting' ? (
                <>
                  <LoaderCircle size={16} strokeWidth={1.8} className="animate-spin" /> {copy.submitting}
                </>
              ) : (
                <>
                  {copy.submit} <ArrowUpRight size={16} strokeWidth={1.6} className="rtl:-scale-x-100" />
                </>
              )}
            </button>
          </div>

          {serverMessage && (
            <p role="alert" className="mt-5 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {serverMessage}
            </p>
          )}
        </m.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional = false,
  optionalLabel = '(optional)',
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  optional?: boolean;
  optionalLabel?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.9rem] font-bold">
          {label}
          {optional ? (
            <span className="ms-2 font-normal text-stone">{optionalLabel}</span>
          ) : (
            <span aria-hidden="true" className="ms-1 text-gold-ink">*</span>
          )}
        </label>
        {hint && <span className="text-xs text-stone">{hint}</span>}
      </div>
      <div
        className={cn(
          'rounded-xl border bg-ivory transition-colors focus-within:border-forest focus-within:bg-white',
          error ? 'border-destructive/60' : 'border-forest/18',
          '[&>input]:h-12 [&>input]:w-full [&>input]:rounded-xl [&>input]:bg-transparent [&>input]:px-4 [&>input]:outline-none',
          '[&>select]:h-12 [&>select]:w-full [&>select]:cursor-pointer [&>select]:rounded-xl [&>select]:bg-transparent [&>select]:px-4 [&>select]:outline-none',
          '[&>textarea]:block [&>textarea]:min-h-40 [&>textarea]:w-full [&>textarea]:resize-y [&>textarea]:rounded-xl [&>textarea]:bg-transparent [&>textarea]:px-4 [&>textarea]:py-3 [&>textarea]:outline-none [&>textarea]:placeholder:text-stone/75',
        )}
      >
        {cloneElement(children, {
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <m.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.25 }}
          className="pt-2 text-sm text-destructive"
        >
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
}

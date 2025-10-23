import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import CUSTOMIZE_CATALOG from '@/utils/customizeCatalog'; // to map labels

// Helpers
function parseBool(v) {
  return v === '1' || v === 'true' || v === true;
}
function safeInt(v, def = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}
function formatMoney(intAmount, currency = 'USD', locale = 'en-US') {
  const fmtCurrency = currency || 'USD';
  const fmtLocale = fmtCurrency === 'USD' ? 'en-US' : locale || 'en-US';
  const str = new Intl.NumberFormat(fmtLocale, {
    style: 'currency',
    currency: fmtCurrency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(intAmount);
  return fmtCurrency === 'USD' ? str.replace('US$', '$') : str;
}

export default function ContactForm() {
  const router = useRouter();

  // url params
  const q = router.query || {};
  const [status, setStatus] = useState('idle');
  const [plan, setPlan] = useState('static'); // 'static' | 'dynamic' | 'seo' | 'complete'
  const [lockPlan, setLockPlan] = useState(false);

  // Pre-fill plan or custom config
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof q.plan === 'string') setPlan(q.plan); // /contact?plan=seo
    if (q.type === 'custom') setLockPlan(true); // /contact?type=custom&...
  }, [router.isReady, q.plan, q.type]);

  // Build a human-readable summary if coming from the customizer
  const customSummary = useMemo(() => {
    if (q.type !== 'custom') return null;

    const currency = (q.currency || 'USD').toString().toUpperCase();
    const estimateLocal = safeInt(q.estimateLocal, 0);

    // Counters
    const counters = {};
    CUSTOMIZE_CATALOG.counters.forEach((c) => {
      counters[c.key] = safeInt(q[c.key], c.included || 0);
    });

    // Toggles
    const toggles = {};
    CUSTOMIZE_CATALOG.toggles.forEach((t) => {
      toggles[t.key] = parseBool(q[t.key]);
    });

    // Pretty lines for UI + email
    const lines = [];
    CUSTOMIZE_CATALOG.counters.forEach((c) => {
      const v = counters[c.key];
      if (v > 0)
        lines.push(`${c.label}: ${v} ${c.unitLabel}${v === 1 ? '' : 's'}`);
    });
    CUSTOMIZE_CATALOG.toggles.forEach((t) => {
      if (toggles[t.key]) lines.push(`${t.label}`);
    });

    return {
      currency,
      estimateLocal,
      lines,
      counters,
      toggles,
    };
  }, [q]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS env vars');
      }

      const form = new FormData(e.currentTarget);
      const payload = {
        plan, // plan key (or 'custom' implied by config_json)
        type: q.type === 'custom' ? 'custom' : 'plan',
        user_name: form.get('name'),
        user_email: form.get('email'),
        user_phone: form.get('phone') || '-',
        message: form.get('message') || '-',
        // Optional extras for your template:
        estimate_local: customSummary
          ? String(customSummary.estimateLocal)
          : '',
        estimate_currency: customSummary ? customSummary.currency : '',
        human_summary: customSummary ? customSummary.lines.join(', ') : '',
        config_json: customSummary
          ? JSON.stringify({
              currency: customSummary.currency,
              estimateLocal: customSummary.estimateLocal,
              planKey: plan,
              counters: customSummary.counters,
              toggles: customSummary.toggles,
              source: typeof window !== 'undefined' ? window.location.href : '',
            })
          : '',
      };

      const result = await emailjs.send(serviceId, templateId, payload, {
        publicKey,
      });
      if (result.status !== 200) throw new Error('EmailJS failed');

      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-5">
      {/* If it’s a custom configuration, show summary card */}
      {customSummary && (
        <div className="rounded-xl border border-cyan-500/30 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Configuration summary</h3>
            <span className="text-sm text-slate-400">
              Est. total:&nbsp;
              <span className="font-semibold text-cyan-300">
                {formatMoney(
                  customSummary.estimateLocal,
                  customSummary.currency
                )}
              </span>
            </span>
          </div>
          <ul className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-300">
            {customSummary.lines.length > 0 ? (
              customSummary.lines.map((line, i) => <li key={i}>• {line}</li>)
            ) : (
              <li>No items selected.</li>
            )}
          </ul>
          <div className="mt-3 text-sm">
            <a
              href="/pricing#customizer"
              className="text-cyan-300 hover:underline"
            >
              Edit configuration
            </a>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full name</label>
          <input
            name="name"
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            name="phone"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
            placeholder="+91 9xxxxxxxxx"
          />
        </div>

        {/* Plan selector — lock if custom */}
        <div>
          <label className="block text-sm mb-1">Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            disabled={!!customSummary || lockPlan}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 disabled:opacity-60"
          >
            <option value="static">Static Website</option>
            <option value="dynamic">Dynamic Website</option>
            <option value="seo">Dynamic with SEO</option>
            <option value="complete">Customized Website</option>
          </select>
          {(customSummary || lockPlan) && (
            <p className="text-xs text-slate-500 mt-1">
              Plan is linked from your previous selection.
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Tell us about your project</label>
        <textarea
          name="message"
          rows="5"
          className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
          placeholder="What do you need? Any references?"
        />
      </div>

      <button className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send request'}
      </button>

      <p className="text-xs text-slate-400">Powered by EmailJS</p>
      {status === 'success' && (
        <p className="text-emerald-400 text-sm">
          Thanks! We’ll contact you shortly via email.
        </p>
      )}
      {status === 'error' && (
        <p className="text-rose-400 text-sm">
          Oops, something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

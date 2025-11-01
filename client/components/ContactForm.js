import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import CUSTOMIZE_CATALOG from '@/utils/customizeCatalog';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Helper utilities
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
  const formRef = useRef();

  // States
  const [status, setStatus] = useState('idle');
  const [plan, setPlan] = useState('others');
  const [lockPlan, setLockPlan] = useState(false);
  const [phone, setPhone] = useState('');

  // Query params setup
  const q = router.query || {};
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof q.plan === 'string') setPlan(q.plan);
    if (q.type === 'custom') setLockPlan(true);
  }, [router.isReady, q.plan, q.type]);

  // Build custom summary
  const customSummary = useMemo(() => {
    if (q.type !== 'custom') return null;

    const currency = (q.currency || 'USD').toString().toUpperCase();
    const estimateLocal = safeInt(q.estimateLocal, 0);

    const counters = {};
    CUSTOMIZE_CATALOG.counters.forEach((c) => {
      counters[c.key] = safeInt(q[c.key], c.included || 0);
    });

    const toggles = {};
    CUSTOMIZE_CATALOG.toggles.forEach((t) => {
      toggles[t.key] = parseBool(q[t.key]);
    });

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

  // Handle form submission
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

      const form = new FormData(formRef.current);
      const payload = {
        plan,
        type: q.type === 'custom' ? 'custom' : 'plan',
        user_name: form.get('name'),
        user_email: form.get('email'),
        user_phone: phone || form.get('phone') || '-',
        message: form.get('message') || '-',
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
      formRef.current.reset();
      setPhone('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} className="card p-6 space-y-5">
        {/* Custom summary preview */}
        {customSummary && (
          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Configuration Summary</h3>
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

        {/* Input fields */}
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
            {/* <PhoneInput
              country={'in'}
              value={phone}
              onChange={(v) => setPhone(`+${v}`)}
              inputProps={{ name: 'phone', required: true }}
              inputClass="!bg-slate-800 !border-slate-700 !text-slate-200 !rounded-lg !w-full"
              buttonClass="!bg-slate-800 !border-slate-700"
              dropdownClass="!bg-slate-900 !text-slate-200"
              placeholder="Enter your phone number"
            /> */}
            <PhoneInput
              country="in"
              value={phone}
              onChange={(v) => setPhone(`+${v}`)}
              inputProps={{ name: 'phone', required: true }}
              containerClass="w-full"
              inputClass="uibox-tel"
              buttonClass="uibox-flag"
              dropdownClass="!bg-slate-900 !text-slate-200 !border !border-slate-700"
              placeholder="Enter your phone number"
            />
          </div>

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
              <option value="others">Others</option>
            </select>
            {(customSummary || lockPlan) && (
              <p className="text-xs text-slate-500 mt-1">
                Plan is linked from your previous selection.
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Tell us about your project
          </label>
          <textarea
            name="message"
            rows="5"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3"
            placeholder="What do you need? Any references?"
          />
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary w-full md:w-auto"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send Request'}
        </button>

        {/* Status messages */}
        <div>
          {/* <p className="text-xs text-slate-400 mt-2">Powered by EmailJS</p> */}
          {status === 'success' && (
            <p className="text-emerald-400 text-sm mt-1">
              ✅ Thanks! We’ll contact you shortly via email.
            </p>
          )}
          {status === 'error' && (
            <p className="text-rose-400 text-sm mt-1">
              ❌ Oops, something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>

      <style jsx global>{`
        /* shared input look (matches your old boxes) */
        .uibox {
          height: 48px; /* uniform */
          width: 100%;
          padding: 0 1rem;
          color: #e2e8f0; /* slate-200 */
          background-color: #0f172a; /* slate-900 */
          border: 1px solid #334155; /* slate-700 */
          border-radius: 0.5rem; /* rounded-lg */
          outline: none;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .uibox:focus {
          border-color: transparent;
          box-shadow: 0 0 0 1px transparent, 0 0 0 2px rgba(56, 189, 248, 0.45),
            /* cyan */ 0 0 0 4px rgba(129, 140, 248, 0.25); /* indigo */
        }
        .uibox:hover {
          border-color: #475569; /* slate-600 */
        }
        .uibox-textarea {
          height: auto; /* keep your larger message box */
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }

        /* react-phone-input-2 alignment to match .uibox */
        .uibox-flag {
          background-color: transparent !important;
          border: 1px solid #334155 !important;
          border-right: 0 !important;
          height: 48px !important;
          padding-left: 0.5rem !important;
        }
        .uibox-tel {
          background-color: #0f172a !important;
          border: 1px solid #334155 !important;
          border-left: 0 !important;
          height: 48px !important;
          width: 100% !important;
          color: #e2e8f0 !important;
          padding-left: 3.25rem !important; /* make room for flag so placeholder isn't thin */
          padding-right: 1rem !important;
          outline: none !important;
        }
        .uibox-tel:focus {
          border-color: transparent !important;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.45),
            0 0 0 4px rgba(129, 140, 248, 0.25) !important;
        }
      `}</style>
    </>
  );
}

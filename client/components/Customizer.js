// components/Customizer.js
import { useEffect, useMemo, useState } from 'react';
import CUSTOMIZE_CATALOG from '../utils/customizeCatalog';

// Smallest integer >= n whose last k digits are all 9.
function ceilToMarketingNines(n) {
  const int = Math.ceil(Math.max(0, n));
  const digits = int.toString().length;
  const k = Math.max(digits - 2, 1);
  const base = 10 ** k;
  return Math.ceil((int + 1) / base) * base - 1;
}

function formatMoney(intAmount, currency, locale) {
  const fmtCurrency = currency || 'USD';
  const fmtLocale = fmtCurrency === 'USD' ? 'en-US' : (locale || 'en-US');
  const str = new Intl.NumberFormat(fmtLocale, {
    style: 'currency',
    currency: fmtCurrency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(intAmount);
  return fmtCurrency === 'USD' ? str.replace('US$', '$') : str;
}

export default function Customizer({
  currency = 'USD',
  rate = 1,
  locale = 'en-US',
  initialPreset, // { counters, toggles }
}) {
  // defaults from catalog
  const baseCounters = {};
  CUSTOMIZE_CATALOG.counters.forEach(c => { baseCounters[c.key] = c.included || 0; });
  const baseToggles = {};
  CUSTOMIZE_CATALOG.toggles.forEach(t => { baseToggles[t.key] = !!t.default; });

  const seedCounters = { ...baseCounters, ...(initialPreset?.counters || {}) };
  const seedToggles  = { ...baseToggles,  ...(initialPreset?.toggles  || {}) };

  const [counters, setCounters] = useState(seedCounters);
  const [toggles, setToggles]   = useState(seedToggles);

  // react to preset changes
  useEffect(() => {
    if (!initialPreset) return;
    setCounters({ ...baseCounters, ...(initialPreset.counters || {}) });
    setToggles({ ...baseToggles,  ...(initialPreset.toggles  || {}) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialPreset)]);

  // ---- All pricing in LOCAL currency from here down ----
  const {
    subtotalLocalRaw, // integer sum before ...99
    breakdownLocal,   // line items in local currency
  } = useMemo(() => {
    let local = 0;
    const rows = [];

    // counters
    CUSTOMIZE_CATALOG.counters.forEach(c => {
      const qty = Math.max(c.min, Math.min(c.max, Math.round(counters[c.key] ?? 0)));
      const unitLocal = Math.ceil(c.unitPriceUsd * rate);
      const rowLocal  = Math.ceil(qty * c.unitPriceUsd * rate);
      local += rowLocal;
      rows.push({
        label: `${c.label} (${qty} ${c.unitLabel}${qty === 1 ? '' : 's'})`,
        value: rowLocal,
      });
    });

    // toggles
    CUSTOMIZE_CATALOG.toggles.forEach(t => {
      const on = !!toggles[t.key];
      const priceLocal = Math.ceil(t.priceUsd * rate);
      const rowLocal   = on ? priceLocal : 0;
      local += rowLocal;
      rows.push({
        label: t.label + (on ? '' : ' (off)'),
        value: rowLocal,
      });
    });

    return { subtotalLocalRaw: local, breakdownLocal: rows };
  }, [counters, toggles, rate]);

  const totalLocal99 = subtotalLocalRaw > 0 ? ceilToMarketingNines(subtotalLocalRaw) : 0;
  const totalStr = formatMoney(totalLocal99, currency, locale);
  const subtotalStr = formatMoney(subtotalLocalRaw, currency, locale);

  const setCounter = (key, val) => setCounters(prev => ({ ...prev, [key]: val }));
  const setToggle  = (key, val) => setToggles(prev => ({ ...prev, [key]: val }));
  const resetAll   = () => { setCounters(seedCounters); setToggles(seedToggles); };

  // Build querystring to pass to contact
  const qs = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(counters).forEach(([k, v]) => params.set(k, v));
    Object.entries(toggles).forEach(([k, v]) => params.set(k, v ? '1' : '0'));
    params.set('estimateLocal', String(totalLocal99));
    params.set('currency', currency);
    return params.toString();
  }, [counters, toggles, totalLocal99, currency]);

  // Group by "group" for UI sections
  const countersByGroup = CUSTOMIZE_CATALOG.counters.reduce((acc, c) => {
    (acc[c.group || 'Website'] ||= []).push(c);
    return acc;
  }, {});
  const togglesByGroup = CUSTOMIZE_CATALOG.toggles.reduce((acc, t) => {
    (acc[t.group || 'Other'] ||= []).push(t);
    return acc;
  }, {});

  return (
    <section id="customizer" className="mb-12">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold">Customize Your Website</h2>
        <p className="text-slate-300 mt-1">Pick exactly what you need and see a live estimate.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-2 card p-6 space-y-6">
          {/* COUNTERS grouped (unit prices shown in LOCAL currency) */}
          {Object.entries(countersByGroup).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-xl font-semibold mb-3">{group}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {items.map(c => {
                  const value = counters[c.key] ?? 0;
                  const unitLocal = Math.ceil(c.unitPriceUsd * rate);
                  return (
                    <div key={c.key} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.label}</div>
                          <div className="text-xs text-slate-400">{c.help}</div>
                        </div>
                        <div className="text-sm text-slate-400">
                          {formatMoney(unitLocal, currency, locale)}/{c.unitLabel}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium"
                          onClick={() => setCounter(c.key, Math.max(c.min, value - c.step))}
                        >-</button>
                        <input
                          type="number"
                          min={c.min} max={c.max} step={c.step}
                          value={value}
                          onChange={e => setCounter(c.key, Number(e.target.value || 0))}
                          className="w-20 text-center rounded-md bg-slate-800 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-cyan-400"
                        />
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium"
                          onClick={() => setCounter(c.key, Math.min(c.max, value + c.step))}
                        >+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* TOGGLES grouped (prices shown in LOCAL currency) */}
          {Object.entries(togglesByGroup).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-xl font-semibold mb-3">{group}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {items.map(t => {
                  const on = !!toggles[t.key];
                  const priceLocal = Math.ceil(t.priceUsd * rate);
                  return (
                    <label key={t.key} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={e => setToggle(t.key, e.target.checked)}
                        className="mt-1 checkbox"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{t.label}</span>
                          <span className="text-sm text-slate-400">
                            {formatMoney(priceLocal, currency, locale)}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{t.help}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button type="button" className="btn" onClick={resetAll}>Reset</button>
            <a href={`/contact?type=custom&${qs}`} className="btn btn-primary">
              Continue — send configuration
            </a>
          </div>
        </div>

        {/* Summary */}
        <aside className="card p-6">
          <h3 className="text-xl font-semibold">Estimate</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {breakdownLocal.map((r, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-slate-300">{r.label}</span>
                <span className="text-slate-400">{formatMoney(r.value, currency, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between text-slate-400 text-sm">
              <span>Subtotal</span>
              <span>{subtotalStr}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold mt-3">
              <span>Total</span>
              <span className="text-cyan-300">{totalStr}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

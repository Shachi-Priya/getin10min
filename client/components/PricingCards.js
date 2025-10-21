// import { motion } from 'framer-motion';
// import { PLANS } from '../utils/plans';
// import Link from 'next/link';

// export default function PricingCards() {
//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {PLANS.map((p, idx) => (
//         <motion.div
//           key={p.key}
//           initial={{ y: 20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ delay: idx * 0.05 }}
//           viewport={{ once: true }}
//           className={`card p-6 ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
//         >
//           <div className="flex items-center justify-between">
//             <span className="badge">{p.badge}</span>
//             {p.subtitle && <span className="text-xs text-slate-400">{p.subtitle}</span>}
//           </div>
//           <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
//           <div className="mt-2">
//             <span className="line-through text-slate-500 mr-2">{p.price}</span>
//             <span className="text-3xl font-extrabold text-cyan-300">{p.sale}</span>
//           </div>
//           <ul className="mt-4 space-y-2 text-sm">
//             {p.features.map(([name, ok], i) => (
//               <li key={i} className={`flex items-center gap-2 ${ok ? 'text-slate-200' : 'text-slate-500'}`}>
//                 <span className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
//                   {ok ? '✓' : '✕'}
//                 </span>
//                 {name}
//               </li>
//             ))}
//           </ul>
//           <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full mt-6">Get Quotation</Link>
//         </motion.div>
//       ))}
//     </div>
//   );
// }



////////////////

// // components/PricingCards.js
// import { motion } from 'framer-motion';
// import { PLANS } from '../utils/plans';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// function formatMoney(valueUsd, rate, currency, locale) {
//   console.log("format money::", valueUsd, rate, currency, locale)
//   const localValue = valueUsd * rate;

//   // Force plain "$" for USD by formatting in en-US and using narrow symbol.
//   const fmtCurrency = currency || 'USD';
//   const fmtLocale = fmtCurrency === 'USD' ? 'en-US' : (locale || 'en-US');

//   const str = new Intl.NumberFormat(fmtLocale, {
//     style: 'currency',
//     currency: fmtCurrency,
//     currencyDisplay: 'narrowSymbol', // prefers "$" over "US$"
//     maximumFractionDigits: 0,
//   }).format(localValue);

//   // Extra guard: some locales may still give "US$". Strip the country letters.
//   if (fmtCurrency === 'USD') {
//     return str.replace('US$', '$');
//   }
//   return str;
// }

// export default function PricingCards({
//   currency: ssrCurrency = 'USD',
//   rate: ssrRate = 1,
//   locale: ssrLocale = 'en-US',
// }) {
//   // Start with SSR values
//   const [currency, setCurrency] = useState(ssrCurrency);
//   const [rate, setRate] = useState(ssrRate);
//   const [locale, setLocale] = useState(ssrLocale);

//   // Client-side correction: detects real viewer currency (works on localhost)
//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         const locRes = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
//         const loc = await locRes.json();

//         const clientCurrency =
//           (loc?.currency && String(loc.currency).toUpperCase()) || 'USD';
//         const clientLocale =
//           (loc?.languages?.split(',')[0] || navigator.language || 'en-US').trim();

//         // Only update if different from SSR guess
//         if (!cancelled && clientCurrency !== ssrCurrency) {
//           const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
//           const rateData = await rateRes.json();
//           const clientRate = rateData?.rates?.[clientCurrency] || 1;

//           setCurrency(clientCurrency);
//           setRate(clientRate);
//           setLocale(clientLocale);
//         } else if (!cancelled) {
//           // Improve locale even if currency same
//           setLocale(clientLocale);
//         }
//       } catch {
//         // keep SSR defaults on failure
//       }
//     })();
//     return () => { cancelled = true; };
//   }, [ssrCurrency]);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {PLANS.map((p, idx) => (
//         <motion.div
//           key={p.key}
//           initial={{ y: 20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ delay: idx * 0.05 }}
//           viewport={{ once: true }}
//           className={`card p-6 ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
//         >
//           <div className="flex items-center justify-between">
//             <span className="badge">{p.badge}</span>
//             {p.subtitle && <span className="text-xs text-slate-400">{p.subtitle}</span>}
//           </div>

//           <h3 className="mt-4 text-xl font-bold">{p.title}</h3>

//           <div className="mt-2">
//             <span className="line-through text-slate-500 mr-2">
//               {formatMoney(p.priceUsd, rate, currency, locale)}
//             </span>
//             <span className="text-3xl font-extrabold text-cyan-300">
//               {formatMoney(p.saleUsd, rate, currency, locale)}
//             </span>
//           </div>

//           <ul className="mt-4 space-y-2 text-sm">
//             {p.features.map(([name, ok], i) => (
//               <li key={i} className={`flex items-center gap-2 ${ok ? 'text-slate-200' : 'text-slate-500'}`}>
//                 <span
//                   className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${
//                     ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
//                   }`}
//                 >
//                   {ok ? '✓' : '✕'}
//                 </span>
//                 {name}
//               </li>
//             ))}
//           </ul>

//           <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full mt-6">
//             Request a quote
//           </Link>
//         </motion.div>
//       ))}
//     </div>
//   );
// }



/////////



// components/PricingCards.js
import { motion } from 'framer-motion';
import { PLANS } from '../utils/plans';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function formatMoney(valueUsd, rate, currency, locale) {
  const localValue = valueUsd * rate;

  // Use USD with en-US to force plain "$" (not "US$")
  const fmtCurrency = currency || 'USD';
  const fmtLocale = fmtCurrency === 'USD' ? 'en-US' : (locale || 'en-US');

  const str = new Intl.NumberFormat(fmtLocale, {
    style: 'currency',
    currency: fmtCurrency,
    currencyDisplay: 'narrowSymbol', // prefers "$" over "US$" where possible
    maximumFractionDigits: 0,
  }).format(localValue);

  return fmtCurrency === 'USD' ? str.replace('US$', '$') : str;
}

export default function PricingCards({
  currency: ssrCurrency = 'USD',
  rate: ssrRate = 1,
  locale: ssrLocale = 'en-US',
}) {
  // Use SSR values to avoid flicker; no client geo fetch at all
  const [currency] = useState(ssrCurrency);
  const [rate] = useState(ssrRate);
  const [locale, setLocale] = useState(ssrLocale);

  // Small UX enhancement: adopt browser UI locale for separators/grouping only
  useEffect(() => {
    const clientLocale = (typeof navigator !== 'undefined' && navigator.language)
      ? navigator.language.trim()
      : ssrLocale;
    if (clientLocale && clientLocale !== ssrLocale) {
      setLocale(clientLocale);
    }
  }, [ssrLocale]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLANS.map((p, idx) => (
        <motion.div
          key={p.key}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className={`card p-6 ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="badge">{p.badge}</span>
            {p.subtitle && <span className="text-xs text-slate-400">{p.subtitle}</span>}
          </div>

          <h3 className="mt-4 text-xl font-bold">{p.title}</h3>

          <div className="mt-2">
            <span className="line-through text-slate-500 mr-2">
              {formatMoney(p.priceUsd, rate, currency, locale)}
            </span>
            <span className="text-3xl font-extrabold text-cyan-300">
              {formatMoney(p.saleUsd, rate, currency, locale)}
            </span>
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            {p.features.map(([name, ok], i) => (
              <li
                key={i}
                className={`flex items-center gap-2 ${ok ? 'text-slate-200' : 'text-slate-500'}`}
              >
                <span
                  className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${
                    ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {ok ? '✓' : '✕'}
                </span>
                {name}
              </li>
            ))}
          </ul>

          <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full mt-6">
            Request a quote
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// // components/PricingCards.js
// import { motion } from 'framer-motion';
// import { PLANS } from '../utils/plans';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// function formatMoneyInteger(intAmount, currency, locale) {
//   // Use USD with en-US to force plain "$" (not "US$")
//   const fmtCurrency = currency || 'USD';
//   const fmtLocale = fmtCurrency === 'USD' ? 'en-US' : (locale || 'en-US');

//   const str = new Intl.NumberFormat(fmtLocale, {
//     style: 'currency',
//     currency: fmtCurrency,
//     currencyDisplay: 'narrowSymbol', // prefers "$" over "US$" where possible
//     maximumFractionDigits: 0,
//   }).format(intAmount);

//   return fmtCurrency === 'USD' ? str.replace('US$', '$') : str;
// }

// export default function PricingCards({
//   currency: ssrCurrency = 'USD',
//   rate: ssrRate = 1,
//   locale: ssrLocale = 'en-US',
//   priceMap = {},
// }) {
//   // Use SSR values to avoid flicker; no client geo fetch at all
//   const [currency] = useState(ssrCurrency);
//   const [rate] = useState(ssrRate); // kept in case you still want to show USD fallback
//   const [locale, setLocale] = useState(ssrLocale);

//   // Small UX enhancement: adopt browser UI locale for separators/grouping only
//   useEffect(() => {
//     const clientLocale = (typeof navigator !== 'undefined' && navigator.language)
//       ? navigator.language.trim()
//       : ssrLocale;
//     if (clientLocale && clientLocale !== ssrLocale) {
//       setLocale(clientLocale);
//     }
//   }, [ssrLocale]);

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {PLANS.map((p, idx) => {
//         const override = priceMap[p.key];

//         // Fallback: if priceMap not provided, just ceil raw local to 0 decimals (no …99 on client)
//         const fallbackPrice = Math.ceil(p.priceUsd * rate);
//         const fallbackSale = Math.ceil(p.saleUsd * rate);

//         const priceStr = formatMoneyInteger(
//           override ? override.price : fallbackPrice,
//           currency,
//           locale
//         );
//         const saleStr = formatMoneyInteger(
//           override ? override.sale : fallbackSale,
//           currency,
//           locale
//         );

//         return (
//           <motion.div
//             key={p.key}
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ delay: idx * 0.05 }}
//             viewport={{ once: true }}
//             className={`card p-6 ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
//           >
//             <div className="flex items-center justify-between">
//               <span className="badge">{p.badge}</span>
//               {p.subtitle && <span className="text-xs text-slate-400">{p.subtitle}</span>}
//             </div>

//             <h3 className="mt-4 text-xl font-bold">{p.title}</h3>

//             <div className="mt-2">
//               <span className="line-through text-slate-500 mr-2">{priceStr}</span>
//               <span className="text-3xl font-extrabold text-cyan-300">{saleStr}</span>
//             </div>

//             <ul className="mt-4 space-y-2 text-sm">
//               {p.features.map(([name, ok], i) => (
//                 <li
//                   key={i}
//                   className={`flex items-center gap-2 ${ok ? 'text-slate-200' : 'text-slate-500'}`}
//                 >
//                   <span
//                     className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${
//                       ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
//                     }`}
//                   >
//                     {ok ? '✓' : '✕'}
//                   </span>
//                   {name}
//                 </li>
//               ))}
//             </ul>

//             <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full mt-6">
//               Request a quote
//             </Link>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }


///////////





// components/PricingCards.js
import { motion } from 'framer-motion';
import PLANS from '../utils/plans';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function formatMoneyInteger(intAmount, currency, locale) {
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

export default function PricingCards({
  currency: ssrCurrency = 'USD',
  rate: ssrRate = 1,
  locale: ssrLocale = 'en-US',
  priceMap = {},
  onCustomizePlan,
}) {
  const [currency] = useState(ssrCurrency);
  const [rate] = useState(ssrRate);
  const [locale, setLocale] = useState(ssrLocale);

  useEffect(() => {
    const clientLocale = (typeof navigator !== 'undefined' && navigator.language)
      ? navigator.language.trim()
      : ssrLocale;
    if (clientLocale && clientLocale !== ssrLocale) setLocale(clientLocale);
  }, [ssrLocale]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PLANS.map((p, idx) => {
        const override = priceMap[p.key];
        const fallbackPrice = Math.ceil(p.priceUsd * rate);
        const fallbackSale = Math.ceil(p.saleUsd * rate);

        const priceStr = formatMoneyInteger(override ? override.price : fallbackPrice, currency, locale);
        const saleStr  = formatMoneyInteger(override ? override.sale  : fallbackSale,  currency, locale);

        return (
          <motion.div
            key={p.key}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`relative card p-6 overflow-hidden ${p.highlight ? 'ring-2 ring-cyan-400' : ''}`}
          >
            {/* Floating customize pill */}
            <button
              type="button"
              onClick={() => onCustomizePlan?.(p.key)}
              className="absolute top-3 right-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide
                         border border-cyan-400 text-cyan-300 bg-slate-900/80
                         hover:bg-cyan-400 hover:text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.4)]
                         transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              aria-label={`Customize the ${p.title} plan`}
            >
              Customize this plan
            </button>

            {/* Title + price */}
            <h3 className="mt-10 text-xl font-bold">{p.title}</h3>

            <div className="mt-2">
              <span className="line-through text-slate-500 mr-2">{priceStr}</span>
              <span className="text-3xl font-extrabold text-cyan-300">{saleStr}</span>
            </div>

            {/* Features */}
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

            {/* CTA */}
            <div className="mt-6">
              <Link href={`/contact?plan=${p.key}`} className="btn btn-primary w-full">
                Request a quote
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

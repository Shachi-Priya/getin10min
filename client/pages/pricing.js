// // pages/pricing.js
// import Head from 'next/head';
// import PricingCards from '@/components/PricingCards';
// import { PLANS } from '@/utils/plans';

// /** Country → Currency map (includes all South Asia + common others) */
// const COUNTRY_TO_CURRENCY = {
//   // South Asia (SAARC)
//   AF: 'AFN', BD: 'BDT', BT: 'BTN', IN: 'INR', MV: 'MVR', NP: 'NPR', PK: 'PKR', LK: 'LKR',

//   // Common others you likely serve
//   US: 'USD', CA: 'CAD',
//   GB: 'GBP', IE: 'EUR', FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR',
//   NL: 'EUR', BE: 'EUR', PT: 'EUR', AT: 'EUR', FI: 'EUR', EE: 'EUR',
//   LV: 'EUR', LT: 'EUR', LU: 'EUR', MT: 'EUR', SI: 'EUR', SK: 'EUR',
//   CY: 'EUR', GR: 'EUR',
//   AU: 'AUD', NZ: 'NZD', SG: 'SGD', JP: 'JPY', KR: 'KRW',
//   AE: 'AED', SA: 'SAR', ZA: 'ZAR', CH: 'CHF',
//   NO: 'NOK', SE: 'SEK', DK: 'DKK',
//   HK: 'HKD', TW: 'TWD', TH: 'THB', MY: 'MYR', PH: 'PHP', ID: 'IDR',
//   BR: 'BRL', MX: 'MXN'
// };

// /** From Accept-Language, derive a reasonable currency (no network). */
// function currencyFromAcceptLanguage(acceptLanguage = 'en-US') {
//   const first = (acceptLanguage.split(',')[0] || '').trim(); // e.g., "en-GB"
//   const m = first.match(/[-_](?<region>[A-Za-z]{2})$/);       // → "GB"
//   const region = m?.groups?.region?.toUpperCase();
//   return (region && COUNTRY_TO_CURRENCY[region]) ? COUNTRY_TO_CURRENCY[region] : 'USD';
// }

// /** Normalize target currency to what the FX JSON actually provides (BTN→INR). */
// function normalizeCurrencyForRates(preferred, rates) {
//   if (preferred && rates?.[preferred]) return preferred;
//   // Many feeds omit BTN; use INR (1:1 peg) if INR exists, else fall back to USD.
//   if (preferred === 'BTN') return rates?.INR ? 'INR' : 'USD';
//   return 'USD';
// }

// /** Smallest integer >= n whose last k digits are all 9.
//  *  k = max(D-2, 1), where D = digits in the integer part of n.
//  *  Examples: 45→49, 120→129, 2345→2399, 56782→56999
//  */
// function ceilToMarketingNines(n) {
//   const int = Math.ceil(Math.max(0, n)); // ensure integer, non-negative
//   const digits = int.toString().length;
//   const k = Math.max(digits - 2, 1);
//   const base = 10 ** k;
//   return Math.ceil((int + 1) / base) * base - 1;
// }

// export async function getServerSideProps({ req, res }) {
//   const acceptLang = req.headers['accept-language'] || 'en-US';
//   const locale = (acceptLang.split(',')[0] || 'en-US').trim();

//   // Prefer Vercel country header in production (fast & accurate)
//   const vercelCountry = (req.headers['x-vercel-ip-country'] || '').toString().toUpperCase();
//   // Start with best guess from Vercel country, then Accept-Language fallback
//   let currency =
//     (vercelCountry && COUNTRY_TO_CURRENCY[vercelCountry]) ||
//     currencyFromAcceptLanguage(acceptLang);

//   // Optional: server-side IP geolocation as a final attempt (no CORS in SSR)
//   try {
//     if (!vercelCountry) {
//       const xff = req.headers['x-forwarded-for'];
//       const ip =
//         (Array.isArray(xff) ? xff[0] : xff)?.split(',')[0]?.trim() ||
//         req.headers['x-real-ip'] ||
//         null;

//       if (ip) {
//         const locRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' });
//         if (locRes.ok) {
//           const loc = await locRes.json();
//           const cur = String(loc?.currency || '').toUpperCase();
//           if (cur.length === 3) currency = cur;
//         }
//       }
//     }
//   } catch {
//     // ignore — we already have reasonable fallbacks
//   }

//   // Fetch USD-base FX rates
//   let rate = 1;
//   try {
//     const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
//     const rateData = await rateRes.json();

//     // Normalize (e.g., BTN→INR) if the chosen code isn’t in the rates payload
//     const resolvedCurrency = normalizeCurrencyForRates(currency, rateData?.rates);
//     currency = resolvedCurrency;

//     if (rateData?.result === 'success' && rateData?.rates?.[currency]) {
//       rate = rateData.rates[currency];
//     }
//   } catch {
//     // leave default rate = 1
//   }

//   // Build a server-side map of final integer local prices (already “…99”-adjusted)
//   const priceMap = {};
//   for (const p of PLANS) {
//     const localPrice = p.priceUsd * rate;
//     const localSale = p.saleUsd * rate;
//     priceMap[p.key] = {
//       price: ceilToMarketingNines(localPrice),
//       sale: ceilToMarketingNines(localSale),
//     };
//   }

//   // Cache a day per visitor to avoid recomputing on every request
//   try {
//     res.setHeader('Set-Cookie', [
//       `currency=${currency}; Path=/; Max-Age=86400; SameSite=Lax`,
//       `locale=${locale}; Path=/; Max-Age=86400; SameSite=Lax`,
//     ]);
//   } catch {}

//   return { props: { currency, rate, locale, priceMap } };
// }

// export default function Pricing({ currency, rate, locale, priceMap }) {
//   return (
//     <>
//       <Head><title>Pricing — getin10min</title></Head>
//       <section className="section container-tight">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold">Pricing</h1>
//           <p className="text-slate-300 mt-2">
//             Transparent plans inspired by modern agencies. Pick one and request a tailored quote.
//           </p>
//         </div>
//         <PricingCards currency={currency} rate={rate} locale={locale} priceMap={priceMap} />
//       </section>
//     </>
//   );
// }



//////////////



// pages/pricing.js
import Head from 'next/head';
import PricingCards from '@/components/PricingCards';
import Customizer from '@/components/Customizer';
import PLANS from '@/utils/plans';
import { PLAN_PRESETS } from '@/utils/customizePresets'; // ← use named import
import { useRef, useState } from 'react';

/** Country → Currency map (includes all South Asia + common others) */
const COUNTRY_TO_CURRENCY = {
  AF: 'AFN', BD: 'BDT', BT: 'BTN', IN: 'INR', MV: 'MVR', NP: 'NPR', PK: 'PKR', LK: 'LKR',
  US: 'USD', CA: 'CAD',
  GB: 'GBP', IE: 'EUR', FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR',
  NL: 'EUR', BE: 'EUR', PT: 'EUR', AT: 'EUR', FI: 'EUR', EE: 'EUR',
  LV: 'EUR', LT: 'EUR', LU: 'EUR', MT: 'EUR', SI: 'EUR', SK: 'EUR',
  CY: 'EUR', GR: 'EUR',
  AU: 'AUD', NZ: 'NZD', SG: 'SGD', JP: 'JPY', KR: 'KRW',
  AE: 'AED', SA: 'SAR', ZA: 'ZAR', CH: 'CHF',
  NO: 'NOK', SE: 'SEK', DK: 'DKK',
  HK: 'HKD', TW: 'TWD', TH: 'THB', MY: 'MYR', PH: 'PHP', ID: 'IDR',
  BR: 'BRL', MX: 'MXN'
};
function currencyFromAcceptLanguage(acceptLanguage = 'en-US') {
  const first = (acceptLanguage.split(',')[0] || '').trim();
  const m = first.match(/[-_](?<region>[A-Za-z]{2})$/);
  const region = m?.groups?.region?.toUpperCase();
  return (region && COUNTRY_TO_CURRENCY[region]) ? COUNTRY_TO_CURRENCY[region] : 'USD';
}
function normalizeCurrencyForRates(preferred, rates) {
  if (preferred && rates?.[preferred]) return preferred;
  if (preferred === 'BTN') return rates?.INR ? 'INR' : 'USD';
  return 'USD';
}
function ceilToMarketingNines(n) {
  const int = Math.ceil(Math.max(0, n));
  const digits = int.toString().length;
  const k = Math.max(digits - 2, 1);
  const base = 10 ** k;
  return Math.ceil((int + 1) / base) * base - 1;
}

export async function getServerSideProps({ req, res }) {
  const acceptLang = req.headers['accept-language'] || 'en-US';
  const locale = (acceptLang.split(',')[0] || 'en-US').trim();

  const vercelCountry = (req.headers['x-vercel-ip-country'] || '').toString().toUpperCase();
  let currency =
    (vercelCountry && COUNTRY_TO_CURRENCY[vercelCountry]) ||
    currencyFromAcceptLanguage(acceptLang);

  try {
    if (!vercelCountry) {
      const xff = req.headers['x-forwarded-for'];
      const ip =
        (Array.isArray(xff) ? xff[0] : xff)?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] || null;
      if (ip) {
        const locRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' });
        if (locRes.ok) {
          const loc = await locRes.json();
          const cur = String(loc?.currency || '').toUpperCase();
          if (cur.length === 3) currency = cur;
        }
      }
    }
  } catch {}

  let rate = 1;
  try {
    const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
    const rateData = await rateRes.json();
    currency = normalizeCurrencyForRates(currency, rateData?.rates);
    if (rateData?.result === 'success' && rateData?.rates?.[currency]) {
      rate = rateData.rates[currency];
    }
  } catch {}

  // Server-side: build “…99”-adjusted map for plan cards
  const priceMap = {};
  const plansArr = Array.isArray(PLANS) ? PLANS : [];
  for (const p of plansArr) {
    const localPrice = p.priceUsd * rate;
    const localSale = p.saleUsd * rate;
    priceMap[p.key] = {
      price: ceilToMarketingNines(localPrice),
      sale: ceilToMarketingNines(localSale),
    };
  }

  try {
    res.setHeader('Set-Cookie', [
      `currency=${currency}; Path=/; Max-Age=86400; SameSite=Lax`,
      `locale=${locale}; Path=/; Max-Age=86400; SameSite=Lax`,
    ]);
  } catch {}

  return { props: { currency, rate, locale, priceMap } };
}

export default function Pricing({ currency, rate, locale, priceMap }) {
  // Connected preset + smooth scroll to customizer
  const [preset, setPreset] = useState(null);
  const customizerRef = useRef(null);

  const handleCustomizePlan = (planKey) => {
    const nextPreset = PLAN_PRESETS[planKey] || null;
    setPreset(nextPreset);
    // Smooth scroll to the customizer section
    const el = document.getElementById('customizer');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Head><title>Pricing — getin10min</title></Head>

      {/* 1) PRICING LIST FIRST */}
      <section className="section container-tight">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="text-slate-300 mt-2">
            Transparent plans inspired by modern agencies. Pick one, or customize and request a tailored quote.
          </p>
        </div>
        <PricingCards
          currency={currency}
          rate={rate}
          locale={locale}
          priceMap={priceMap}
          onCustomizePlan={handleCustomizePlan}  // ← wire up
        />
      </section>

      {/* 2) CONNECTED CUSTOMIZER BELOW */}
      <section className="section container-tight" ref={customizerRef}>
        <Customizer currency={currency} rate={rate} locale={locale} initialPreset={preset} />
      </section>
    </>
  );
}

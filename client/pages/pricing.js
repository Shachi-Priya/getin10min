// import Head from 'next/head'
// import PricingCards from '@/components/PricingCards'

// export default function Pricing(){
//   return (
//     <>
//       <Head><title>Pricing — getin10min</title></Head>
//       <section className="section container-tight">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold">Pricing</h1>
//           <p className="text-slate-300 mt-2">Transparent plans inspired by modern agencies. Pick one and request a tailored quote.</p>
//         </div>
//         <PricingCards />
//       </section>
//     </>
//   )
// }


////////////



// pages/pricing.js
import Head from 'next/head';
import PricingCards from '@/components/PricingCards';

/** Country → Currency map (includes all South Asia + common others) */
const COUNTRY_TO_CURRENCY = {
  // South Asia (SAARC)
  AF: 'AFN', // Afghanistan — Afghani
  BD: 'BDT', // Bangladesh — Taka
  BT: 'BTN', // Bhutan — Ngultrum (pegged 1:1 to INR)
  IN: 'INR', // India — Rupee
  MV: 'MVR', // Maldives — Rufiyaa
  NP: 'NPR', // Nepal — Rupee
  PK: 'PKR', // Pakistan — Rupee
  LK: 'LKR', // Sri Lanka — Rupee

  // Common others you likely serve
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

/** From Accept-Language, derive a reasonable currency (no network). */
function currencyFromAcceptLanguage(acceptLanguage = 'en-US') {
  const first = (acceptLanguage.split(',')[0] || '').trim(); // e.g., "en-GB"
  const m = first.match(/[-_](?<region>[A-Za-z]{2})$/);       // → "GB"
  const region = m?.groups?.region?.toUpperCase();
  return (region && COUNTRY_TO_CURRENCY[region]) ? COUNTRY_TO_CURRENCY[region] : 'USD';
}

/** Normalize target currency to what the FX JSON actually provides (BTN→INR). */
function normalizeCurrencyForRates(preferred, rates) {
  if (preferred && rates?.[preferred]) return preferred;
  // Many feeds omit BTN; use INR (1:1 peg) if INR exists, else fall back to USD.
  if (preferred === 'BTN') return rates?.INR ? 'INR' : 'USD';
  return 'USD';
}

export async function getServerSideProps({ req, res }) {
  const acceptLang = req.headers['accept-language'] || 'en-US';
  const locale = (acceptLang.split(',')[0] || 'en-US').trim();

  // Prefer Vercel country header in production (fast & accurate)
  console.log("req.headers['x-vercel-ip-country']::", req.headers['x-vercel-ip-country'])
  const vercelCountry = (req.headers['x-vercel-ip-country'] || '').toString().toUpperCase();
  console.log("vercelCountry::", vercelCountry)
  // Start with best guess from Vercel country, then Accept-Language fallback
  let currency =
    (vercelCountry && COUNTRY_TO_CURRENCY[vercelCountry]) ||
    currencyFromAcceptLanguage(acceptLang);

  // Optional: server-side IP geolocation as a final attempt (no CORS in SSR)
  try {
    if (!vercelCountry) {
      const xff = req.headers['x-forwarded-for'];
      const ip =
        (Array.isArray(xff) ? xff[0] : xff)?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        null;

      if (ip) {
        const locRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' });
        if (locRes.ok) {
          const loc = await locRes.json();
          const cur = String(loc?.currency || '').toUpperCase();
          if (cur.length === 3) currency = cur;
        }
      }
    }
  } catch {
    // ignore — we already have reasonable fallbacks
  }

  // Fetch USD-base FX rates
  let rate = 1;
  try {
    const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
    const rateData = await rateRes.json();

    // Normalize (e.g., BTN→INR) if the chosen code isn’t in the rates payload
    const resolvedCurrency = normalizeCurrencyForRates(currency, rateData?.rates);
    currency = resolvedCurrency;

    if (rateData?.result === 'success' && rateData?.rates?.[currency]) {
      rate = rateData.rates[currency];
    }
  } catch {
    // leave default rate = 1
  }

  // Cache a day per visitor to avoid recomputing on every request
  try {
    res.setHeader('Set-Cookie', [
      `currency=${currency}; Path=/; Max-Age=86400; SameSite=Lax`,
      `locale=${locale}; Path=/; Max-Age=86400; SameSite=Lax`,
    ]);
  } catch {}

  return { props: { currency, rate, locale } };
}

export default function Pricing({ currency, rate, locale }) {
  console.log("currency, rate, locale ::", currency, rate, locale )
  return (
    <>
      <Head><title>Pricing — getin10min</title></Head>
      <section className="section container-tight">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Pricing</h1>
          <p className="text-slate-300 mt-2">
            Transparent plans inspired by modern agencies. Pick one and request a tailored quote.
          </p>
        </div>
        <PricingCards currency={currency} rate={rate} locale={locale} />
      </section>
    </>
  );
}

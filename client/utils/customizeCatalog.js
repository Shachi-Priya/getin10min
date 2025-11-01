// utils/customizeCatalog.js
// All prices are USD. Client converts to local currency.

export const CUSTOMIZE_CATALOG = {
  // Quantities the user can increment/decrement
  counters: [
    {
      key: 'staticPages',
      label: 'Static Pages',
      help: 'Informational pages (About, Services, FAQ, etc.)',
      min: 0, max: 50, step: 1,
      unitLabel: 'page',
      unitPriceUsd: 30,
      included: 0,
      group: 'Website'
    },
    {
      key: 'dynamicPages',
      label: 'Dynamic Pages',
      help: 'CRUD/listings/forms/DB-backed views',
      min: 0, max: 50, step: 1,
      unitLabel: 'page',
      unitPriceUsd: 60,
      included: 0,
      group: 'Website'
    },
    {
      key: 'supportMonths',
      label: 'Maintenance / Support',
      help: 'Post-launch support & monitoring (per month)',
      min: 0, max: 24, step: 1,
      unitLabel: 'month',
      unitPriceUsd: 30,
      included: 0,
      group: 'Maintenance'
    },
    {
      key: 'addonModules',
      label: 'Addon Modules',
      help: 'Auth, search, analytics, advanced uploads, etc.',
      min: 0, max: 20, step: 1,
      unitLabel: 'module',
      unitPriceUsd: 50,
      included: 0,
      group: 'Website'
    },
  ],

  // On/off items (now grouped to match Services)
  toggles: [
    // Branding & Graphics
    { key: 'graphics',        label: 'Graphics Bundle',         help: 'Hero art, icons, image treatment',             priceUsd: 50, default: false, group: 'Branding & Graphics' },
    { key: 'logoDesign',      label: 'Logo Design',             help: 'Primary logo + favicon (basic)',               priceUsd: 35, default: false, group: 'Branding & Graphics' },
    { key: 'socialCards',     label: 'Social Cards Pack',       help: 'Social cards, cover images, coupon cards, brand promoting images, etc.',        priceUsd: 20,  default: false, group: 'Branding & Graphics' },

    // SEO & Performance
    { key: 'seoFull',         label: 'Full SEO Setup',          help: 'Meta, sitemap, robots, schema, index hygiene', priceUsd: 60, default: false, group: 'SEO & Performance' },

    // Integrations
    { key: 'payments',        label: 'Payments Integration',    help: 'Stripe / Razorpay / Sslcommerz checkout flow', priceUsd: 100, default: false, group: 'Integrations' },
    { key: 'chatWidget',      label: 'Chat Widget',             help: 'Intercom / Crisp / Tawk embed & config',       priceUsd: 50,  default: false, group: 'Integrations' },
    { key: 'crm',             label: 'CRM Integration',         help: 'HubSpot / Airtable / Notion sync',             priceUsd: 100, default: false, group: 'Integrations' },
   
    // Admin & Social
    { key: 'adminPanel',      label: 'Complete Admin Panel',    help: 'Role-based dashboard & content control',       priceUsd: 180, default: false, group: 'Admin & Social' },
  ],
};

export default CUSTOMIZE_CATALOG;

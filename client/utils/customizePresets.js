// utils/customizePresets.js
export const PLAN_PRESETS = {
  static: {
    counters: {
      staticPages: 2, dynamicPages: 0, addonModules: 0,
      supportMonths: 0, contentPages: 0, integrationsCount: 0,
    },
    toggles: {
      graphics: false, logoDesign: false, socialCards: false,
      seoFull: false,
      payments: false, crm: false, chatWidget: false,
      adminPanel: false,
    },
  },
  dynamic: {
    counters: {
      staticPages: 0, dynamicPages: 2, addonModules: 0,
      supportMonths: 0, contentPages: 0, integrationsCount: 0,
    },
    toggles: {
      graphics: false, logoDesign: false, socialCards: false,
      seoFull: false, 
      payments: false, crm: false, chatWidget: false,
      adminPanel: false,
    },
  },
  seo: {
    counters: {
      staticPages: 0, dynamicPages: 2, addonModules: 0,
      supportMonths: 0, contentPages: 0, integrationsCount: 0,
    },
    toggles: {
      graphics: false, logoDesign: false, socialCards: false,
      seoFull: true, 
      payments: false, crm: false, chatWidget: false,
      adminPanel: false,
    },
  },
  complete: {
    counters: {
      staticPages: 0, dynamicPages: 2, addonModules: 0,
      supportMonths: 0, contentPages: 0, integrationsCount: 0,
    },
    toggles: {
      graphics: false, logoDesign: false, socialCards: false,
      seoFull: true,
      payments: false, crm: false, chatWidget: false,
      adminPanel: true,
    },
  },
};

export default PLAN_PRESETS;

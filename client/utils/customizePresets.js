// utils/customizePresets.js
export const PLAN_PRESETS = {
  static: {
    counters: {
      staticPages: 5, dynamicPages: 0, addonModules: 0,
      supportMonths: 1, contentPages: 0, integrationsCount: 0,
    },
    toggles: {
      graphics: false, logoDesign: false, brandColors: false, socialCards: false,
      seoFull: false, lighthouse: false, analyticsSetup: false,
      payments: false, crm: false, chatWidget: false, advancedForms: false,
      adminPanel: false, socialIntegration: false,
    },
  },
  dynamic: {
    counters: {
      staticPages: 2, dynamicPages: 5, addonModules: 1,
      supportMonths: 1, contentPages: 0, integrationsCount: 1,
    },
    toggles: {
      graphics: false, logoDesign: false, brandColors: false, socialCards: false,
      seoFull: false, lighthouse: false, analyticsSetup: true,
      payments: false, crm: true, chatWidget: true, advancedForms: true,
      adminPanel: true, socialIntegration: true,
    },
  },
  seo: {
    counters: {
      staticPages: 2, dynamicPages: 5, addonModules: 1,
      supportMonths: 3, contentPages: 2, integrationsCount: 1,
    },
    toggles: {
      graphics: false, logoDesign: false, brandColors: false, socialCards: true,
      seoFull: true, lighthouse: true, analyticsSetup: true,
      payments: false, crm: true, chatWidget: true, advancedForms: true,
      adminPanel: false, socialIntegration: true,
    },
  },
  complete: {
    counters: {
      staticPages: 3, dynamicPages: 5, addonModules: 2,
      supportMonths: 6, contentPages: 4, integrationsCount: 3,
    },
    toggles: {
      graphics: true, logoDesign: true, brandColors: true, socialCards: true,
      seoFull: true, lighthouse: true, analyticsSetup: true,
      payments: true, crm: true, chatWidget: true, advancedForms: true,
      adminPanel: true, socialIntegration: true,
    },
  },
};

export default PLAN_PRESETS;

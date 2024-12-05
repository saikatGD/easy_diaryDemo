// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "User": "User",
      "Settings": "Settings",
      "Logout": "Log Out",
      "Language": "Language",
      "Search": "Search..."
    }
  },
  bn: {
    translation: {
      "User": "ব্যবহারকারী",
      "Settings": "সেটিংস",
      "Logout": "লগ আউট",
      "Language": "ভাষা",
      "Search": "অনুসন্ধান করুন..."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Use English if the selected language is not available
  interpolation: {
    escapeValue: false // React already does escaping
  }
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: 'pt', // Idioma padrão inicial
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React já protege contra XSS
  },
});

export default i18n;

import { I18n } from 'i18n-js';
import vi from './locales/vi.json';
import en from './locales/en.json';
import { createContext, useContext, useEffect, useState } from 'react';

const translations = { vi, en };
const i18n = new I18n(translations);

i18n.defaultLocale = 'vi';
i18n.locale = 'vi';
i18n.enableFallback = true;

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(i18n.defaultLocale);

  useEffect(() => {
    i18n.locale = locale;
  }, [locale]);

  const switchLanguage = newLocale => {
    if (i18n.translations[newLocale]) {
      setLocale(prevLocale => {
        i18n.locale = newLocale;
        return newLocale;
      });
    } else {
      console.error(`Language ${newLocale} not supported`);
    }
  };

  return (
    <LanguageContext.Provider value={{ i18n, locale, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export { i18n };
export default LanguageProvider;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "../i18n";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    detection: {
      lookupLocalStorage: "babelify.i18n.current",
      caches: ["localStorage"],
      order: ["localStorage", "navigator"]
    },
    resources, // the translations
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export const withI18N = (Component) => (ctx) => <Component {...ctx} />;

export { useTranslation } from "react-i18next";

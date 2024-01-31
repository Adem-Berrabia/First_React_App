import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./languages/en.json";
import french from "./languages/fr.json";
import arabic from "./languages/ar.json";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
const resources = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
  ar: {
    translation: arabic,
  },
};

// @ts-ignore
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    defection: {
      order: ["htmlTag", "localStorage"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { usesuspence: false },
  });

export default i18n;

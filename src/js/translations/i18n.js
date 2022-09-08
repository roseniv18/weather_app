// i18Next Translations
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import translationsEn from './translationsEn.json'
import translationsBg from './translationsBg.json'

// i18Next initialization
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: translationsEn},
      bg: {translation: translationsBg}
    },

    lng: 'en',
    fallbackLng: 'en',
  })

  
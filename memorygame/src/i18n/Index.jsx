import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'

import PTBR from './idiomas/pt.json'
import ENUS from './idiomas/en.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'pt', // Define a linguagem inicial
        fallbacklng: 'pt', // Definir um idioma de fallback
        resources: {
            en: {
                translation: ENUS,
            },
            pt: {
                translation: PTBR
            }
        },
        interpolation: {
            escapeValue: false
        },

    })

export default i18n
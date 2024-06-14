import {I18n} from '@grammyjs/i18n'
import type {TranslationVariables} from '@grammyjs/i18n'
import type {Context} from '../bot/bot.context.js'

const localesPath = `${import.meta.dirname}/locales`
export const i18n = new I18n<Context>({
  directory: localesPath,
  defaultLocale: 'en',
  useSession: false,
})

export function translate(key: string, language = 'en', context?: TranslationVariables): string {
  return replaceUnsafeSymbols(i18n.t(language, key, context))
}

export function replaceUnsafeSymbols(text: string): string {
  return text.replace(/[\u2068\u2069]/g, '')
}

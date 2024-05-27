import {I18n, TranslationVariables} from '@grammyjs/i18n'
import {Context} from '../bot/bot.context'

const localesPath = `${process.cwd()}/src/i18n/locales`
export const i18n = new I18n<Context>({
  directory: localesPath,
  defaultLocale: 'en',
})

export function translate(key: string, language = 'en', context?: TranslationVariables): string {
  return replaceUnsafeSymbols(i18n.t(language, key, context))
}

export function replaceUnsafeSymbols(text: string): string {
  return text.replace(/[\u2068\u2069]/g, '')
}

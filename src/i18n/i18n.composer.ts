import {Composer} from 'grammy'
import type {Context} from '../bot/bot.context.js'
import {i18n, replaceUnsafeSymbols} from './i18n.js'

export const i18nComposer = new Composer<Context>()
i18nComposer.use(i18n)
i18nComposer.use((ctx, next) => {
  const translate = ctx.translate
  ctx.translate = (key, variables): string => replaceUnsafeSymbols(translate(key, variables))
  ctx.t = ctx.translate
  return next()
})

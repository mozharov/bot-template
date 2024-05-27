import {Composer} from 'grammy'
import {Context} from '../bot/bot.context'
import {i18n, replaceUnsafeSymbols} from '.'

export const i18nComposer = new Composer<Context>()
i18nComposer.use(i18n)
i18nComposer.use((ctx, next) => {
  const translate = ctx.translate
  ctx.translate = (key, variables) => replaceUnsafeSymbols(translate(key, variables))
  ctx.t = ctx.translate
  return next()
})

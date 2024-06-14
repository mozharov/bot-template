import type {Context} from './bot.context.js'

export function replyWithUnknownCallbackQuery(ctx: Context): Promise<true> {
  return ctx.answerCallbackQuery({text: ctx.t('unknown-callback')})
}

import {Context} from './bot.context'

export async function replyWithUnknownCallbackQuery(ctx: Context): Promise<void> {
  await Promise.all([
    ctx.answerCallbackQuery({text: ctx.t('unknown-callback')}),
    ctx.deleteMessage().catch(() => true),
  ])
}

import {BotError} from 'grammy'
import {Context} from '../bot/bot.context'
import {server} from '../server'

export async function errorHandler(error: BotError<Context>): Promise<void> {
  server.log.error(error)

  const text = error.ctx.t('unknown-error')
  if (error.ctx.callbackQuery) {
    await Promise.all([
      error.ctx.answerCallbackQuery({text}),
      error.ctx.deleteMessage().catch(() => true),
    ])
    return
  }
  await error.ctx.reply(text)
}

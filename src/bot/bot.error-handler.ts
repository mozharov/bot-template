import type {BotError} from 'grammy'
import {server} from '../server/server.js'
import type {Context} from './bot.context.js'

export async function errorHandler(error: BotError<Context>): Promise<void> {
  server.log.error(error)
  const text = error.ctx.t('unknown-error')
  if (error.ctx.callbackQuery) {
    await error.ctx.answerCallbackQuery({text})
    return
  }
  await error.ctx.reply(text)
}

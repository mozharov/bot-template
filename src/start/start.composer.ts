import {Composer} from 'grammy'
import {Context} from '../bot/bot.context'

export const startComposer = new Composer<Context>()

startComposer
  .chatType('private')
  .command('start')
  .use(ctx => ctx.reply(ctx.t('start')))

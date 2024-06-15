import {Composer} from 'grammy'
import {type Context} from '../bot/bot.context.js'
import {database} from '../database/database.js'
import {server} from '../server/server.js'

export const startComposer = new Composer<Context>()

startComposer.chatType('private').command('start', async ctx => {
  await ctx.reply(ctx.t('start'))
  const userExists = await database.users.exists({telegramId: ctx.from.id})
  server.log.debug(`User ${ctx.from.id.toString()} ${userExists ? 'exists' : 'does not exist'}`)
})

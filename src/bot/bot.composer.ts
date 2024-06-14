import {Composer} from 'grammy'
import {type Context} from './bot.context.js'

export const botComposer = new Composer<Context>()

botComposer.command('start', async ctx => {
  await ctx.reply('Welcome! Up and running.')
})

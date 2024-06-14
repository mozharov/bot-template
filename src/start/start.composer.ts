import {Composer} from 'grammy'
import {type Context} from '../bot/bot.context.js'

export const startComposer = new Composer<Context>()

startComposer.command('start', ctx => ctx.reply(ctx.t('start')))

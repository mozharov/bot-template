import {Bot} from 'grammy'
import {config} from '../config'
import {botInfo} from './bot.info'
import {Context} from './bot.context'
import {botComposer} from './bot.composer'
import {autoRetry} from '@grammyjs/auto-retry'
import {errorHandler} from './bot.error-handler'

export const bot = new Bot<Context>(config.get('BOT_TOKEN'), {botInfo})
bot.api.config.use(autoRetry())
bot.errorBoundary(errorHandler).use(botComposer)

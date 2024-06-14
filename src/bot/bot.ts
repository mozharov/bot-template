import {Bot} from 'grammy'
import {config} from '../config.js'
import {botComposer} from './bot.composer.js'
import {autoRetry} from '@grammyjs/auto-retry'
import {errorHandler} from './bot.error-handler.js'

export const bot = new Bot(config.BOT_TOKEN, {
  botInfo: config.botInfo,
})
bot.api.config.use(autoRetry())
bot.errorBoundary(errorHandler).chatType('private').use(botComposer)

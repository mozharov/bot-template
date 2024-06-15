import {Composer} from 'grammy'
import {conversations} from '@grammyjs/conversations'
import type {Context} from '../bot/bot.context.js'
import {errorHandler} from '../bot/bot.error-handler.js'

export const conversationComposer = new Composer<Context>()

// Error boundary: https://grammy.dev/plugins/conversations#leaving-a-conversation
conversationComposer.errorBoundary(errorHandler).use(conversations())

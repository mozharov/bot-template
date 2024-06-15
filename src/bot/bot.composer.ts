import {Composer} from 'grammy'
import {type Context} from './bot.context.js'
import {i18nComposer} from '../i18n/i18n.composer.js'
import {sessionsComposer} from '../sessions/sessions.composer.js'
import {startComposer} from '../start/start.composer.js'
import {replyWithUnknownCallbackQuery} from './bot.actions.js'
import {conversationComposer} from '../conversations/conversations.composer.js'

export const botComposer = new Composer<Context>()

botComposer.use(i18nComposer)
botComposer.use(sessionsComposer)
botComposer.use(conversationComposer)

botComposer.use(startComposer)

botComposer.on('callback_query').use(replyWithUnknownCallbackQuery)

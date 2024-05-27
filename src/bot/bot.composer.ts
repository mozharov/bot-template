import {Composer} from 'grammy'
import {sessionsComposer} from '../sessions/sessions.composer'
import {startComposer} from '../start/start.composer'
import {Context} from './bot.context'
import {replyWithUnknownCallbackQuery} from './bot.actions'
import {i18nComposer} from '../i18n/i18n.composer'

export const botComposer = new Composer<Context>()

botComposer.use(i18nComposer)
botComposer.use(sessionsComposer)

botComposer.use(startComposer)

botComposer.chatType('private').on('callback_query').use(replyWithUnknownCallbackQuery)

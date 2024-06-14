import {Composer} from 'grammy'
import {type Context} from './bot.context.js'
import {i18nComposer} from '../i18n/i18n.composer.js'
import {sessionsComposer} from '../sessions/sessions.composer.js'
import {startComposer} from '../start/start.composer.js'

export const botComposer = new Composer<Context>()

botComposer.use(i18nComposer)
botComposer.use(sessionsComposer)

botComposer.use(startComposer)

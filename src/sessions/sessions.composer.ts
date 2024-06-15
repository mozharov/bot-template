import {Composer, lazySession} from 'grammy'
import type {Context} from '../bot/bot.context.js'
import {SessionStorage} from './sessions.storage.js'

export const sessionsComposer = new Composer<Context>()

// Required for some grammy.js plugins like @grammyjs/conversations
// Store only one session per each chat
sessionsComposer.use(
  lazySession({
    storage: new SessionStorage(),
  }),
)

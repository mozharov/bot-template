import {Composer, lazySession} from 'grammy'
import {Context} from '../bot/bot.context'
import {SessionData} from './sessions.context'
import {TypeormSessionStorage} from './sessions.storage'

export const sessionsComposer = new Composer<Context>()

// session per each chat
sessionsComposer.use(
  lazySession({
    initial,
    storage: new TypeormSessionStorage(),
  }),
)

// session data migrations: https://grammy.dev/plugins/session#storage-enhancements
function initial(): SessionData {
  return {}
}

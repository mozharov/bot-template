import type {Context as GrammyContext} from 'grammy'
import type {SessionsFlavor} from '../sessions/sessions.context.js'
import type {ConversationsFlavor} from '../conversations/conversations.context.js'
import type {I18nFlavor} from '../i18n/i18n.context.js'

export type Context = GrammyContext & I18nFlavor & SessionsFlavor & ConversationsFlavor

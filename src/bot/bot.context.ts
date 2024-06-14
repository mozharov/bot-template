import type {Context as GrammyContext} from 'grammy'
import type {I18nFlavor} from '@grammyjs/i18n'
import type {SessionsFlavor} from '../sessions/sessions.context.js'

export type Context = GrammyContext & I18nFlavor & SessionsFlavor

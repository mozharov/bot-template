import {Context as GrammyContext} from 'grammy'
import {SessionsFlavor} from '../sessions/sessions.context'
import {I18nFlavor} from '@grammyjs/i18n'

export type Context = GrammyContext & SessionsFlavor & I18nFlavor

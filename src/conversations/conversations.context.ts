import type {ConversationFlavor, Conversation as GrammyConversation} from '@grammyjs/conversations'
import type {Context} from '../bot/bot.context.js'

export type ConversationsFlavor = ConversationFlavor
export type Conversation = GrammyConversation<Context>

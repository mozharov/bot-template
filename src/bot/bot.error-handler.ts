import {type BotError} from 'grammy'
import {server} from '../server/server.js'

export function errorHandler(error: BotError): void {
  server.log.error(error)
}

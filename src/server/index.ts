import Fastify from 'fastify'
import {config} from '../config'
import {loggerConfig} from './server.logger'
import {botPlugin} from '../bot/bot.plugin'
import {errorHandler} from './server.error-handler'

export const server = Fastify({logger: loggerConfig})
server.setErrorHandler(errorHandler)

export async function launch() {
  await server.register(botPlugin)

  await server.listen({port: config.get('PORT')})
}

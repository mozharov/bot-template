import initFastify from 'fastify'
import cors from '@fastify/cors'
import {loggerConfig as logger} from './server.logger.js'
import {config} from '../config.js'
import {botPlugin} from '../bot/bot.plugin.js'
import {errorHandler} from './server.error-handler.js'
import {databasePlugin} from '../database/database.plugin.js'

export const server = await initFastify({logger})

export async function bootstrap(): Promise<void> {
  server.setErrorHandler(errorHandler)
  await server.register(cors, {origin: config.corsOrigins})
  await server.register(botPlugin)
  await server.register(databasePlugin)
  await server.listen({port: config.PORT})
}

export async function stopServer(): Promise<void> {
  server.log.info('Stopping server...')
  await server.close()
}

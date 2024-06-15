import {type FastifyBaseLogger, type FastifyRequest} from 'fastify'
import {type PinoLoggerOptions} from 'fastify/types/logger.js'
import {config} from '../config.js'
import {botPath} from '../bot/bot.plugin.js'

const loggers: Record<string, FastifyBaseLogger | boolean | PinoLoggerOptions> = {
  development: {
    level: config.LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    serializers: {
      req: serializeRequest,
    },
  },
  production: {
    level: config.LOG_LEVEL,
    formatters: {level: label => ({level: label}), bindings: () => ({})},
    timestamp: false,
    serializers: {
      req: serializeRequest,
    },
  },
  test: false,
}

export const loggerConfig = loggers[config.NODE_ENV]

function serializeRequest(request: FastifyRequest): string | Record<string, string> {
  if (request.url.startsWith(botPath)) return 'bot-webhook'
  return {
    url: request.url,
    method: request.method,
  }
}

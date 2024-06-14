import {type FastifyBaseLogger, type FastifyRequest} from 'fastify'
import {type PinoLoggerOptions} from 'fastify/types/logger.js'
import {config} from '../config.js'

const envToLogger: Record<string, FastifyBaseLogger | boolean | PinoLoggerOptions> = {
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
      req(request: FastifyRequest) {
        return {
          url: request.url,
          method: request.method,
        }
      },
    },
  },
  production: {
    level: config.LOG_LEVEL,
    formatters: {level: label => ({level: label}), bindings: () => ({})},
    timestamp: false,
    serializers: {
      req(request: FastifyRequest) {
        return {
          url: request.url,
          method: request.method,
        }
      },
    },
  },
  test: false,
}

export const loggerConfig = envToLogger[config.NODE_ENV]

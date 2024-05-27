import {FastifyBaseLogger, FastifyRequest} from 'fastify'
import {PinoLoggerOptions} from 'fastify/types/logger'
import {config} from '../config'
import {isBotApi} from './server.helper'

const envToLogger: Record<string, FastifyBaseLogger | boolean | PinoLoggerOptions> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    serializers: {
      req(request: FastifyRequest) {
        if (isBotApi(request)) return undefined
        return {
          url: request.url,
          method: request.method,
          hostname: request.hostname,
          remoteAddress: request.socket.remoteAddress,
          remotePort: request.socket.remotePort,
        }
      },
    },
    level: 'debug',
  },
  production: {
    level: config.get('LOG_LEVEL'),
    serializers: {
      req(request: FastifyRequest) {
        const url = isBotApi(request) ? undefined : request.url
        return {
          url,
          method: request.method,
          hostname: request.hostname,
          remoteAddress: request.socket.remoteAddress,
          remotePort: request.socket.remotePort,
        }
      },
    },
  },
  test: false,
}

export const loggerConfig = envToLogger[config.get('NODE_ENV')]

import {FastifyRequest} from 'fastify'
import {config} from '../config'

export function isBotApi(request: FastifyRequest) {
  return request.url === `/${config.get('BOT_TOKEN')}`
}

import {FastifyError, FastifyReply, FastifyRequest} from 'fastify'
import {server} from '.'
import {isBotApi} from './server.helper'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  server.log.fatal(error)
  const code = isBotApi(request) ? 200 : 500
  await reply.status(code).send({error: 'Internal Server Error'})
}

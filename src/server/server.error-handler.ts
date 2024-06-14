import {constants as codes} from 'node:http2'
import {server} from './server.js'
import {type FastifyError, type FastifyReply, type FastifyRequest} from 'fastify'

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  server.log.error(error)
  await reply.status(codes.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({error: 'Internal Server Error'})
}

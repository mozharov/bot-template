import fastifyPlugin from 'fastify-plugin'
import {webhookCallback} from 'grammy'
import {bot} from '.'
import {config} from '../config'

export const botPlugin = fastifyPlugin((server, opts, done) => {
  if (config.fetchBotInfo && config.isProd) {
    server.log.warn('Bot info will be fetched from Telegram')
  }

  server.post(
    `/${config.get('BOT_TOKEN')}`,
    webhookCallback(bot, 'fastify', {
      secretToken: config.get('SECRET_TOKEN'),
      onTimeout(...args) {
        server.log.fatal(args, 'Telegram webhook timed out')
      },
    }),
  )

  done()
})

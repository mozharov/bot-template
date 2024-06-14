import fastifyPlugin from 'fastify-plugin'
import {config} from '../config.js'
import {webhookCallback} from 'grammy'
import {bot} from './bot.js'
import {startTunnel, stopTunnel} from '../server/server.tunnel.js'

const botPath = `/bot${config.BOT_TOKEN}`

export const botPlugin = fastifyPlugin(async server => {
  if (!config.botInfo && config.isProduction) {
    server.log.warn('Bot info was not provided. It will be fetched from Telegram.')
  }

  server
    .post(
      botPath,
      webhookCallback(bot, 'fastify', {
        secretToken: config.SECRET_TOKEN,
        onTimeout(...args) {
          server.log.error(args, 'Telegram webhook timed out')
        },
      }),
    )
    .setErrorHandler((error, request, reply) => {
      server.log.error(error)
      return reply.status(200).send()
    })

  if (config.isDevelopment) {
    const tunnelUrl = await startTunnel()
    await bot.api.setWebhook(`${tunnelUrl}${botPath}`, {
      secret_token: config.SECRET_TOKEN,
    })
    server.addHook('onClose', async () => {
      await bot.api.deleteWebhook()
      await stopTunnel()
    })
  }
})

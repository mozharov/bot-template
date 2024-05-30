import {server} from '.'
import {bot} from '../bot'
import {config} from '../config'

export async function createTonnel() {
  const token = config.get('NGROK_TOKEN')
  const domain = config.get('NGROK_DOMAIN')
  if (!config.isDev) return
  if (!token) {
    server.log.warn('NGROK_TOKEN is not set, skipping ngrok setup')
    return
  }
  if (!domain) {
    server.log.info('NGROK_DOMAIN is not set, using random domain')
  }
  const ngrok = await import('@ngrok/ngrok')
  const listener = await ngrok.connect({
    addr: config.get('PORT'),
    authtoken: token,
    domain: domain ?? undefined,
  })
  const url = listener.url()
  server.log.info(`Ngrok tunnel available at ${url}`)
  await bot.api.setWebhook(`${url}/${config.get('BOT_TOKEN')}`, {
    secret_token: config.get('SECRET_TOKEN'),
  })
}

export async function closeTonnel() {
  if (!config.isDev) return
  const ngrok = await import('@ngrok/ngrok')
  await ngrok.disconnect()
}

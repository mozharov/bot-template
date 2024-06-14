import ngrok from '@ngrok/ngrok'
import {type Listener} from '@ngrok/ngrok'
import {config} from '../config.js'
import {server} from './server.js'

let tunnel: Listener | undefined

export async function startTunnel(): Promise<string> {
  server.log.info('Starting tunnel...')
  tunnel = await ngrok.connect({port: config.PORT, authtoken: config.NGROK_TOKEN})
  const url = tunnel.url()
  if (!url) throw new Error(`Failed to get tunnel URL`)
  server.log.info(`Tunnel started: ${url}`)
  return url
}

export async function stopTunnel(): Promise<void> {
  if (!tunnel) return
  server.log.info('Stopping tunnel...')
  await tunnel.close()
}

import {bootstrap, server, stopServer} from './server/server.js'

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

try {
  server.log.info('Starting server...')
  await bootstrap()
} catch (error) {
  server.log.error(error)
  process.exit(1)
}

function shutdown(): void {
  setTimeout(() => {
    server.log.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
  void stopServer().then(() => process.exit(0))
}

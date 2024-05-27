import 'reflect-metadata'
import {launch, server} from './server'
import {closeTonnel, createTonnel} from './server/server.tonnel'
import {DataSource} from './database'

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
process.on('exit', code => server.log.debug(`About to exit with code: ${code}`))

function shutdown() {
  server.log.debug('Received kill signal, shutting down gracefully.')
  server.close(async () => {
    server.log.debug('Closed out remaining connections.')
    await DataSource.destroy()
    await closeTonnel()
    process.exit(0)
  })

  setTimeout(() => {
    server.log.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
}

async function bootstrap(): Promise<void> {
  try {
    server.log.debug('Starting application...')
    await DataSource.initialize()
    await launch()
    await createTonnel()
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

void bootstrap()

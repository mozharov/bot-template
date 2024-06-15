import fastifyPlugin from 'fastify-plugin'
import {initORM} from './database.js'
import {RequestContext} from '@mikro-orm/postgresql'
import {config} from '../config.js'

export const databasePlugin = fastifyPlugin(async server => {
  server.log.debug('Initializing database...')
  const database = await initORM()
  if (config.DB_MIGRATE) await database.orm.migrator.up()
  if (config.DB_SYNC) {
    if (config.isProduction) throw new Error('Cannot sync database in production')
    await database.orm.schema.updateSchema({safe: true})
  }
  server.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(database.em, done)
  })
  server.addHook('onClose', async () => {
    server.log.debug('Closing database connection...')
    await database.orm.close()
  })
})

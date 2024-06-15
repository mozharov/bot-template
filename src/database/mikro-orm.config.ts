import type {Options} from '@mikro-orm/postgresql'
import {PostgreSqlDriver} from '@mikro-orm/postgresql'
import {TsMorphMetadataProvider} from '@mikro-orm/reflection'
import {config} from '../config.js'
import {Migrator} from '@mikro-orm/migrations'

const databaseConfig: Options = {
  driver: PostgreSqlDriver,
  clientUrl: config.DB_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: config.LOG_LEVEL === 'trace',
  extensions: [Migrator],
  loadStrategy: 'joined',
  pool: {
    min: 0,
    max: config.DB_POOL_MAX,
    idleTimeoutMillis: config.DB_POOL_IDLE_TIMEOUT_MS,
  },
  schemaGenerator: {
    disableForeignKeys: false,
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    disableForeignKeys: false,
  },
}

export default databaseConfig

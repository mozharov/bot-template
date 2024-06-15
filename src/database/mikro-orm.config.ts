import type {Options} from '@mikro-orm/postgresql'
import {PostgreSqlDriver} from '@mikro-orm/postgresql'
import {TsMorphMetadataProvider} from '@mikro-orm/reflection'
import {config} from '../config.js'

export const databaseConfig: Options = {
  driver: PostgreSqlDriver,
  clientUrl: config.DB_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: config.LOG_LEVEL === 'trace',
}

export default databaseConfig

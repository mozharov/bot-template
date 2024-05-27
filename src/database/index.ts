import {DataSourceOptions, DataSource as TypeOrmDataSource} from 'typeorm'
import {config} from '../config'
import {User} from '../users/entities/user.entity'
import {Session} from '../sessions/entities/session.entity'

export const typeormOptions: DataSourceOptions = {
  entities: [User, Session],
  migrations: [],
  subscribers: [],
  type: 'postgres',
  migrationsTableName: 'migrations',
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  synchronize: config.get('DB_SYNCHRONIZE'),
  migrationsRun: config.get('DB_MIGRATIONS_RUN'),
  logging: config.get('LOG_LEVEL') === 'trace',
  poolSize: config.get('DB_POOL_SIZE'),
}

export const DataSource = new TypeOrmDataSource(typeormOptions)

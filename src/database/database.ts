import type {EntityManager, Options} from '@mikro-orm/postgresql'
import {MikroORM} from '@mikro-orm/postgresql'
import databaseConfig from './mikro-orm.config.js'
import {User} from '../users/entities/user.entity.js'
import type {UserRepository} from '../users/users.repository.js'

export let database: DatabaseServices

export async function initORM(options?: Options): Promise<DatabaseServices> {
  const instance = await MikroORM.init({
    ...databaseConfig,
    ...options,
  })
  database = {
    orm: instance,
    em: instance.em,
    users: instance.em.getRepository(User),
  }
  return database
}

export interface DatabaseServices {
  orm: MikroORM
  em: EntityManager
  users: UserRepository
}

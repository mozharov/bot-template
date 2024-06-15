import type {EntityManager, EntityRepository, Options} from '@mikro-orm/postgresql'
import {MikroORM} from '@mikro-orm/postgresql'
import databaseConfig from './mikro-orm.config.js'
import {User} from '../users/entities/user.entity.js'

export let database: DatabaseServices | undefined

export async function initORM(options?: Options): Promise<DatabaseServices> {
  if (database) return database
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

interface DatabaseServices {
  orm: MikroORM
  em: EntityManager
  users: EntityRepository<User>
}

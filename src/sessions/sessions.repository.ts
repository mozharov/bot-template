import {EntityRepository} from '@mikro-orm/postgresql'
import type {Session} from './entities/session.entity.js'

export class SessionsRepository extends EntityRepository<Session> {
  public async exists(key: Session['key']): Promise<boolean> {
    const count = await this.count({key})
    return count > 0
  }
}

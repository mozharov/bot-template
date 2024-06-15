import type {FilterQuery} from '@mikro-orm/postgresql'
import {EntityRepository} from '@mikro-orm/postgresql'
import type {User} from './entities/user.entity.js'

export class UsersRepository extends EntityRepository<User> {
  public async exists(where: FilterQuery<User>): Promise<boolean> {
    const count = await this.count(where)
    return count > 0
  }
}

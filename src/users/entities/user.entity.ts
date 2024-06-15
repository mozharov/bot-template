import {Entity, Property, BigIntType, EntityRepositoryType} from '@mikro-orm/postgresql'
import {BaseEntity} from '../../database/common/base.entity.js'
import {UserRepository} from '../users.repository.js'

@Entity({tableName: 'users', repository: () => UserRepository})
export class User extends BaseEntity {
  public [EntityRepositoryType]?: UserRepository

  @Property({type: BigIntType, unique: true})
  public telegramId: number

  constructor(telegramId: User['telegramId']) {
    super()
    this.telegramId = telegramId
  }
}

import {Entity, Property, BigIntType, EntityRepositoryType} from '@mikro-orm/postgresql'
import {BaseEntity} from '../../database/common/base.entity.js'
import {UsersRepository} from '../users.repository.js'

@Entity({tableName: 'users', repository: () => UsersRepository})
export class User extends BaseEntity {
  public [EntityRepositoryType]?: UsersRepository

  @Property({type: BigIntType, unique: true})
  public telegramId: number

  constructor(telegramId: User['telegramId']) {
    super()
    this.telegramId = telegramId
  }
}

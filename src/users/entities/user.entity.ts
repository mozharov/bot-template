import {Entity, Property, BigIntType} from '@mikro-orm/postgresql'
import {BaseEntity} from '../../database/common/base.entity.js'

@Entity({tableName: 'users'})
export class User extends BaseEntity {
  @Property({type: BigIntType, unique: true})
  public telegramId!: number
}

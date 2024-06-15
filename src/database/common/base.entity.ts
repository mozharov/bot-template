import {DateTimeType, PrimaryKey, Property, UuidType} from '@mikro-orm/postgresql'
import {randomUUID} from 'crypto'

export abstract class BaseEntity {
  @PrimaryKey({type: UuidType})
  public id: string = randomUUID()

  @Property({type: DateTimeType})
  public createdAt = new Date()

  @Property({onUpdate: () => new Date(), type: DateTimeType})
  public updatedAt = new Date()
}

import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  StringType,
  TextType,
} from '@mikro-orm/postgresql'
import {SessionsRepository} from '../sessions.repository.js'

@Entity({tableName: 'sessions', repository: () => SessionsRepository})
export class Session {
  public [EntityRepositoryType]?: SessionsRepository

  @PrimaryKey({type: StringType})
  public key: string

  @Property({type: TextType})
  public value: string

  constructor(key: Session['key'], value: Session['value']) {
    this.key = key
    this.value = value
  }
}

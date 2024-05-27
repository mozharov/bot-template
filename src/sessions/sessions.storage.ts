import {Repository} from 'typeorm'
import {Session} from './entities/session.entity'
import {DataSource} from '../database'

export class TypeormSessionStorage {
  private readonly repository: Repository<Session>

  constructor() {
    this.repository = DataSource.getRepository(Session)
  }

  public async read(key: string): Promise<unknown> {
    const session = await this.repository.findOneBy({key})
    return session ? JSON.parse(session.value) : undefined
  }

  public async write(key: string, value: unknown): Promise<void> {
    const session = new Session()
    session.key = key
    session.value = JSON.stringify(value)
    await session.save()
  }

  public async delete(key: string): Promise<void> {
    await this.repository.delete({key})
  }

  public async has(key: string): Promise<boolean> {
    return this.repository.existsBy({key})
  }
}

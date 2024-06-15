import {database} from '../database/database.js'

export class SessionStorage {
  public async read(key: string): Promise<unknown> {
    const session = await database.sessions.findOne({key})
    if (!session) return undefined
    const value: unknown = JSON.parse(session.value)
    return value || undefined
  }

  public write(key: string, value: unknown): Promise<void> {
    if (!value) return this.delete(key)
    database.sessions.create({key, value: JSON.stringify(value)})
    return database.em.flush()
  }

  public async delete(key: string): Promise<void> {
    await database.sessions.nativeDelete({key})
  }

  public has(key: string): Promise<boolean> {
    return database.sessions.exists(key)
  }
}

export class SessionStorage {
  // TODO: save session data to database
  private readonly data: Record<string, unknown> = {}

  public read(key: string): unknown {
    return this.data[key]
  }

  public write(key: string, value: unknown): void {
    this.data[key] = value
  }

  public delete(key: string): void {
    this.data[key] = undefined
  }

  public has(key: string): boolean {
    return this.data[key] !== undefined
  }
}

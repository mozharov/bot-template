import dotenv from 'dotenv'
import {Configuration} from './config.model'
import {plainToClass} from 'class-transformer'
import {validateSync} from 'class-validator'

class ConfigService {
  private readonly config: Configuration

  constructor() {
    const envDirectory = `${process.cwd()}/.env`
    const envLocalDirectory = `${process.cwd()}/.env.local`
    dotenv.config({
      path: [envLocalDirectory, envDirectory],
      debug: process.env.NODE_ENV === 'development',
      override: false,
    })

    const config = plainToClass(Configuration, process.env, {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
    })
    const errors = validateSync(config)
    if (errors.length) throw errors
    this.config = config
  }

  public get<K extends keyof Configuration>(key: K): Configuration[K] {
    return this.config[key]
  }

  public get isDev(): boolean {
    return this.get('NODE_ENV') === 'development'
  }

  public get isProd(): boolean {
    return this.get('NODE_ENV') === 'production'
  }

  public get fetchBotInfo(): boolean {
    return !this.get('BOT_ID') || !this.get('BOT_USERNAME') || !this.get('BOT_FIRSTNAME')
  }
}

export const config = new ConfigService()

import {IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {Expose, Transform} from 'class-transformer'

export class Configuration {
  @Expose()
  @IsEnum(['production', 'development', 'test'])
  NODE_ENV: 'production' | 'development' | 'test'

  @Expose()
  @IsInt()
  @Transform(({value}) => parseInt(value))
  PORT: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  BOT_TOKEN: string

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(({value}) => (value ? parseInt(value) : null))
  BOT_ID: number | null

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({value}) => value || null)
  BOT_USERNAME: string | null

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({value}) => value || null)
  BOT_FIRSTNAME: string | null

  @Expose()
  @IsString()
  @IsNotEmpty()
  SECRET_TOKEN: string

  @Expose()
  @IsEnum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({value}) => value || null)
  NGROK_TOKEN: string | null

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({value}) => value || null)
  NGROK_DOMAIN: string | null

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST: string

  @Expose()
  @IsInt()
  @Transform(({value}) => parseInt(value))
  DB_PORT: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USER: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME: string

  @Expose()
  @IsBoolean()
  @Transform(({value}) => value === 'true')
  DB_SYNCHRONIZE: boolean

  @Expose()
  @IsBoolean()
  @Transform(({value}) => value === 'true')
  DB_MIGRATIONS_RUN: boolean

  @Expose()
  @IsInt()
  @Transform(({value}) => parseInt(value))
  DB_POOL_SIZE: number
}

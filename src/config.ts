import {parseEnv, port, z} from 'znv'
import dotenv from 'dotenv'
import {type UserFromGetMe} from 'grammy/types'

const envDirectory = `${process.cwd()}/.env`
const envLocalDirectory = `${process.cwd()}/.env.local`
dotenv.config({path: [envLocalDirectory, envDirectory]})

export const config = {
  ...parseEnv(process.env, {
    PORT: port(),
    NODE_ENV: z.enum(['production', 'development']),
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
    MINI_APP_ORIGIN: z
      .string()
      .optional()
      .transform(value => value || undefined),
    BOT_ID: z.coerce
      .number()
      .optional()
      .transform(value => value || undefined),
    BOT_NAME: z
      .string()
      .optional()
      .transform(value => value || undefined),
    BOT_USERNAME: z
      .string()
      .optional()
      .transform(value => value || undefined),
    BOT_TOKEN: z.string().min(1),
    SECRET_TOKEN: z.string().min(1),
    NGROK_TOKEN: z
      .string()
      .optional()
      .transform(value => value || undefined),
  }),
  get isDevelopment(): boolean {
    return this.NODE_ENV === 'development'
  },
  get isProduction(): boolean {
    return this.NODE_ENV === 'production'
  },
  get botInfo(): UserFromGetMe | undefined {
    if (!this.BOT_ID || !this.BOT_NAME || !this.BOT_USERNAME) return undefined
    return {
      id: this.BOT_ID,
      first_name: this.BOT_NAME,
      username: this.BOT_USERNAME,
      is_bot: true,
      supports_inline_queries: false,
      can_read_all_group_messages: false,
      can_join_groups: false,
      can_connect_to_business: false,
    }
  },
}

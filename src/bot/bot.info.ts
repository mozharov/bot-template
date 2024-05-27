import {UserFromGetMe} from 'grammy/types'
import {config} from '../config'

export const botInfo = getBotInfo()

function getBotInfo(): UserFromGetMe | undefined {
  const id = config.get('BOT_ID')
  const username = config.get('BOT_USERNAME')
  const first_name = config.get('BOT_FIRSTNAME')

  if (!id || !username || !first_name) return undefined
  return {
    id,
    first_name,
    username,
    is_bot: true,
    can_join_groups: false,
    can_read_all_group_messages: false,
    supports_inline_queries: false,
  }
}

import {FindOptionsWhere, Repository} from 'typeorm'
import {DataSource} from '../database'
import {User} from './entities/user.entity'

class UsersService {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = DataSource.getRepository(User)
  }

  public async getOrCreateUser(telegramId: User['telegramId']): Promise<User> {
    return (await this.findOne({telegramId})) || (await this.create(telegramId))
  }

  private async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.repository.findOneBy(where)
  }

  private async create(telegramId: User['telegramId']): Promise<User> {
    const user = new User()
    user.telegramId = telegramId
    return user.save()
  }
}

export const usersService = new UsersService()

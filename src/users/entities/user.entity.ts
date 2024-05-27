import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true, type: 'bigint'})
  telegramId: number

  @CreateDateColumn({type: 'timestamp with time zone'})
  createdAt: Date
}

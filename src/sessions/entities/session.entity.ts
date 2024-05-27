import {Entity, PrimaryColumn, Column, BaseEntity} from 'typeorm'

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryColumn()
  key: string

  @Column('text')
  value: string
}

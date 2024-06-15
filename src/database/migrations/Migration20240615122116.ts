import {Migration} from '@mikro-orm/migrations'

export class Migration20240615122116 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "telegram_id" bigint not null, constraint "users_pkey" primary key ("id"));',
    )
    this.addSql(
      'alter table "users" add constraint "users_telegram_id_unique" unique ("telegram_id");',
    )
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;')
  }
}

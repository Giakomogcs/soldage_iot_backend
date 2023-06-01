import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdminUser1624035758958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('12345678', 8);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({ name: 'Admin Soldage', email: 'admin@soldage.com', password, inactive: false, isadmin: true })
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from('users').where('email = :email', { email: 'admin@soldage.com' }).execute();
  }
}

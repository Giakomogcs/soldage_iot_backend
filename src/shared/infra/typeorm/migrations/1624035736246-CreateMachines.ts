import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMachines1624035736246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'machines',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'client_id', type: 'uuid' },
          { name: 'code', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'mac_address', type: 'varchar' },
          { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
          { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'MachineClient',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('machines', 'MachineClient');
    await queryRunner.dropTable('machines');
  }
}

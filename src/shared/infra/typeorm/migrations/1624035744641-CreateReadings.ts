import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReadings1624035744641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'readings',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'machine_id', type: 'uuid' },
          { name: 'welding_current', type: 'numeric' },
          { name: 'welding_voltage', type: 'numeric' },
          { name: 'arc_status', type: 'boolean' },
          { name: 'wire_speed', type: 'numeric' },
          { name: 'voltageL1', type: 'numeric' },
          { name: 'voltageL2', type: 'numeric' },
          { name: 'voltageL3', type: 'numeric' },
          { name: 'currentL1', type: 'numeric' },
          { name: 'currentL2', type: 'numeric' },
          { name: 'currentL3', type: 'numeric' },
          { name: 'gas_flow', type: 'numeric' },
          { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
          { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'readingMachine',
            referencedTableName: 'machines',
            referencedColumnNames: ['id'],
            columnNames: ['machine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('readings', 'readingMachine');
    await queryRunner.dropTable('readings');
  }
}

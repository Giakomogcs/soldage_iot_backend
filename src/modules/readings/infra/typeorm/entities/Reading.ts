import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('readings')
class Reading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  machine_id: string;

  @ManyToOne(() => Machine, machine => machine.id)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @Column()
  welding_current: number;

  @Column()
  welding_voltage: number;

  @Column()
  arc_status: boolean;

  @Column()
  wire_speed: number;

  @Column()
  voltageL1: number;

  @Column()
  voltageL2: number;

  @Column()
  voltageL3: number;

  @Column()
  currentL1: number;

  @Column()
  currentL2: number;

  @Column()
  currentL3: number;

  @Column()
  gas_flow: number;

  @Expose({ name: 'input_power' })
  getInputPower(): number {
    return (
      ((Number(this.currentL1) + Number(this.currentL2) + Number(this.currentL3)) / 3) *
      ((Number(this.voltageL1) + Number(this.voltageL1) + Number(this.voltageL1)) / 3)
    );
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reading;

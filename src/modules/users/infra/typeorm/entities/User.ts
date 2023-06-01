import Machine from '@modules/machines/infra/typeorm/entities/Machine';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isadmin: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Machine, machine => machine.client, {
    cascade: true,
  })
  machines: Machine[];

  @Column()
  inactive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;

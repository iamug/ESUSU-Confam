import { BeforeInsert, Column, CreateDateColumn, Entity } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, default: 123456789 })
  password: string;

  @Column({ default: false })
  isEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    if (password || this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }
}

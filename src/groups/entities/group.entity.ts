import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isSearchable: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  creatorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

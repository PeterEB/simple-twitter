import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  userId: number;

  /*******************************************************/
  /* Relations                                           */
  /*******************************************************/
  @ManyToOne(type => User)
  user: User;
}

import {
  Entity,
  Column,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /*******************************************************/
  /* Relations                                           */
  /*******************************************************/
  @ManyToMany(type => User)
  @JoinTable()
  followers: User[];

  @OneToMany(
    type => Tweet,
    tweet => tweet.user,
  )
  tweets: Tweet[];
}

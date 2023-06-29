import { Part } from 'src/parts/entities/part.entity';
import { UserInstru } from 'src/user-instru/entities/user-instru.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany((type) => UserInstru, (userInstru) => userInstru.instrument)
  userInstru: UserInstru[];

  @ManyToMany((type) => Part, (part) => part.instruments)
  parts: Part[];
}

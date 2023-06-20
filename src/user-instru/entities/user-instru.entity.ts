import { Instrument } from 'src/instruments/entities/instrument.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CatInstru {
  ORCHESTRE = 'Orchestre',
  SORTIE = 'Sortie',
  TOUS = 'Les deux',
}

@Entity()
export class UserInstru {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToOne((type) => User, (user) => user.userInstru)
  user: User;

  @JoinTable()
  @ManyToOne((type) => Instrument, (instrument) => instrument.userInstru)
  instrument: Instrument;

  @Column({
    type: 'enum',
    enum: CatInstru,
    default: CatInstru.TOUS,
  })
  category: CatInstru;
}

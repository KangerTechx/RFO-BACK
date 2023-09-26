import { Book } from 'src/books/entities/book.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  pdfName: string;

  @Column()
  key: string;

  @Column()
  url: string;

  @Index()
  @Column()
  ref: string;

  @JoinTable()
  @ManyToOne((type) => Book, (book) => book.parts)
  book: Book;

  @JoinTable()
  @ManyToMany((type) => Instrument, (instrument) => instrument.parts)
  instruments: Instrument[];
}

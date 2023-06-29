import { Book } from 'src/books/entities/book.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pdfName: string;

  @JoinTable()
  @ManyToOne((type) => Book, (book) => book.parts)
  book: Book;

  @JoinTable()
  @ManyToMany((type) => Instrument, (instrument) => instrument.parts)
  instruments: Instrument[];
}

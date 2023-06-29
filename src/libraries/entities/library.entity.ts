import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @JoinTable()
  @OneToMany((type) => Book, (book) => book.library)
  books: Book[];
}

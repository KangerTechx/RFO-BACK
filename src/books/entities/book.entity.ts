import { Arrangor } from 'src/arrangors/entities/arrangor.entity';
import { Compositor } from 'src/compositors/entities/compositor.entity';
import { Library } from 'src/libraries/entities/library.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Style } from 'src/styles/entities/style.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ unique: true, nullable: false })
  number: number;

  @Column({ nullable: true })
  mp3: string;

  @Column({ default: false })
  isSelected: boolean;

  @JoinTable()
  @ManyToMany((type) => Compositor, (compositor) => compositor.books)
  compositors: Compositor[];

  @JoinTable()
  @ManyToMany((type) => Arrangor, (arrangor) => arrangor.books)
  arrangors: Arrangor[];

  @JoinTable()
  @ManyToMany((type) => Style, (style) => style.books)
  styles: Style[];

  @JoinTable()
  @ManyToOne((type) => Library, (library) => library.books)
  library: Library;

  @OneToMany((type) => Part, (part) => part.book)
  parts: Part[];
}

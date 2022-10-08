import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryColumn()
  id: string;

  @Column()
  language: string;

  @Column()
  stdin: string;

  @Column()
  stdout?: string;

  @Column()
  createdDate: string;

  @Column()
  authorID: string;
}

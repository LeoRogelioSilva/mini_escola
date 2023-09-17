import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'curso' })
export class CursoEntity {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nome: string;

  @Column({ default: '' })
  ementa: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'alunos' })
export class AlunoEntity {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nome: string;
}

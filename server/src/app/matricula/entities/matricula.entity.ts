import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'matricula' })
export class MatriculaEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ nullable: true })
  codigoCurso: number;

  @Column({ nullable: true })
  codigoAluno: number;
}

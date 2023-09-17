import { AlunoEntity } from 'src/app/aluno/aluno.entity';
import { CursoEntity } from 'src/app/curso/entities/curso.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'matricula' })
export class MatriculaEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @OneToOne(() => CursoEntity)
  @JoinColumn({ name: 'codigo_curso' })
  codigoCurso: number;

  @OneToOne(() => AlunoEntity)
  @JoinColumn({ name: 'codigo_aluno' })
  codigoAluno: number;
}

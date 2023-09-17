import { AlunoEntity } from 'src/app/aluno/aluno.entity';
import { CursoEntity } from 'src/app/curso/entities/curso.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'matricula' })
export class MatriculaEntity {
  @PrimaryGeneratedColumn()
  codigo: number;

  @OneToOne(() => CursoEntity)
  @JoinColumn({ name: 'codigo_curso' }) // Nome do campo que representa o ID do curso
  codigoCurso: number; // Alterado para número

  @OneToOne(() => AlunoEntity)
  @JoinColumn({ name: 'codigo_aluno' }) // Nome do campo que representa o ID do aluno
  codigoAluno: number; // Alterado para número
}

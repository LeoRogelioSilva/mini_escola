import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlunoEntity } from './aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveAlunoDTO } from './dto/save-aluno.dto';
import { UpdateAlunoDTO } from './dto/update-aluno.dto';
import { MatriculaService } from '../matricula/matricula.service';
import { MatriculaEntity } from '../matricula/entities/matricula.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    private readonly matriculaService: MatriculaService,
  ) {}

  async save(data: SaveAlunoDTO): Promise<AlunoEntity> {
    return this.alunoRepository.save(this.alunoRepository.create(data));
  }

  async findAll(): Promise<AlunoEntity[]> {
    return this.alunoRepository.find({
      order: {
        codigo: 'ASC', // 'ASC' para ordem ascendente, 'DESC' para ordem descendente
      },
    });
  }

  async findOne(codigo: number): Promise<AlunoEntity | null> {
    return this.alunoRepository.findOneBy({ codigo });
  }

  async update(
    codigo: number,
    updateCursoDto: UpdateAlunoDTO,
  ): Promise<AlunoEntity> {
    const curso = await this.findOne(codigo);

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${codigo} não encontrado.`);
    }

    // Aplicar as atualizações do DTO ao recurso existente
    curso.nome = updateCursoDto.nome;

    // Salvar o recurso atualizado no banco de dados
    await this.alunoRepository.save(curso);

    return curso;
  }

  async verificaMatriculas(codigoAluno: number) {
    const matriculas =
      await this.matriculaService.findByCodigoAluno(codigoAluno);

    if (matriculas.length > 0) {
      throw new HttpException(
        {
          message:
            'Não é possível remover o aluno porque existem matrículas relacionadas a ele.',
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Status 422
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findMatricula(codigoAluno: number): Promise<MatriculaEntity[]> {
    return this.matriculaService.findByCodigoAluno(codigoAluno);
  }

  async remove(codigo: number) {
    await this.verificaMatriculas(codigo);

    try {
      return this.alunoRepository.delete(codigo);
    } catch (error) {
      throw new Error('Erro ao remover o aluno.');
    }
  }
}

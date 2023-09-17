import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CursoEntity } from './entities/curso.entity';
import { MatriculaService } from '../matricula/matricula.service';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
    private readonly matriculaService: MatriculaService,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  async findAll() {
    return this.cursoRepository.find();
  }

  async findOne(codigo: number): Promise<CursoEntity | null> {
    return this.cursoRepository.findOneBy({ codigo });
  }

  async update(
    codigo: number,
    updateCursoDto: UpdateCursoDto,
  ): Promise<CursoEntity> {
    const curso = await this.findOne(codigo);

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${codigo} não encontrado.`);
    }

    // Aplicar as atualizações do DTO ao recurso existente
    curso.nome = updateCursoDto.nome;
    curso.ementa = updateCursoDto.ementa;

    // Salvar o recurso atualizado no banco de dados
    await this.cursoRepository.save(curso);

    return curso;
  }

  async verificaMatriculas(codigoCurso: number) {
    const matriculas =
      await this.matriculaService.findByCodigoCurso(codigoCurso);

    if (matriculas.length > 0) {
      throw new HttpException(
        {
          message:
            'Não é possível remover o curso porque existem matrículas relacionadas a ele.',
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Status 422
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(codigo: number) {
    await this.verificaMatriculas(codigo);

    try {
      return this.cursoRepository.delete(codigo);
    } catch (error) {
      throw new Error('Erro ao remover o aluno.');
    }
  }
}

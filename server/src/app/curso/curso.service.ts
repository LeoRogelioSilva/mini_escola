import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CursoEntity } from './entities/curso.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
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

  async remove(codigo: number) {
    return this.cursoRepository.delete(codigo);
  }
}

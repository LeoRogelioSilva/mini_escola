import { Injectable, NotFoundException } from '@nestjs/common';
import { AlunoEntity } from './aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveAlunoDTO } from './dto/save-aluno.dto';
import { UpdateAlunoDTO } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
  ) {}

  async save(data: SaveAlunoDTO): Promise<AlunoEntity> {
    return this.alunoRepository.save(this.alunoRepository.create(data));
  }

  async findAll(): Promise<AlunoEntity[]> {
    return this.alunoRepository.find();
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

  async remove(codigo: number) {
    return this.alunoRepository.delete(codigo);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { MatriculaEntity } from './entities/matricula.entity';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectRepository(MatriculaEntity)
    private readonly matriculaRepository: Repository<MatriculaEntity>,
  ) {}

  async create(data: CreateMatriculaDto): Promise<MatriculaEntity> {
    const matricula = this.matriculaRepository.create(data);

    return this.matriculaRepository.save(matricula);
  }

  findAll() {
    return this.matriculaRepository.find();
  }

  findOne(codigo: number): Promise<MatriculaEntity | null> {
    return this.matriculaRepository.findOneBy({ codigo });
  }

  remove(codigo: number) {
    return this.matriculaRepository.delete(codigo);
  }

  async findByCodigoAluno(codigoAluno: number): Promise<MatriculaEntity[]> {
    return this.matriculaRepository.find({
      where: {
        codigoAluno: codigoAluno,
      },
    });
  }

  async findByCodigoCurso(codigoCurso: number): Promise<MatriculaEntity[]> {
    return this.matriculaRepository.find({
      where: {
        codigoCurso: codigoCurso,
      },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { MatriculaService } from './matricula.service';
import { Repository } from 'typeorm';
import { MatriculaEntity } from './entities/matricula.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateMatriculaDto } from './dto/create-matricula.dto';

describe('MatriculaService', () => {
  let matriculaService: MatriculaService;
  let matriculaRepository: Repository<MatriculaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatriculaService,
        {
          provide: getRepositoryToken(MatriculaEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    matriculaService = module.get<MatriculaService>(MatriculaService);
    matriculaRepository = module.get<Repository<MatriculaEntity>>(
      getRepositoryToken(MatriculaEntity),
    );
  });

  it('should be defined', () => {
    expect(matriculaService).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar aluno com sucesso', async () => {
      const data: CreateMatriculaDto = {
        codigoAluno: 1,
        codigoCurso: 1,
      };

      const cursoEntityMock = {
        codigoAluno: 1,
        codigoCurso: 1,
      } as MatriculaEntity;

      jest
        .spyOn(matriculaRepository, 'create')
        .mockReturnValueOnce(cursoEntityMock);
      jest
        .spyOn(matriculaRepository, 'save')
        .mockResolvedValueOnce(cursoEntityMock);
      const result = await matriculaRepository.save(data);

      expect(result).toBeDefined();
      expect(matriculaRepository.create).toBeCalledTimes(1);
      expect(matriculaRepository.save).toBeCalledTimes(1);
    });
  });
});

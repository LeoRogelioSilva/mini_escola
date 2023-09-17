import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { CursoEntity } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';

describe('CursoService', () => {
  let cursoService: CursoService;
  let cursoRepository: Repository<CursoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        {
          provide: getRepositoryToken(CursoEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    cursoService = module.get<CursoService>(CursoService);
    cursoRepository = module.get<Repository<CursoEntity>>(
      getRepositoryToken(CursoEntity),
    );
  });

  it('should be defined', () => {
    expect(cursoService).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar curso com sucesso', async () => {
      const data: CreateCursoDto = {
        nome: 'Curso 1',
        ementa: 'Ementa',
      };

      const cursoEntityMock = {
        nome: 'Teste',
        ementa: 'Ementa',
      } as CursoEntity;

      jest
        .spyOn(cursoRepository, 'save')
        .mockResolvedValueOnce(cursoEntityMock);
      jest
        .spyOn(cursoRepository, 'create')
        .mockReturnValueOnce(cursoEntityMock);
      const result = await cursoService.create(data);

      expect(result).toBeDefined();
      expect(cursoRepository.create).toBeCalledTimes(1);
      expect(cursoRepository.create).toBeCalledTimes(1);
    });
  });
});

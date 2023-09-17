import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlunoEntity } from './aluno.entity';
import { Repository } from 'typeorm';
import { SaveAlunoDTO } from './dto/save-aluno.dto';

describe('AlunoService', () => {
  let alunoService: AlunoService;
  let alunoRepository: Repository<AlunoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunoService,
        {
          provide: getRepositoryToken(AlunoEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    alunoService = module.get<AlunoService>(AlunoService);
    alunoRepository = module.get<Repository<AlunoEntity>>(
      getRepositoryToken(AlunoEntity),
    );
  });

  it('should be defined', () => {
    expect(alunoService).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar aluno com sucesso', async () => {
      const data: SaveAlunoDTO = {
        nome: 'Aluno 1',
      };

      const alunoEntityMock = {
        nome: 'Teste',
      } as AlunoEntity;

      jest
        .spyOn(alunoRepository, 'create')
        .mockReturnValueOnce(alunoEntityMock);
      jest
        .spyOn(alunoRepository, 'save')
        .mockResolvedValueOnce(alunoEntityMock);
      const result = await alunoService.save(data);

      expect(result).toBeDefined();
      expect(alunoRepository.create).toBeCalledTimes(1);
      expect(alunoRepository.save).toBeCalledTimes(1);
    });
  });
});

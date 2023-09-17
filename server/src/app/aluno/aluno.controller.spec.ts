import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { SaveAlunoDTO } from './dto/save-aluno.dto';
import { AlunoEntity } from './aluno.entity';

describe('AlunoController', () => {
  let alunoController: AlunoController;
  let alunoService: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    alunoController = module.get<AlunoController>(AlunoController);
    alunoService = module.get<AlunoService>(AlunoService);
  });

  it('should be defined', () => {
    expect(alunoController).toBeDefined();
    expect(alunoService).toBeDefined();
  });

  describe('save', () => {
    it('deve salvar um novo aluno com sucesso', async () => {
      const body: SaveAlunoDTO = {
        nome: 'Teste Controller',
      };

      const alunoEntityMock = { nome: 'Teste Controller' } as AlunoEntity;

      jest.spyOn(alunoService, 'save').mockResolvedValueOnce(alunoEntityMock);

      const result = await alunoController.store(body);

      expect(result).toBeDefined();
      expect(alunoService.save).toBeCalledTimes(1);
    });
  });
});

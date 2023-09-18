import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { SaveAlunoDTO } from './dto/save-aluno.dto';
import { UpdateAlunoDTO } from './dto/update-aluno.dto';

@Controller('api/v1/aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async store(@Body() body: SaveAlunoDTO) {
    return this.alunoService.save(body);
  }

  @Get()
  async findAll() {
    return this.alunoService.findAll();
  }

  @Get('/teste/:codigo')
  async findMatricula(@Param('codigo') codigo: string) {
    return this.alunoService.findMatricula(Number(codigo));
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: number) {
    return this.alunoService.findOne(+codigo);
  }

  @Put(':codigo')
  update(
    @Param('codigo') codigo: number,
    @Body() updateAlunoDto: UpdateAlunoDTO,
  ) {
    return this.alunoService.update(+codigo, updateAlunoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.alunoService.remove(+codigo);
  }
}

import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  Delete,
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

  @Get(':codigo')
  findOne(@Param('codigo') codigo: number) {
    return this.alunoService.findOne(+codigo);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateMatriculaDto: UpdateAlunoDTO,
  ) {
    return this.alunoService.update(+codigo, updateMatriculaDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.alunoService.remove(+codigo);
  }
}

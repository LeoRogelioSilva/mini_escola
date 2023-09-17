import { PartialType } from '@nestjs/mapped-types';
import { SaveAlunoDTO } from './save-aluno.dto';

export class UpdateAlunoDTO extends PartialType(SaveAlunoDTO) {
  nome?: string;
}

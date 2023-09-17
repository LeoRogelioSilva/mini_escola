import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoEntity } from './aluno.entity';
import { AlunoController } from './aluno.controller';
import { MatriculaModule } from '../matricula/matricula.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoEntity]), MatriculaModule],
  providers: [AlunoService],
  controllers: [AlunoController],
})
export class AlunoModule {}

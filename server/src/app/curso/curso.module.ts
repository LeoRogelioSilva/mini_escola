import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { CursoEntity } from './entities/curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatriculaModule } from '../matricula/matricula.module';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEntity]), MatriculaModule],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}

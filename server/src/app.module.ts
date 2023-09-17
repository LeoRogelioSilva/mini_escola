import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AlunoEntity } from './app/aluno/aluno.entity';
import { AlunoModule } from './app/aluno/aluno.module';
import { CursoEntity } from './app/curso/entities/curso.entity';
import { CursoModule } from './app/curso/curso.module';
import { MatriculaModule } from './app/matricula/matricula.module';
import { MatriculaEntity } from './app/matricula/entities/matricula.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'matricula',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'leoo1202',
      synchronize: true,
      entities: [AlunoEntity, CursoEntity, MatriculaEntity],
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    AlunoModule,
    CursoModule,
    MatriculaModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  constructor(private readonly logger: Logger) {
    this.logger.log('AppModule inicializado'); // Log para verificar a inicialização do AppModule
  }
}

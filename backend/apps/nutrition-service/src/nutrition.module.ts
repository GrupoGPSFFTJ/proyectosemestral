import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { ProgramaNutricionalService } from './services/programa-nutricional.service';
import { InscripcionPacamService } from './services/inscripcion-pacam.service';
import { InformePacamService } from './services/informe-pacam.service';
import { ControlDesembolsoService } from './services/control-desembolso.service';
import { ProgramaNutricionalController } from './controllers/programa-nutricional.controller';
import { InscripcionPacamController } from './controllers/inscripcion-pacam.controller';
import { InformePacamController } from './controllers/informe-pacam.controller';
import { ControlDesembolsoController } from './controllers/control-desembolso.controller';
import { ProgramaNutricional } from './entities/programa-nutricional.entity';
import { InscripcionPacam } from './entities/inscripcion-pacam.entity';
import { InformePacam } from './entities/informe-pacam.entity';
import { ControlDesembolso } from './entities/control-desembolso.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASS'),
        database: cfg.get('DB_NAME'),
        schema: cfg.get('SCHEMA_NUTRITION'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          poolMode: cfg.get('DB_POOL_MODE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      ProgramaNutricional,
      InscripcionPacam,
      InformePacam,
      ControlDesembolso,
    ]),
    AuthModule,
  ],
  controllers: [
    ProgramaNutricionalController,
    InscripcionPacamController,
    InformePacamController,
    ControlDesembolsoController,
  ],
  providers: [
    ProgramaNutricionalService,
    InscripcionPacamService,
    InformePacamService,
    ControlDesembolsoService,
  ],
})
export class NutritionModule {}

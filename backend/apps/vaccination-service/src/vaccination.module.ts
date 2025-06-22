import { Module } from '@nestjs/common';
import { VacunaService } from './services/vacuna.service';
import { CalendarioVacunaService } from './services/calendario-vacuna.service';
import { RegistroVacunacionService } from './services/registro-vacunacion.service';
import { AlertaInasistenciaService } from './services/alerta-inasistencia.service';
import { VacunaController } from './controllers/vacuna.controller';
import { CalendarioVacunaController } from './controllers/calendario-vacuna.controller';
import { RegistroVacunacionController } from './controllers/registro-vacunacion.controller';
import { AlertaInasistenciaController } from './controllers/alerta-inasistencia.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { Vacuna } from './entities/vacuna.entity';
import { CalendarioVacuna } from './entities/calendario-vacuna.entity';
import { RegistroVacunacion } from './entities/registro-vacunacion.entity';
import { AlertaInasistencia } from './entities/alerta-inasistencia.entity';

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
        schema: cfg.get('SCHEMA_VACCINATION'),
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
      Vacuna,
      CalendarioVacuna,
      RegistroVacunacion,
      AlertaInasistencia,
    ]),
    AuthModule,
  ],
  controllers: [
    VacunaController,
    CalendarioVacunaController,
    RegistroVacunacionController,
    AlertaInasistenciaController,
  ],
  providers: [
    VacunaService,
    CalendarioVacunaService,
    RegistroVacunacionService,
    AlertaInasistenciaService,
  ],
})
export class VaccinationModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { Paciente } from './entities/paciente.entity';
import { ProgramaControl } from './entities/programa-control.entity';
import { Familia } from './entities/familia.entity';
import { TipoRelacion } from './entities/tipo-relacion.entity';
import { MiembroFamiliar } from './entities/miembro-familiar.entity';
import { PlanIntervencion } from './entities/plan-intervencion.entity';
import { FactorRiesgo } from './entities/factor-riesgo.entity';
import { FactorProtector } from './entities/factor-protector.entity';
import { FichaControl } from './entities/ficha-control.entity';
import { HistorialResultado } from './entities/historial-resultado.entity';
import { PacienteService } from './services/paciente.service';
import { ProgramaControlService } from './services/programa-control.service';
import { FamiliaService } from './services/familia.service';
import { TipoRelacionService } from './services/tipo-relacion.service';
import { MiembroFamiliarService } from './services/miembro-familiar.service';
import { FactorRiesgoService } from './services/factor-riesgo.service';
import { FactorProtectorService } from './services/factor-protector.service';
import { FichaControlService } from './services/ficha-control.service';
import { HistorialResultadoService } from './services/historial-resultado.service';
import { PlanIntervencionService } from './services/plan-intervencion.service';
import { PacienteController } from './controllers/paciente.controller';
import { ProgramaControlController } from './controllers/programa-control.controller';
import { FamiliaController } from './controllers/familia.controller';
import { TipoRelacionController } from './controllers/tipo-relacion.controller';
import { MiembroFamiliarController } from './controllers/miembro-familiar.controller';
import { PlanIntervencionController } from './controllers/plan-intervencion.controller';
import { FactorRiesgoController } from './controllers/factor-riesgo.controller';
import { FactorProtectorController } from './controllers/factor-protector.controller';
import { FichaControlController } from './controllers/ficha-control.controller';
import { HistorialResultadoController } from './controllers/historial-resultado.controller';
import { EnumsController } from './controllers/enums.controller';
import { EnumsService } from './services/enums.service';

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
        schema: cfg.get('SCHEMA_PATIENT'),
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
      Paciente,
      ProgramaControl,
      Familia,
      TipoRelacion,
      MiembroFamiliar,
      PlanIntervencion,
      FactorRiesgo,
      FactorProtector,
      FichaControl,
      HistorialResultado,
    ]),
    AuthModule,
  ],
  controllers: [
    PacienteController,
    ProgramaControlController,
    FamiliaController,
    TipoRelacionController,
    MiembroFamiliarController,
    PlanIntervencionController,
    FactorRiesgoController,
    FactorProtectorController,
    FichaControlController,
    HistorialResultadoController,
    EnumsController,
  ],
  providers: [
    PacienteService,
    ProgramaControlService,
    FamiliaService,
    TipoRelacionService,
    MiembroFamiliarService,
    FactorRiesgoService,
    FactorProtectorService,
    FichaControlService,
    HistorialResultadoService,
    PlanIntervencionService,
    EnumsService,
  ],
})
export class PatientModule {
}

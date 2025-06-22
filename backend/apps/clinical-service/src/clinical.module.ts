import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@app/auth';
import { CitaController } from './controllers/cita.controller';
import { EstratificacionRiesgoController } from './controllers/estratificacion-riesgo.controller';
import { CitaService } from './services/cita.service';
import { EstratificacionRiesgoService } from './services/estratificacion-riesgo.service';
import { Cita } from './entities/cita.entity';
import { EstratificacionRiesgo } from './entities/estratificacion-riesgo.entity';
import { EnumsService } from './services/enums.service';
import { EnumsController } from './controllers/enums.controller';

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
        schema: cfg.get('SCHEMA_CLINICAL'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          poolMode: cfg.get('DB_POOL_MODE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Cita, EstratificacionRiesgo]), // listado de entidades
    AuthModule,
  ],
  controllers: [
    CitaController,
    EstratificacionRiesgoController,
    EnumsController,
  ],
  providers: [CitaService, EstratificacionRiesgoService, EnumsService],
})
export class ClinicalModule {
}

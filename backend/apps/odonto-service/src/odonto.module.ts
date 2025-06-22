import { Module } from '@nestjs/common';
import { ProgramaSaludOralService } from './services/programa-salud-oral.service';
import { FichaOdontologicaService } from './services/ficha-odontologica.service';
import { OdontogramaService } from './services/odontograma.service';
import { RadiografiaService } from './services/radiografia.service';
import { ProgramaSaludOralController } from './controllers/programa-salud-oral.controller';
import { FichaOdontologicaController } from './controllers/ficha-odontologica.controller';
import { OdontogramaController } from './controllers/odontograma.controller';
import { RadiografiaController } from './controllers/radiografia.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { ProgramaSaludOral } from './entities/programa-salud-oral.entity';
import { FichaOdontologica } from './entities/ficha-odontologica.entity';
import { Odontograma } from './entities/odontograma.entity';
import { Radiografia } from './entities/radiografia.entity';

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
        schema: cfg.get('SCHEMA_ODONTO'),
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
      ProgramaSaludOral,
      FichaOdontologica,
      Odontograma,
      Radiografia,
    ]),
    AuthModule,
  ],
  controllers: [
    ProgramaSaludOralController,
    FichaOdontologicaController,
    OdontogramaController,
    RadiografiaController,
  ],
  providers: [
    ProgramaSaludOralService,
    FichaOdontologicaService,
    OdontogramaService,
    RadiografiaService,
  ],
})
export class OdontoModule {
}

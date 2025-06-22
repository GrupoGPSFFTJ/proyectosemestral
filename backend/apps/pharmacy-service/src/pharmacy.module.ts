import { Module } from '@nestjs/common';
import { MedicamentoService } from './services/medicamento.service';
import { RecetaService } from './services/receta.service';
import { RecetaMedicamentoService } from './services/receta-medicamento.service';
import { DespachoMedicamentoService } from './services/despacho-medicamento.service';
import { MedicamentoController } from './controllers/medicamento.controller';
import { RecetaController } from './controllers/receta.controller';
import { RecetaMedicamentoController } from './controllers/receta-medicamento.controller';
import { DespachoMedicamentoController } from './controllers/despacho-medicamento.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { Medicamento } from './entities/medicamento.entity';
import { Receta } from './entities/receta.entity';
import { RecetaMedicamento } from './entities/receta-medicamento.entity';
import { DespachoMedicamento } from './entities/despacho-medicamento.entity';

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
        schema: cfg.get('SCHEMA_PHARMACY'),
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
      Medicamento,
      Receta,
      RecetaMedicamento,
      DespachoMedicamento,
    ]),
    AuthModule,
  ],
  controllers: [
    MedicamentoController,
    RecetaController,
    RecetaMedicamentoController,
    DespachoMedicamentoController,
  ],
  providers: [
    MedicamentoService,
    RecetaService,
    RecetaMedicamentoService,
    DespachoMedicamentoService,
  ],
})
export class PharmacyModule {}

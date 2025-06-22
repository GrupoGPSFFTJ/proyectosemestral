import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CentroSalud } from './entities/centro-salud.entity';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { UsuarioRol } from './entities/usuario-rol.entity';

import { CentroSaludService } from './services/centro-salud.service';
import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { UsuarioRolService } from './services/usuario-rol.service';

import { CentroSaludController } from './controllers/centro-salud.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { RolController } from './controllers/rol.controller';
import { UsuarioRolController } from './controllers/usuario-rol.controller';

import { AuthModule } from './auth/auth.module';
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
        schema: cfg.get('SCHEMA_CORE'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          poolMode: cfg.get('DB_POOL_MODE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CentroSalud, Usuario, Rol, UsuarioRol]),
    AuthModule,
  ],
  controllers: [
    CentroSaludController,
    UsuarioController,
    RolController,
    UsuarioRolController,
    EnumsController,
  ],
  providers: [
    CentroSaludService,
    UsuarioService,
    RolService,
    UsuarioRolService,
    EnumsService,
  ],
})
export class CoreModule {
}

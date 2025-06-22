import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule as SharedAuth } from '@app/auth';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';
import { XorUsernameEmailConstraint } from './validators/xor-validation.constraint';

@Module({
  imports: [ConfigModule, SharedAuth, TypeOrmModule.forFeature([Usuario])],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, XorUsernameEmailConstraint],
  exports: [],
})
export class AuthModule {
}

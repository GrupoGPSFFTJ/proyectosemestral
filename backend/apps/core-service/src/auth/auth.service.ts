import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '@proyecto-gps/core-service/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly users: UsuarioService,
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = { sub: user.id_usuario, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(dto: CreateUsuarioDto): Promise<Usuario> {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.repo.create({
      username: dto.username,
      password_hash: hash,
      nombre: dto.nombre,
      email: dto.email,
      estado: dto.estado,
      id_centro_salud: dto.id_centro_salud,
    });

    return this.repo.save(user);
  }

  private async validateUser(dto: LoginDto) {
    const identifier = dto.username ?? dto.email!;
    const user = dto.username
      ? await this.users.findByUser(dto.username)
      : await this.users.findByEmail(identifier);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const ok = await bcrypt.compare(dto.password, user.password_hash);
    if (!ok) throw new UnauthorizedException('Contraseña incorrecta');
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  username: string;
}

const jwtFromRequest: JwtFromRequestFunction =
  ExtractJwt.fromAuthHeaderAsBearerToken();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = 'RegistroClinicoElectronico';

    super({
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload) {
    return {
      id_usuario: payload.sub,
      username: payload.username,
    };
  }
}

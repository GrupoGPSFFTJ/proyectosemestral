import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { XorUsernameEmailConstraint } from '../validators/xor-validation.constraint';

export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @Validate(XorUsernameEmailConstraint)
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password: string;
}

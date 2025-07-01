import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LoginDto } from '../dto/login.dto';

@ValidatorConstraint({ name: 'XorUsernameEmail', async: false })
export class XorUsernameEmailConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments): boolean {
    const dto = args.object as LoginDto;
    const hasUser = Boolean(dto.username);
    const hasEmail = Boolean(dto.email);
    return (hasUser || hasEmail) && !(hasUser && hasEmail);
  }

  defaultMessage(): string {
    return 'Debes enviar *solo* username o *solo* email, nunca ambos ni ninguno.';
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusController } from './status.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/.env`],
    }),
  ],
  controllers: [StatusController],
})
export class ApiGatewayModule {}

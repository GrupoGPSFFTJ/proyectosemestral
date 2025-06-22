import { NestFactory } from '@nestjs/core';
import { PharmacyModule } from './pharmacy.module';

async function bootstrap() {
  const app = await NestFactory.create(PharmacyModule);

  const port = parseInt(process.env.PORT_PHARMACY || '3000', 10);

  app.enableCors({
    origin: true,
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();

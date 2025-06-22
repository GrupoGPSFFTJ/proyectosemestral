import { NestFactory } from '@nestjs/core';
import { VaccinationModule } from './vaccination.module';

async function bootstrap() {
  const app = await NestFactory.create(VaccinationModule);

  const port = parseInt(process.env.PORT_VACCINATION || '3000', 10);

  app.enableCors({
    origin: true,
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();

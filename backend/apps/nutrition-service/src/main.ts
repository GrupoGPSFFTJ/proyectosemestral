import { NestFactory } from '@nestjs/core';
import { NutritionModule } from './nutrition.module';

async function bootstrap() {
  const app = await NestFactory.create(NutritionModule);

  const port = parseInt(process.env.PORT_NUTRITION || '3000', 10);

  app.enableCors({
    origin: true,
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { OdontoModule } from '@proyecto-gps/odonto-service/odonto.module';

async function bootstrap() {
  const app = await NestFactory.create(OdontoModule);

  const port = parseInt(process.env.PORT_ODONTO || '3000', 10);

  app.enableCors({
    origin: true,
  });

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
}

bootstrap();

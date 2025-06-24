import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiGatewayModule } from './api-gateway.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ApiGatewayModule);

  app.use(
    '/core',
    createProxyMiddleware({
      target: process.env.URL_CORE_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/core': '' },
    }),
  );

  app.use(
    '/clinical',
    createProxyMiddleware({
      target: process.env.URL_CLINICAL_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/clinical': '' },
    }),
  );

  app.use(
    '/nutrition',
    createProxyMiddleware({
      target: process.env.URL_NUTRITION_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/nutrition': '' },
    }),
  );

  app.use(
    '/odonto',
    createProxyMiddleware({
      target: process.env.URL_ODONTO_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/odonto': '' },
    }),
  );

  app.use(
    '/patient',
    createProxyMiddleware({
      target: process.env.URL_PATIENT_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/patient': '' },
    }),
  );

  app.use(
    '/pharmacy',
    createProxyMiddleware({
      target: process.env.URL_PHARMACY_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/pharmacy': '' },
    }),
  );

  app.use(
    '/vaccination',
    createProxyMiddleware({
      target: process.env.URL_VACCINATION_SERVICE,
      changeOrigin: true,
      pathRewrite: { '^/vaccination': '' },
    }),
  );

  const portEnv = process.env.PORT_GATEWAY;
  const port = portEnv ? parseInt(portEnv, 10) : 3010;

  await app.listen(port);
  console.log(`🚀 Gateway escuchando en http://localhost:${port}`);
}

bootstrap();

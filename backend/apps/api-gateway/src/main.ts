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
      target: 'https://core-service-efio.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/core': '' },
    }),
  );

  app.use(
    '/clinical',
    createProxyMiddleware({
      target: 'https://clinical-service.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/clinical': '' },
    }),
  );

  app.use(
    '/nutrition',
    createProxyMiddleware({
      target: 'https://nutrition-service.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/nutrition': '' },
    }),
  );

  app.use(
    '/odonto',
    createProxyMiddleware({
      target: 'https://odonto-service.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/odonto': '' },
    }),
  );

  app.use(
    '/patient',
    createProxyMiddleware({
      target: 'https://patient-service-o26h.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/patient': '' },
    }),
  );

  app.use(
    '/pharmacy',
    createProxyMiddleware({
      target: 'https://pharmacy-service-x3d8.onrender.com/',
      changeOrigin: true,
      pathRewrite: { '^/pharmacy': '' },
    }),
  );

  app.use(
    '/vaccination',
    createProxyMiddleware({
      target: 'https://vaccination-service-jwpw.onrender.com/',
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

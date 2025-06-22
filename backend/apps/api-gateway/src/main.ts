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
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/core': '' },
    }),
  );

  app.use(
    '/clinical',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/clinical': '' },
    }),
  );

  app.use(
    '/nutrition',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: { '^/nutrition': '' },
    }),
  );

  app.use(
    '/odonto',
    createProxyMiddleware({
      target: 'http://localhost:3004',
      changeOrigin: true,
      pathRewrite: { '^/odonto': '' },
    }),
  );

  app.use(
    '/patient',
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: { '^/patient': '' },
    }),
  );

  app.use(
    '/pharmacy',
    createProxyMiddleware({
      target: 'http://localhost:3006',
      changeOrigin: true,
      pathRewrite: { '^/pharmacy': '' },
    }),
  );

  app.use(
    '/vaccination',
    createProxyMiddleware({
      target: 'http://localhost:3007',
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

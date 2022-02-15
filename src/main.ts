import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SuccessRequestInterceptor } from './shared/interceptors/success-request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      ignoreGlobalPrefix: false,
    },
  };

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalInterceptors(new SuccessRequestInterceptor());
  const config = new DocumentBuilder()
    .setTitle('ESUSU Confam Backend API')
    .setDescription('ESUSU Confam Backend API description')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();

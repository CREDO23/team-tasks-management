import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http.exeption';
import { WrapResponseDataInterceptor } from './common/interceptors/wrap-data.interceptor.ts/wrap-response-data.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WrapResponseDataInterceptor());

  //Swagger documentation

  const options = new DocumentBuilder()
    .setTitle('Taskible')
    .setDescription('Taskible API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

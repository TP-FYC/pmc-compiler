import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const config = new DocumentBuilder()
    .setTitle('PMC Compiler example')
    .setDescription('PMC Compiler API description')
    .setVersion('1.0')
    .addTag('PMC')
    .build();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004, '0.0.0.0');
  logger.log(`Application started on port 3004`);
}

bootstrap();

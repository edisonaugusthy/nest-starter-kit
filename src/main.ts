import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from '@app/shared/swagger/swagger';
const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerModule.setup('api', app, createDocument(app));
  const port = process.env.port || 3000;
  await app.listen(port);
  logger.log(`Application Started at : ${process.env.VIRTUAL_HOST}`);
  logger.log(`Swagger UI at : ${process.env.VIRTUAL_HOST}/api`);
  logger.log(`Conductor UI is running on: http://localhost:5001`);
  logger.log(`Application is running on: ${process.env.VIRTUAL_HOST}`);
}
bootstrap();

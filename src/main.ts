import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // aapke frontend ka origin
    methods: 'GET,POST,PUT,DELETE',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('User API') // API ka title
    .setDescription('API documentation for User management') // Description
    .setVersion('1.0') // Version
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger URL: http://localhost:3000/api-docs

  await app.listen(4000);
}
bootstrap();

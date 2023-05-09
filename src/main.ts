import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3000/',
      'https://localhost:3000',
      'https://localhost:3000/',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
      'https://events-app-front.vercel.app',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`Сервер стартовал на порту ${PORT}`),
  );
}
bootstrap();

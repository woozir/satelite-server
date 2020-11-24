import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SecTokenGuard } from './common/guards/sec-token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new SecTokenGuard());
  app.setGlobalPrefix('v0');
  await app.listen(3001);
}
bootstrap();

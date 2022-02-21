import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const port = 5050;
  const app = await NestFactory.create(AppModule);

  // Using express-session as a global middleware
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port);
  console.log(`Running on port ${port}`);
}
bootstrap();

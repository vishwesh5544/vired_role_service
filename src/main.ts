import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (open CORS)
  const corsOptions: CorsOptions = {
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  };

  app.enableCors(corsOptions);  // Enable CORS

  // Listen on all interfaces
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

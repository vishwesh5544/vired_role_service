import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/vired_role_service';
console.info('Attempting to connect to MongoDB:', mongoUri);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), 
      }),
    }),
    RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

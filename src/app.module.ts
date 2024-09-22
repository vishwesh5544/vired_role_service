import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';

@Module({
  imports: [RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

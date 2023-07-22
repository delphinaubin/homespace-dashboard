import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LightsModule } from '../lights/lights.module';

@Module({
  imports: [LightsModule],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LightsController } from './lights.controller';
import { LightGroupsService } from './light-groups.service';
import { HelvarnetApiModule } from '../helvarnet-api/helvarnet-api.module';

@Module({
  imports: [HelvarnetApiModule],
  controllers: [LightsController],
  providers: [LightGroupsService],
  exports: [],
})
export class LightsModule {}

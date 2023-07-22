import { Module } from '@nestjs/common';
import { HelvarnetConfig } from './helvarnet.config';
import { HelvarnetApiService } from './helvarnet-api.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HelvarnetConfig, HelvarnetApiService],
  exports: [HelvarnetApiService],
})
export class HelvarnetApiModule {}

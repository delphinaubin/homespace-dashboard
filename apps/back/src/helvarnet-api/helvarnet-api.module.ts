import { Module, OnModuleDestroy } from '@nestjs/common';
import { HelvarnetConfig } from './helvarnet.config';
import { HelvarnetApiService } from './helvarnet-api.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HelvarnetConfig, HelvarnetApiService],
  exports: [HelvarnetApiService],
})
export class HelvarnetApiModule implements OnModuleDestroy {
  constructor(private readonly helvarnetApi: HelvarnetApiService) {}

  async onModuleDestroy(): Promise<void> {
    await this.helvarnetApi.disconnect();
  }
}

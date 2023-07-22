import { Injectable } from '@nestjs/common';
import { RouterConfiguration } from '@homespace-dashboard/helvarnet';

@Injectable()
export class HelvarnetConfig {
  routerConfiguration(): RouterConfiguration {
    return {
      ipAddress: '192.168.1.11',
      port: 50000,
    };
  }
}

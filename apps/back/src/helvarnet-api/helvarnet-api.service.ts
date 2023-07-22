import { Injectable } from '@nestjs/common';
import { HelvarnetConfig } from './helvarnet.config';
import { HelvarNetApi } from '@homespace-dashboard/helvarnet';

@Injectable()
export class HelvarnetApiService {
  private readonly api: HelvarNetApi;
  private isConnected = false;
  constructor(helvarnetConfig: HelvarnetConfig) {
    this.api = new HelvarNetApi(helvarnetConfig.routerConfiguration());
  }

  async connect(): Promise<void> {
    await this.api.startConnexion();
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    await this.api.closeConnexion();
    this.isConnected = false;
  }

  async getApi(): Promise<
    Omit<HelvarNetApi, 'startConnexion' | 'closeConnexion'>
  > {
    if (!this.isConnected) {
      await this.connect();
    }
    return this.api;
  }
}

import {Socket} from 'net';
import {RouterConfiguration} from "./routerConfiguration";

type HelvarnetListener = (a: Buffer) => void;

export class HelvarControllerTcpServer {
  private readonly client: Socket;

  constructor(private readonly configuration: RouterConfiguration) {
    this.client = new Socket();
    this.client.setMaxListeners(100);
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      this.client.connect(
        this.configuration.port,
        this.configuration.ipAddress,
        () => {
          resolve();
        },
      );
    });
  }

  close(): void {
    this.client.destroy();
  }

  onReceiveControllerData(listener: HelvarnetListener): void {
    this.client.addListener('data', listener);
  }

  removeListener(listener: HelvarnetListener): void {
    this.client.removeListener('data', listener);
  }

  sendHelvarNetCommand(helvarNetCommand: string): void {
    this.client.write(helvarNetCommand);
  }
}

export abstract class HelvarNetCommand {

  static COMMAND_NUMBER: number;
  abstract toHelvarnetString(): string;
  isQuery = false;

  getCommandNumber(): number {
    return (this.constructor as unknown as { COMMAND_NUMBER: number})['COMMAND_NUMBER'];
  }
}

export abstract class HelvarNetQueryCommand<R> extends HelvarNetCommand {
  isQuery = true;

  abstract parseResponse(response: string): R;
}

export class Duration {
  _TYPE?: 'Duration';

  constructor(private readonly durationInMs: number) {}

  static fromCentiSeconds(durationInCentiSeconds: number): Duration {
    return new Duration(durationInCentiSeconds * 10);
  }

  static fromSeconds(durationInSeconds: number): Duration {
    return new Duration(durationInSeconds * 1000);
  }

  static fromMilliSeconds(durationInMilliSeconds: number): Duration {
    return new Duration(durationInMilliSeconds);
  }

  inSeconds(): number {
    return this.durationInMs / 1000;
  }

  inMilliSeconds(): number {
    return this.durationInMs;
  }

  inCentiSeconds(): number {
    return this.durationInMs / 10;
  }
}

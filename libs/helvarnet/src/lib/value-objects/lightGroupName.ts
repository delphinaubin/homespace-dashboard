export class LightGroupName {
  _TYPE?: 'LightGroupName';

  private constructor(readonly name: string) {}

  static of(name: string): LightGroupName {
    return new LightGroupName(name);
  }
}

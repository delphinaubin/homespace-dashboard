export class LightGroupNumber {
  _TYPE?: 'LightGroupNumber';
  private constructor(readonly groupNumber: number) {}

  static of(groupNumber: number): LightGroupNumber {
    return new LightGroupNumber(groupNumber);
  }

  isEqualTo(otherGroupNumber: LightGroupNumber): boolean {
    return this.groupNumber == otherGroupNumber.groupNumber;
  }
}

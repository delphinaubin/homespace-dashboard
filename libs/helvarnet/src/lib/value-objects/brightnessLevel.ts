export class BrightnessLevel {
  _TYPE?: 'BrightnessLevel';

  private constructor(readonly levelInPercent: number) {}

  static of(levelInPercent: number): BrightnessLevel {
    return new BrightnessLevel(levelInPercent);
  }

  static MIN = new BrightnessLevel(0);
  static MAX = new BrightnessLevel(100);
}

export class BrightnessProportion {
  _TYPE?: 'BrightnessProportion';

  private constructor(readonly proportionInPercent: number) {}

  static of(levelInPercent: number): BrightnessProportion {
    return new BrightnessProportion(levelInPercent);
  }
}

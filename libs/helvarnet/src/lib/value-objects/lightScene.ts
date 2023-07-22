export class LightScene {
  _TYPE?: 'Scene';

  private constructor(readonly sceneNumber: number, readonly blockNumber = 1) {}

  static of(sceneNumber: number, blockNumber = 1): LightScene {
    return new LightScene(sceneNumber, blockNumber);
  }

  static OFF = new LightScene(15);
  static ON = new LightScene(1);

  isEqualTo(otherScene: LightScene): boolean {
    return (
      this.blockNumber === otherScene.blockNumber &&
      this.sceneNumber === otherScene.sceneNumber
    );
  }
}

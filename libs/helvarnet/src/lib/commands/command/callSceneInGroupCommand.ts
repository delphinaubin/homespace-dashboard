import { LightScene } from '../../value-objects/lightScene';
import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { Duration } from '../../value-objects/duration';
import { HelvarNetCommand } from '../helvarNetCommand';

export class CallSceneInGroupCommand extends HelvarNetCommand {
  static isApplicableTo(
    command: HelvarNetCommand
  ): command is CallSceneInGroupCommand {
    return (
      command.getCommandNumber() === CallSceneInGroupCommand.COMMAND_NUMBER
    );
  }

  static COMMAND_NUMBER = 11;
  public scene: LightScene;
  public group: LightGroupNumber;
  public fadeTime = Duration.fromSeconds(0);

  constructor({
    scene,
    group,
    fadeTime,
  }: {
    scene: LightScene;
    group: LightGroupNumber;
    fadeTime?: Duration;
  }) {
    super();
    this.scene = scene;
    this.group = group;
    if (fadeTime !== undefined) {
      this.fadeTime = fadeTime;
    }
  }

  toHelvarnetString(): string {
    return `>V:2,C:${CallSceneInGroupCommand.COMMAND_NUMBER},G:${
      this.group.groupNumber
    },B:${this.scene.blockNumber},S:${
      this.scene.sceneNumber
    },F:${this.fadeTime.inCentiSeconds()}#`;
  }
}

export class CallSceneInGroupCommandBuilder {
  static aCallSceneInGroupCommand(): CallSceneInGroupCommandBuilder {
    return new CallSceneInGroupCommandBuilder();
  }

  private scene?: LightScene;
  private group?: LightGroupNumber;
  private fadeTime: Duration = Duration.fromSeconds(0);

  fromCommandParametersObject(
    commandParametersObject: Record<string, string>
  ): this {
    return this.withGroup(LightGroupNumber.of(+commandParametersObject.G))
      .withScene(LightScene.of(+commandParametersObject.S))
      .withFadeTime(Duration.fromCentiSeconds(+commandParametersObject.F));
  }

  withScene(scene: LightScene): this {
    this.scene = scene;
    return this;
  }

  withGroup(group: LightGroupNumber): this {
    this.group = group;
    return this;
  }

  withFadeTime(fadeTime: Duration): this {
    this.fadeTime = fadeTime;
    return this;
  }

  build(): CallSceneInGroupCommand {
    if (!this.scene) {
      throw new Error(
        'Cannot create a CallSceneInGroupCommand without giving a scene'
      );
    }
    if (!this.group) {
      throw new Error(
        'Cannot create a CallSceneInGroupCommand without giving a group'
      );
    }

    return new CallSceneInGroupCommand({
      scene: this.scene,
      group: this.group,
      fadeTime: this.fadeTime,
    });
  }
}

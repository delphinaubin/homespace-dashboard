import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { Duration } from '../../value-objects/duration';
import { BrightnessLevel } from '../../value-objects/brightnessLevel';
import { HelvarNetCommand } from '../helvarNetCommand';

export class CallDirectLevelInGroupCommand extends HelvarNetCommand {
  static COMMAND_NUMBER = 13;
  public level: BrightnessLevel;
  public group: LightGroupNumber;
  public fadeTime = Duration.fromSeconds(1);

  constructor({
    group,
    level,
    fadeTime,
  }: {
    group: LightGroupNumber;
    level: BrightnessLevel;
    fadeTime?: Duration;
  }) {
    super();
    this.level = level;
    this.group = group;
    if (fadeTime !== undefined) {
      this.fadeTime = fadeTime;
    }
  }

  toHelvarnetString() {
    return `>V:2,C:${CallDirectLevelInGroupCommand.COMMAND_NUMBER},G:${
      this.group.groupNumber
    },L:${this.level.levelInPercent},F:${this.fadeTime.inCentiSeconds()}#`;
  }
}

export class CallDirectLevelInGroupCommandBuilder {
  static aCallDirectLevelInGroupCommand(): CallDirectLevelInGroupCommandBuilder {
    return new CallDirectLevelInGroupCommandBuilder();
  }

  private level?: BrightnessLevel;
  private group?: LightGroupNumber;
  private fadeTime?: Duration;

  fromCommandParametersObject(
    commandParametersObject: Record<string, string>,
  ): this {
    return this.withGroup(LightGroupNumber.of(+commandParametersObject.G))
      .withLevel(BrightnessLevel.of(+commandParametersObject.L))
      .withFadeTime(Duration.fromCentiSeconds(+commandParametersObject.F));
  }

  withLevel(level: BrightnessLevel): this {
    this.level = level;
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

  build(): CallDirectLevelInGroupCommand {
    if (!this.level) {
      throw new Error(
        'Cannot create a CallDirectLevelInGroupCommand without giving a level',
      );
    }
    if (!this.group) {
      throw new Error(
        'Cannot create a CallDirectLevelInGroupCommand without giving a group',
      );
    }

    return new CallDirectLevelInGroupCommand({
      group: this.group,
      level: this.level,
      fadeTime: this.fadeTime,
    });
  }
}

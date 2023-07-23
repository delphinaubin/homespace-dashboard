import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { Duration } from '../../value-objects/duration';
import { BrightnessLevel } from '../../value-objects/brightnessLevel';
import { HelvarNetCommand } from '../helvarNetCommand';
import { BrightnessProportion } from '../../value-objects/brightnessProportion';

export class CallDirectProportionInGroupCommand extends HelvarNetCommand {
  static isApplicableTo(
    command: HelvarNetCommand
  ): command is CallDirectProportionInGroupCommand {
    return (
      command.getCommandNumber() ===
      CallDirectProportionInGroupCommand.COMMAND_NUMBER
    );
  }

  static COMMAND_NUMBER = 15;
  public proportion: BrightnessProportion;
  public group: LightGroupNumber;
  public fadeTime = Duration.fromSeconds(0);

  constructor({
    group,
    proportion,
    fadeTime,
  }: {
    group: LightGroupNumber;
    proportion: BrightnessProportion;
    fadeTime?: Duration;
  }) {
    super();
    this.proportion = proportion;
    this.group = group;
    if (fadeTime !== undefined) {
      this.fadeTime = fadeTime;
    }
  }

  toHelvarnetString() {
    return `>V:2,C:${CallDirectProportionInGroupCommand.COMMAND_NUMBER},P:${
      this.proportion.proportionInPercent
    },G:${this.group.groupNumber},F:${this.fadeTime.inCentiSeconds()}#`;
  }
}

export class CallDirectProportionInGroupCommandBuilder {
  static aCallDirectProportionInGroupCommand(): CallDirectProportionInGroupCommandBuilder {
    return new CallDirectProportionInGroupCommandBuilder();
  }

  private proportion?: BrightnessProportion;
  private group?: LightGroupNumber;
  private fadeTime?: Duration;

  fromCommandParametersObject(
    commandParametersObject: Record<string, string>
  ): this {
    return this.withGroup(LightGroupNumber.of(+commandParametersObject.G))
      .withProportion(BrightnessProportion.of(+commandParametersObject.P))
      .withFadeTime(Duration.fromCentiSeconds(+commandParametersObject.F));
  }

  withProportion(level: BrightnessProportion): this {
    this.proportion = level;
    return this;
  }

  withLevel(level: BrightnessLevel): this {
    this.proportion = BrightnessProportion.of(-100 + level.levelInPercent);
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

  build(): CallDirectProportionInGroupCommand {
    if (!this.proportion) {
      throw new Error(
        'Cannot create a CallDirectProportionInGroupCommand without giving a level'
      );
    }
    if (!this.group) {
      throw new Error(
        'Cannot create a CallDirectProportionInGroupCommand without giving a group'
      );
    }

    return new CallDirectProportionInGroupCommand({
      group: this.group,
      proportion: this.proportion,
      fadeTime: this.fadeTime,
    });
  }
}

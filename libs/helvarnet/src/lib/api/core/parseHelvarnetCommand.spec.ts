import { CallSceneInGroupCommandBuilder } from '../../commands/command/callSceneInGroupCommand';
import { LightScene } from '../../value-objects/lightScene';
import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { Duration } from '../../value-objects/duration';
import { parseHelvarnetCommand } from './parseHelvarnetCommand';
import { CallDirectLevelInGroupCommandBuilder } from '../../commands/command/callDirectLevelInGroupCommand';
import { BrightnessLevel } from '../../value-objects/brightnessLevel';
import { CallDirectProportionInGroupCommandBuilder } from '../../commands/command/callDirectProportionInGroupCommand';
import { BrightnessProportion } from '../../value-objects/brightnessProportion';

describe('command parsing', () => {
  it('parses a CallSceneInGroupCommand ', () => {
    const command = CallSceneInGroupCommandBuilder.aCallSceneInGroupCommand()
      .withScene(LightScene.ON)
      .withGroup(LightGroupNumber.of(10))
      .withFadeTime(Duration.fromSeconds(2))
      .build();
    const result = parseHelvarnetCommand(command.toHelvarnetString());
    expect(result).toStrictEqual(command);
  });

  it('parses a CallDirectLevelInGroupCommand ', () => {
    const command =
      CallDirectLevelInGroupCommandBuilder.aCallDirectLevelInGroupCommand()
        .withGroup(LightGroupNumber.of(10))
        .withLevel(BrightnessLevel.of(12))
        .withFadeTime(Duration.fromSeconds(2))
        .build();
    const result = parseHelvarnetCommand(command.toHelvarnetString());
    expect(result).toStrictEqual(command);
  });

  it('parses a CallDirectProportionInGroupCommand', () => {
    const command =
      CallDirectProportionInGroupCommandBuilder.aCallDirectProportionInGroupCommand()
        .withGroup(LightGroupNumber.of(10))
        .withProportion(BrightnessProportion.of(43))
        .withFadeTime(Duration.fromSeconds(2))
        .build();
    const result = parseHelvarnetCommand(command.toHelvarnetString());
    expect(result).toStrictEqual(command);
  });

  it('returns null if the command is unknown', () => {
    const result = parseHelvarnetCommand('>V:2,C:404,G:12,F42#');
    expect(result).toBeNull();
  });

  it('returns null if the given string is not a command (here a query response)', () => {
    const result = parseHelvarnetCommand('?V:2,C:109,G:2=12#');
    expect(result).toBeNull();
  });
});

import { helvarnetCommandToObject } from './helvarnetCommandToObject';
import {
  CallSceneInGroupCommand,
  CallSceneInGroupCommandBuilder,
} from '../../commands/command/callSceneInGroupCommand';
import { HelvarNetCommand } from '../../commands/helvarNetCommand';
import {
  CallDirectLevelInGroupCommand,
  CallDirectLevelInGroupCommandBuilder,
} from '../../commands/command/callDirectLevelInGroupCommand';
import {
  CallDirectProportionInGroupCommand,
  CallDirectProportionInGroupCommandBuilder,
} from '../../commands/command/callDirectProportionInGroupCommand';

export function parseHelvarnetCommand(
  helvarnetCommand: string,
): HelvarNetCommand | null {
  const commandParametersObject = helvarnetCommandToObject(helvarnetCommand);

  if (commandParametersObject === null) {
    return null;
  }

  switch (+commandParametersObject.C) {
    case CallSceneInGroupCommand.COMMAND_NUMBER: {
      return CallSceneInGroupCommandBuilder.aCallSceneInGroupCommand()
        .fromCommandParametersObject(commandParametersObject)
        .build();
    }
    case CallDirectLevelInGroupCommand.COMMAND_NUMBER: {
      return CallDirectLevelInGroupCommandBuilder.aCallDirectLevelInGroupCommand()
        .fromCommandParametersObject(commandParametersObject)
        .build();
    }
    case CallDirectProportionInGroupCommand.COMMAND_NUMBER: {
      return CallDirectProportionInGroupCommandBuilder.aCallDirectProportionInGroupCommand()
        .fromCommandParametersObject(commandParametersObject)
        .build();
    }

    default: {
      return null;
    }
  }
}

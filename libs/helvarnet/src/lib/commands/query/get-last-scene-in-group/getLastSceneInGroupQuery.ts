import {
  HelvarNetCommand,
  HelvarNetQueryCommand,
} from '../../helvarNetCommand';
import { LightGroupNumber, LightScene } from '../../../value-objects';

export class GetLastSceneInGroupQuery extends HelvarNetQueryCommand<{
  lastScene: LightScene;
}> {
  _TYPE?: 'GetLastSceneInGroupQuery';

  static isApplicableTo(
    command: HelvarNetCommand
  ): command is GetLastSceneInGroupQuery {
    return (
      command.getCommandNumber() === GetLastSceneInGroupQuery.COMMAND_NUMBER
    );
  }

  static COMMAND_NUMBER = 109;
  public group: LightGroupNumber;

  constructor({ group }: { group: LightGroupNumber }) {
    super();
    this.group = group;
  }

  toHelvarnetString(): string {
    return `>V:2,C:${GetLastSceneInGroupQuery.COMMAND_NUMBER},G:${this.group.groupNumber}#`;
  }

  parseResponse(response: string): { lastScene: LightScene } {
    const commandRegExp = new RegExp(
      `\\?V:2,C:${GetLastSceneInGroupQuery.COMMAND_NUMBER},G:${this.group.groupNumber}=(\\d+)#`
    );
    const match = response.match(commandRegExp);

    if (match === null) {
      throw new Error(
        `The given response is not about this getLastSceneInGroup command : ${response}`
      );
    }
    return { lastScene: LightScene.of(+match[1]) };
  }
}

export class GetLastSceneInGroupQueryBuilder {
  static aGetLastSceneInGroupQuery(): GetLastSceneInGroupQueryBuilder {
    return new GetLastSceneInGroupQueryBuilder();
  }

  private group?: LightGroupNumber;

  withGroup(group: LightGroupNumber): this {
    this.group = group;
    return this;
  }

  build(): GetLastSceneInGroupQuery {
    if (!this.group) {
      throw new Error(
        'Cannot create a GetLastSceneInGroupCommand without giving a group'
      );
    }
    return new GetLastSceneInGroupQuery({
      group: this.group,
    });
  }
}

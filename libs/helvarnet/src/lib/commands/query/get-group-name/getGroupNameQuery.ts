import { HelvarNetCommand } from '../../helvarNetCommand';
import { LightGroupNumber } from '../../../value-objects/lightGroupNumber';

interface GetGroupNameQueryConstructorParams {
  group: LightGroupNumber;
}

export class GetGroupNameQuery extends HelvarNetCommand {
  _TYPE?: 'GetGroupNameQuery';

  static COMMAND_NUMBER = 105;
  public group: LightGroupNumber;

  constructor({ group }: GetGroupNameQueryConstructorParams) {
    super();
    this.group = group;
  }

  toHelvarnetString(): string {
    return `>V:2,C:${GetGroupNameQuery.COMMAND_NUMBER},G:${this.group.groupNumber}#`;
  }
}

export class GetGroupNameQueryBuilder {
  static aGetGroupNameQuery(): GetGroupNameQueryBuilder {
    return new GetGroupNameQueryBuilder();
  }

  private group?: LightGroupNumber;

  withGroup(group: LightGroupNumber): this {
    this.group = group;
    return this;
  }

  build(): GetGroupNameQuery {
    if (this.group === undefined) {
      throw new Error(
        'Cannot build a GetGroupNameQuery without giving a group',
      );
    }

    return new GetGroupNameQuery({
      group: this.group,
    });
  }
}

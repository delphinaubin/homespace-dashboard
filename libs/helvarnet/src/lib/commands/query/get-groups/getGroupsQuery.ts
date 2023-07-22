import { HelvarNetCommand } from '../../helvarNetCommand';

export class GetGroupsQuery extends HelvarNetCommand {
  _TYPE?: 'GetGroupsQuery';

  static COMMAND_NUMBER = 165;

  constructor() {
    super();
  }

  toHelvarnetString(): string {
    return `>V:2,C:${GetGroupsQuery.COMMAND_NUMBER}#`;
  }
}

export class GetGroupsQueryBuilder {
  static aGetGroupQuery(): GetGroupsQueryBuilder {
    return new GetGroupsQueryBuilder();
  }

  build(): GetGroupsQuery {
    return new GetGroupsQuery();
  }
}

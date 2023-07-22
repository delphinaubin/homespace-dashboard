import { HelvarnetQueryResponse } from '../helvarnetQueryResponse';
import { GetGroupsQuery } from './getGroupsQuery';
import { LightGroupNumber } from '../../../value-objects/lightGroupNumber';

interface GetGroupsResponseConstructorParams {
  responseTo: GetGroupsQuery;
  groups: LightGroupNumber[];
}

export class GetGroupsResponse implements HelvarnetQueryResponse {
  responseTo: GetGroupsQuery;
  groups: LightGroupNumber[];

  constructor({ responseTo, groups }: GetGroupsResponseConstructorParams) {
    this.responseTo = responseTo;
    this.groups = groups;
  }
}

export class GetGroupsResponseBuilder {
  private groups?: LightGroupNumber[];
  private getGroupsQuery?: GetGroupsQuery;
  static aGetGroupsResponse(): GetGroupsResponseBuilder {
    return new GetGroupsResponseBuilder();
  }

  withGroups(groups: LightGroupNumber[]): this {
    this.groups = groups;
    return this;
  }

  witchRespondTo(getGroupsQuery: GetGroupsQuery): this {
    this.getGroupsQuery = getGroupsQuery;
    return this;
  }

  build(): GetGroupsResponse {
    if (this.groups === undefined) {
      throw new Error('Cannot build a GetGroupsResponse without giving groups');
    }

    if (this.getGroupsQuery === undefined) {
      throw new Error(
        'Cannot build a GetGroupsResponse without giving a getGroupsQuery',
      );
    }
    return new GetGroupsResponse({
      responseTo: this.getGroupsQuery,
      groups: this.groups,
    });
  }
}

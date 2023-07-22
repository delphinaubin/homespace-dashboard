import { LightGroupName } from '../../../value-objects/lightGroupName';
import { GetGroupNameQuery } from './getGroupNameQuery';
import { HelvarnetQueryResponse } from '../helvarnetQueryResponse';

interface GetGroupNameResponseConstructorParams {
  groupName: LightGroupName;
  respondTo: GetGroupNameQuery;
}

export class GetGroupNameResponse implements HelvarnetQueryResponse {
  groupName: LightGroupName;
  responseTo: GetGroupNameQuery;

  constructor({ groupName, respondTo }: GetGroupNameResponseConstructorParams) {
    this.groupName = groupName;
    this.responseTo = respondTo;
  }
}

export class GetGroupNameResponseBuilder {
  private groupName?: LightGroupName;
  private respondTo?: GetGroupNameQuery;

  static aGetGroupNameResponse(): GetGroupNameResponseBuilder {
    return new GetGroupNameResponseBuilder();
  }

  withGroupName(groupName: LightGroupName): this {
    this.groupName = groupName;
    return this;
  }

  witchRespondTo(respondTo: GetGroupNameQuery): this {
    this.respondTo = respondTo;
    return this;
  }

  build(): GetGroupNameResponse {
    if (this.groupName === undefined) {
      throw new Error(
        'Cannot build a GetGroupNameResponse without giving a groupName',
      );
    }
    if (this.respondTo === undefined) {
      throw new Error(
        'Cannot build a GetGroupNameResponse without giving a respondTo',
      );
    }

    return new GetGroupNameResponse({
      groupName: this.groupName,
      respondTo: this.respondTo,
    });
  }
}

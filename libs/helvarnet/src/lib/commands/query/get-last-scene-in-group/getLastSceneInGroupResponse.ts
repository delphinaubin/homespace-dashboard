import { LightScene } from '../../../value-objects/lightScene';
import { GetLastSceneInGroupQuery } from './getLastSceneInGroupQuery';
import { HelvarnetQueryResponse } from '../helvarnetQueryResponse';

interface GetLastSceneInGroupResponseConstructorParams {
  lastScene: LightScene;
  responseTo: GetLastSceneInGroupQuery;
}

export class GetLastSceneInGroupResponse implements HelvarnetQueryResponse {
  lastScene: LightScene;
  responseTo: GetLastSceneInGroupQuery;

  constructor({
    lastScene,
    responseTo,
  }: GetLastSceneInGroupResponseConstructorParams) {
    this.lastScene = lastScene;
    this.responseTo = responseTo;
  }
}

export class GetLastSceneInGroupResponseBuilder {
  private lastScene?: LightScene;
  private respondTo?: GetLastSceneInGroupQuery;

  static aGetLastSceneInGroupResponse(): GetLastSceneInGroupResponseBuilder {
    return new GetLastSceneInGroupResponseBuilder();
  }

  withLastScene(lastScene: LightScene): this {
    this.lastScene = lastScene;
    return this;
  }

  witchRespondTo(getLastSceneInGroupCommand: GetLastSceneInGroupQuery): this {
    this.respondTo = getLastSceneInGroupCommand;
    return this;
  }

  build(): GetLastSceneInGroupResponse {
    if (this.lastScene === undefined) {
      throw new Error(
        'Cannot build a GetLastSceneInGroupResponse without giving a lastScene',
      );
    }
    if (this.respondTo === undefined) {
      throw new Error(
        'Cannot build a GetLastSceneInGroupResponse without giving a responseTo command',
      );
    }
    return new GetLastSceneInGroupResponse({
      lastScene: this.lastScene,
      responseTo: this.respondTo,
    });
  }
}

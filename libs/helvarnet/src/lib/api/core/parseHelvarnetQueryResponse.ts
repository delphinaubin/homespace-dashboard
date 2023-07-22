import { helvarnetQueryResponseToObject } from './helvarnetQueryResponseToObject';
import {
  GetLastSceneInGroupQuery,
  GetLastSceneInGroupQueryBuilder,
} from '../../commands/query/get-last-scene-in-group/getLastSceneInGroupQuery';
import { GetLastSceneInGroupResponseBuilder } from '../../commands/query/get-last-scene-in-group/getLastSceneInGroupResponse';
import { LightScene } from '../../value-objects/lightScene';
import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { HelvarnetQueryResponse } from '../../commands/query/helvarnetQueryResponse';
import { GetGroupNameResponseBuilder } from '../../commands/query/get-group-name/getGroupNameResponse';
import {
  GetGroupNameQuery,
  GetGroupNameQueryBuilder,
} from '../../commands/query/get-group-name/getGroupNameQuery';
import { LightGroupName } from '../../value-objects/lightGroupName';
import {
  GetGroupsQuery,
  GetGroupsQueryBuilder,
} from '../../commands/query/get-groups/getGroupsQuery';
import { GetGroupsResponseBuilder } from '../../commands/query/get-groups/getGroupsResponse';

export function parseHelvarnetQueryResponse(
  helvarnetString: string,
): HelvarnetQueryResponse | null {
  const queryResponseObject = helvarnetQueryResponseToObject(helvarnetString);
  if (queryResponseObject === null) {
    return null;
  }

  switch (+queryResponseObject.queryObject.C) {
    case GetLastSceneInGroupQuery.COMMAND_NUMBER: {
      return GetLastSceneInGroupResponseBuilder.aGetLastSceneInGroupResponse()
        .withLastScene(LightScene.of(+queryResponseObject.response))
        .witchRespondTo(
          GetLastSceneInGroupQueryBuilder.aGetLastSceneInGroupQuery()
            .withGroup(LightGroupNumber.of(+queryResponseObject.queryObject.G))
            .build(),
        )
        .build();
    }
    case GetGroupNameQuery.COMMAND_NUMBER: {
      return GetGroupNameResponseBuilder.aGetGroupNameResponse()
        .withGroupName(LightGroupName.of(queryResponseObject.response))
        .witchRespondTo(
          GetGroupNameQueryBuilder.aGetGroupNameQuery()
            .withGroup(LightGroupNumber.of(+queryResponseObject.queryObject.G))
            .build(),
        )
        .build();
    }
    case GetGroupsQuery.COMMAND_NUMBER: {
      return GetGroupsResponseBuilder.aGetGroupsResponse()
        .withGroups(
          queryResponseObject.response
            .split(',')
            .map((g) => LightGroupNumber.of(+g)),
        )
        .witchRespondTo(GetGroupsQueryBuilder.aGetGroupQuery().build())
        .build();
    }
    default: {
      return null;
    }
  }
}

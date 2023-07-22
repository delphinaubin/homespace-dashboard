import { parseHelvarnetQueryResponse } from './parseHelvarnetQueryResponse';
import { GetLastSceneInGroupResponse } from '../../commands/query/get-last-scene-in-group/getLastSceneInGroupResponse';
import { LightScene } from '../../value-objects/lightScene';
import { GetLastSceneInGroupQuery } from '../../commands/query/get-last-scene-in-group/getLastSceneInGroupQuery';
import { LightGroupNumber } from '../../value-objects/lightGroupNumber';
import { GetGroupNameResponse } from '../../commands/query/get-group-name/getGroupNameResponse';
import { GetGroupNameQuery } from '../../commands/query/get-group-name/getGroupNameQuery';
import { LightGroupName } from '../../value-objects/lightGroupName';
import { GetGroupsResponse } from '../../commands/query/get-groups/getGroupsResponse';
import { GetGroupsQuery } from '../../commands/query/get-groups/getGroupsQuery';

describe('parseHelvarnetQueryResponse', () => {
  it('returns null if the helvarnet string is not about a query response (here a command)', () => {
    const helvarnetString = '>V:2,C:11,G:10,B:1,S:1,F:200#';
    const result = parseHelvarnetQueryResponse(helvarnetString);
    expect(result).toBeNull();
  });

  it('returns a getLastSceneInGroupResponse', () => {
    const helvarnetString = '?V:2,C:109,G:4=12#';
    const result = parseHelvarnetQueryResponse(helvarnetString);
    expect(result).toStrictEqual(
      new GetLastSceneInGroupResponse({
        lastScene: LightScene.of(12),
        responseTo: new GetLastSceneInGroupQuery({
          group: LightGroupNumber.of(4),
        }),
      }),
    );
  });

  it('returns a getGroupNameResponse', () => {
    const helvarnetString = '?V:2,C:105,G:5=Group 5#';
    const result = parseHelvarnetQueryResponse(helvarnetString);
    expect(result).toStrictEqual(
      new GetGroupNameResponse({
        groupName: LightGroupName.of('Group 5'),
        respondTo: new GetGroupNameQuery({
          group: LightGroupNumber.of(5),
        }),
      }),
    );
  });

  it('returns a getGroupsResponse', () => {
    const helvarnetString = '?V:2,C:165=1,2,8,12,100#';
    const result = parseHelvarnetQueryResponse(helvarnetString);
    expect(result).toStrictEqual(
      new GetGroupsResponse({
        groups: [
          LightGroupNumber.of(1),
          LightGroupNumber.of(2),
          LightGroupNumber.of(8),
          LightGroupNumber.of(12),
          LightGroupNumber.of(100),
        ],
        responseTo: new GetGroupsQuery(),
      }),
    );
  });
});

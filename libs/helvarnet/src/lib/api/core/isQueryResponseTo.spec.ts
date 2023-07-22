import { isQueryResponseTo } from './isQueryResponseTo';
import { GetGroupsQueryBuilder } from '../../commands/query/get-groups/getGroupsQuery';
import { GetLastSceneInGroupQueryBuilder } from '../../commands/query/get-last-scene-in-group/getLastSceneInGroupQuery';
import { LightGroupNumber } from '../../value-objects/lightGroupNumber';

describe('isQueryResponseTo', () => {
  it('returns false if the given helvarnet string is not a query response', () => {
    const helvarnetString = '>V:2,C:11,G:10,B:1,S:1,F:200#';
    expect(
      isQueryResponseTo(
        helvarnetString,
        GetGroupsQueryBuilder.aGetGroupQuery().build(),
      ),
    ).toBe(false);
  });

  it('returns true if the given helvarnet string is a response to the query with given helvarnet command number', () => {
    const helvarnetString = '?V:2,C:165=1,2#';
    expect(
      isQueryResponseTo(
        helvarnetString,
        GetGroupsQueryBuilder.aGetGroupQuery().build(),
      ),
    ).toBe(true);
  });

  it('returns false if the given helvarnet string is a query response but not about the given query number', () => {
    const helvarnetString = '?V:2,C:165=1,2#';
    expect(
      isQueryResponseTo(
        helvarnetString,
        GetLastSceneInGroupQueryBuilder.aGetLastSceneInGroupQuery()
          .withGroup(LightGroupNumber.of(12))
          .build(),
      ),
    ).toBe(false);
  });

  it('returns false if the given helvarnet string is a query response about the given query number but not with the same params', () => {
    const helvarnetString = '?V:2,C:109,G:14=15#';
    expect(
      isQueryResponseTo(
        helvarnetString,
        GetLastSceneInGroupQueryBuilder.aGetLastSceneInGroupQuery()
          .withGroup(LightGroupNumber.of(12))
          .build(),
      ),
    ).toBe(false);
  });
});

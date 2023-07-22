import { GetLastSceneInGroupQuery } from './getLastSceneInGroupQuery';
import { LightGroupNumber } from '../../../value-objects/lightGroupNumber';
import { LightScene } from '../../../value-objects/lightScene';

describe('parseResponse', () => {
  it('returns the scene in the command', () => {
    const command = new GetLastSceneInGroupQuery({
      group: LightGroupNumber.of(2),
    });
    const scene12Response = '?V:2,C:109,G:2=12#';
    const result = command.parseResponse(scene12Response);

    expect(result.lastScene).toStrictEqual(LightScene.of(12));
  });

  it('throws an exception if the response is not about this command', () => {
    const command = new GetLastSceneInGroupQuery({
      group: LightGroupNumber.of(2),
    });
    const aResponseNotAboutThisCommand = '?V:2,C:42,G:2=12#';

    expect(() =>
      command.parseResponse(aResponseNotAboutThisCommand),
    ).toThrowError(
      'The given response is not about this getLastSceneInGroup command',
    );
  });

  it('throws an exception if the response is about this command but not about the asked group', () => {
    const command = new GetLastSceneInGroupQuery({
      group: LightGroupNumber.of(2),
    });
    const aResponseNotAboutThisCommand = '?V:2,C:109,G:5=12#';

    expect(() =>
      command.parseResponse(aResponseNotAboutThisCommand),
    ).toThrowError(
      'The given response is not about this getLastSceneInGroup command',
    );
  });
});

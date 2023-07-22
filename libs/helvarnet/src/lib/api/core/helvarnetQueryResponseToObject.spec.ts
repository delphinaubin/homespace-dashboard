import { helvarnetQueryResponseToObject } from './helvarnetQueryResponseToObject';

describe('helvarnetQueryResponseToObject', () => {
  it('returns null if the payload doesnt match to a query response', () => {
    const aCommandPayload = '>V:2,C:11,G:10,B:1,S:1,F:200#';
    expect(helvarnetQueryResponseToObject(aCommandPayload)).toBeNull();
  });

  it('returns the parameters in the query response', () => {
    const aQueryResponseHelvarnetString = '?V:2,C:109,G:4=12#';
    const result = helvarnetQueryResponseToObject(
      aQueryResponseHelvarnetString,
    );
    expect(result).toEqual({
      response: '12',
      queryObject: {
        V: '2',
        C: '109',
        G: '4',
      },
    });
  });
});

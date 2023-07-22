import { helvarnetCommandToObject } from './helvarnetCommandToObject';

describe('helvarnetCommandToObject', () => {
  it('Command parameters to an object', () => {
    const aCommand = '>V:2,C:11,G:10,B:1,S:1,F:200#';
    expect(helvarnetCommandToObject(aCommand)).toEqual({
      V: '2',
      C: '11',
      G: '10',
      B: '1',
      S: '1',
      F: '200',
    });
  });

  it('throws a syntax error if the string doesnt fit the command syntax', () => {
    const badSyntax = 'V:2,C:11,G:10,B:1,S:1,F:200#';
    const result = helvarnetCommandToObject(badSyntax);
    expect(result).toBeNull();
  });
});

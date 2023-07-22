import {HelvarNetCommand} from '../../commands/helvarNetCommand';
import {parseHelvarnetQueryResponse} from './parseHelvarnetQueryResponse';

export function isQueryResponseTo(
  helvarnetString: string,
  query: HelvarNetCommand,
): boolean {
  const queryResponse = parseHelvarnetQueryResponse(helvarnetString);

  if (queryResponse === null) {
    return false;
  }
  return (
    queryResponse.responseTo.toHelvarnetString() === query.toHelvarnetString()
  );
}

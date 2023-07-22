export function helvarnetQueryResponseToObject(helvarnetString: string): {
  response: string;
  queryObject: Record<string, string>;
} | null {
  const queryResponseRegexp = /^\?(.*)=(.*)#$/;
  const match = queryResponseRegexp.exec(helvarnetString);
  if (match === null) {
    return null;
  }

  const [, queryHelvarnetString, responseHelvarnetString] = match;

  const queryObject = Object.fromEntries(
    queryHelvarnetString.split(',').map((queryItem) => queryItem.split(':')),
  );
  return { response: responseHelvarnetString, queryObject };
}

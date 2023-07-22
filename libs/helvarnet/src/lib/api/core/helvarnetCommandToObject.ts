export function helvarnetCommandToObject(
  helvarnetCommand: string,
): Record<string, string> | null {
  const [, commandContent] = helvarnetCommand.match(/^>(.*)#$/) || [];
  if (!commandContent) {
    return null;
  }
  return Object.fromEntries(
    commandContent.split(',').map((commandItem) => commandItem.split(':')),
  );
}

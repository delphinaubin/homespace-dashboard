import { HelvarNetCommand } from './helvarNetCommand';

test('getCommandNumber', () => {
  class TestableHelvarNetCommand extends HelvarNetCommand {
    static COMMAND_NUMBER = 65;

    toHelvarnetString(): string {
      return '';
    }
  }

  const testableCommand = new TestableHelvarNetCommand();
  expect(testableCommand.getCommandNumber()).toEqual(65);
});

import {
  HelvarControllerTcpServer,

} from './helvarControllerTcpServer';
import { isQueryResponseTo } from './core/isQueryResponseTo';
import { parseHelvarnetQueryResponse } from './core/parseHelvarnetQueryResponse';
import { parseHelvarnetCommand } from './core/parseHelvarnetCommand';
import EventEmitter from 'events';
import { Buffer } from 'buffer';
import {
  GetGroupNameQuery,
  GetGroupNameResponse,
  GetGroupsQuery,
  GetGroupsResponse,
  GetLastSceneInGroupQuery,
  GetLastSceneInGroupResponse,
  HelvarNetCommand,
  HelvarnetQueryResponse,
} from '../commands';
import {RouterConfiguration} from "./routerConfiguration";

export enum HelvarnetApiEvents {
  COMMAND_RECEIVED = 'COMMAND_RECEIVED',
}

const DEFAULT_MAX_ALLOWED_LISTENER = 100;

export class HelvarNetApi {
  private readonly helvarControllerTcpServer: HelvarControllerTcpServer;
  public readonly controllerCommandsEventEmitter = new EventEmitter();

  constructor(routerConfiguration: RouterConfiguration) {
    this.controllerCommandsEventEmitter.setMaxListeners(
      DEFAULT_MAX_ALLOWED_LISTENER
    );
    this.helvarControllerTcpServer = new HelvarControllerTcpServer(
      routerConfiguration
    );
  }

  async startConnexion(): Promise<void> {
    await this.helvarControllerTcpServer.start();
    this.helvarControllerTcpServer.onReceiveControllerData((data: Buffer) => {
      const helvarnetCommand = parseHelvarnetCommand(data.toString());
      if (helvarnetCommand !== null) {
        this.controllerCommandsEventEmitter.emit(
          HelvarnetApiEvents.COMMAND_RECEIVED,
          helvarnetCommand
        );
      }
    });
  }

  closeConnexion(): void {
    this.helvarControllerTcpServer.close();
    this.controllerCommandsEventEmitter.removeAllListeners();
  }

  sendCommand(command: HelvarNetCommand): Promise<void> {
    const commandHelvarnetString = command.toHelvarnetString();
    return new Promise((resolve) => {
      const listener = (commandBuffer: Buffer) => {
        if (commandBuffer.toString() === commandHelvarnetString) {
          resolve();
        }
        this.helvarControllerTcpServer.removeListener(listener);
      };
      this.helvarControllerTcpServer.onReceiveControllerData(listener);
      this.helvarControllerTcpServer.sendHelvarNetCommand(
        commandHelvarnetString
      );
    });
  }

  /**
   * Be careful to not send too much query in parallel it can cause message lost and unresolved promises
   */
  sendQueryAndGetResponse(
    query: GetLastSceneInGroupQuery
  ): Promise<GetLastSceneInGroupResponse>;

  sendQueryAndGetResponse(query: GetGroupsQuery): Promise<GetGroupsResponse>;
  sendQueryAndGetResponse(
    query: GetGroupNameQuery
  ): Promise<GetGroupNameResponse>;

  sendQueryAndGetResponse(
    query: HelvarNetCommand
  ): Promise<HelvarnetQueryResponse> {
    const queryHelvarnetString = query.toHelvarnetString();

    return new Promise((resolve, reject) => {
      const listener = (commandBuffer: Buffer) => {
        const receivedCommandString = commandBuffer.toString();
        if (isQueryResponseTo(receivedCommandString, query)) {
          this.helvarControllerTcpServer.removeListener(listener);
          const parsedResponse = parseHelvarnetQueryResponse(
            receivedCommandString
          );
          if (parsedResponse !== null) {
            resolve(parsedResponse);
          } else {
            reject(
              `An error happened while parsing the router response cannot parse ${receivedCommandString}`
            );
          }
        }
      };
      this.helvarControllerTcpServer.onReceiveControllerData(listener);
      this.helvarControllerTcpServer.sendHelvarNetCommand(queryHelvarnetString);
    });
  }
}

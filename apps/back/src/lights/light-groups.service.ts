import {
  CallSceneInGroupCommand,
  GetLastSceneInGroupQueryBuilder,
  HelvarnetApiEvents,
  HelvarNetCommand,
  LightGroupNumber,
  LightScene,
} from '@homespace-dashboard/helvarnet';
import { Injectable, Logger } from '@nestjs/common';
import { HelvarnetApiService } from '../helvarnet-api/helvarnet-api.service';
import { Observable, Subject } from 'rxjs';

interface GroupState {
  group: LightGroupNumber;
  state: 'ON' | 'OFF';
}

@Injectable()
export class LightGroupsService {
  constructor(private readonly helvarnetApi: HelvarnetApiService) {}

  lightEvents = new Subject<GroupState>();
  private isLightEventStreamInitialized = false;
  private readonly logger = new Logger(LightGroupsService.name);

  async getGroupsStates(
    lightGroups: readonly LightGroupNumber[]
  ): Promise<GroupState[]> {
    const api = await this.helvarnetApi.getApi();

    const result: GroupState[] = [];
    for (const lightGroup of lightGroups) {
      const response = await api.sendQueryAndGetResponse(
        GetLastSceneInGroupQueryBuilder.aGetLastSceneInGroupQuery()
          .withGroup(lightGroup)
          .build()
      );
      result.push({
        group: lightGroup,
        state: response.lastScene.isEqualTo(LightScene.OFF) ? 'OFF' : 'ON',
      });
    }
    return result;
  }

  getLightEvents(): Observable<GroupState> {
    if (!this.isLightEventStreamInitialized) {
      this.isLightEventStreamInitialized = true;
      this.initLightEventStream().then(() => {
        this.logger.log('Helvar light events initialized');
      });
    }

    return this.lightEvents;
  }

  private async initLightEventStream(): Promise<void> {
    const api = await this.helvarnetApi.getApi();
    api.controllerCommandsEventEmitter.addListener(
      HelvarnetApiEvents.COMMAND_RECEIVED,
      (command: HelvarNetCommand) => {
        if (CallSceneInGroupCommand.isApplicableTo(command)) {
          this.lightEvents.next({
            group: command.group,
            state: command.scene.isEqualTo(LightScene.OFF) ? 'OFF' : 'ON',
          });
        }
      }
    );
  }
}

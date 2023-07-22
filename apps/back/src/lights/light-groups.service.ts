import {
  GetLastSceneInGroupQueryBuilder,
  LightGroupNumber,
  LightScene,
} from '@homespace-dashboard/helvarnet';
import { Injectable } from '@nestjs/common';
import { HelvarnetApiService } from '../helvarnet-api/helvarnet-api.service';

interface GroupState {
  group: LightGroupNumber;
  state: 'ON' | 'OFF';
}

@Injectable()
export class LightGroupsService {
  constructor(private readonly helvarnetApi: HelvarnetApiService) {}

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
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  MessageEvent,
  Sse,
} from '@nestjs/common';
import { LightGroupNumber } from '@homespace-dashboard/helvarnet';
import { GroupsByName } from '../config/house-groups.config';
import { LightGroupsService } from './light-groups.service';
import { filter, map, Observable, of } from 'rxjs';

const GROUPS_WE_WANT_TO_FOLLOW: readonly LightGroupNumber[] = [
  GroupsByName.hall,
  GroupsByName.office,
  GroupsByName.groundFloorBathroom,
  GroupsByName.groundFloorToilets,
  GroupsByName.livingRoom,
  GroupsByName.garage,
] as const;

interface GroupStatesResponse {
  groups: { number: number; state: 'ON' | 'OFF' }[];
}

interface LightMessageEvent extends MessageEvent {
  data: {
    group: number;
    state: 'ON' | 'OFF';
  };
}

@Controller('/lights')
export class LightsController {
  constructor(private readonly lightGroupsService: LightGroupsService) {}

  @Get('/groups')
  @HttpCode(HttpStatus.OK)
  async geAllGroupsStates(): Promise<GroupStatesResponse> {
    const groupsStates = await this.lightGroupsService.getGroupsStates(
      GROUPS_WE_WANT_TO_FOLLOW
    );

    return {
      groups: groupsStates.map((g) => ({
        number: g.group.groupNumber,
        state: g.state,
      })),
    };
  }

  @Sse('events')
  getLightsEvents(): Observable<LightMessageEvent> {
    return this.lightGroupsService.getLightEvents().pipe(
      filter((lightEvent) =>
        GROUPS_WE_WANT_TO_FOLLOW.some((groupNumber) =>
          lightEvent.group.isEqualTo(groupNumber)
        )
      ),
      map((lightEvent) => ({
        data: {
          group: lightEvent.group.groupNumber,
          state: lightEvent.state,
        },
      }))
    );
  }
}

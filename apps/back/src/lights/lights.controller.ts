import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LightGroupNumber } from '@homespace-dashboard/helvarnet';
import { GroupsByName } from '../config/house-groups.config';
import { LightGroupsService } from './light-groups.service';

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
}

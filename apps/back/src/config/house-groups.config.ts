import { LightGroupNumber } from '@homespace-dashboard/helvarnet';

export type ConfigurationRoomName =
  | 'tvRoom'
  | 'miloBedroom'
  | 'parentsBedroom'
  | 'dressing'
  | 'guestsBedroom'
  | 'stairs'
  | 'backKitchen'
  | 'office'
  | 'kitchen'
  | 'diningRoom'
  | 'groundFloorBathroom'
  | 'firstFloorBathroom'
  | 'groundFloorToilets'
  | 'hall'
  | 'bar'
  | 'miloBedroomSconces'
  | 'garden'
  | 'garage'
  | 'livingRoom';

export const GroupsByName: Record<ConfigurationRoomName, LightGroupNumber> = {
  tvRoom: LightGroupNumber.of(2),
  miloBedroom: LightGroupNumber.of(3),
  parentsBedroom: LightGroupNumber.of(4),
  dressing: LightGroupNumber.of(5),
  guestsBedroom: LightGroupNumber.of(6),
  stairs: LightGroupNumber.of(7),
  backKitchen: LightGroupNumber.of(8),
  office: LightGroupNumber.of(9),
  kitchen: LightGroupNumber.of(10),
  diningRoom: LightGroupNumber.of(11),
  groundFloorBathroom: LightGroupNumber.of(12),
  firstFloorBathroom: LightGroupNumber.of(13),
  groundFloorToilets: LightGroupNumber.of(14),
  hall: LightGroupNumber.of(15),
  bar: LightGroupNumber.of(16),
  miloBedroomSconces: LightGroupNumber.of(18),
  garden: LightGroupNumber.of(19),
  garage: LightGroupNumber.of(20),
  livingRoom: LightGroupNumber.of(100),
};

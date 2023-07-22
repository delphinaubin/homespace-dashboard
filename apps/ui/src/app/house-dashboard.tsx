import styles from './house-dashboard.module.css';
import {Room} from "./room.type";

const roomToImageUrl: Record<Room, string> = {
  [Room.LIVING_ROOM]: 'Salon.png',
  [Room.HALL]: 'Hall.png',
  [Room.BATHROOM]: 'SDB.png',
  [Room.REST_ROOM]: 'WC.png',
  [Room.BACK_KITCHEN]: 'AR-Cuisine.png',
  [Room.OFFICE]: 'Bureau.png',
  [Room.GARAGE]: 'Garage.png',
  [Room.LIVING_ROOM_TOURTERAUX]: 'sejour-tourteraux.png'
};

type HouseDashboardProps = {
  lightedRooms: Room[];
};

export const HouseDashboard = (props: HouseDashboardProps) => {
  const roomImages = props.lightedRooms.map((room) => (
    <img key={room} src={`/house/${roomToImageUrl[room]}`} />
  ));

  return (
    <div className={styles.container}>
      <img src="/house/OFF.png" />
      {roomImages}
    </div>
  );
};

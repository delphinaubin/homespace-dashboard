import { HouseDashboard } from './house-dashboard';
import { Room } from './room.type';
import { useState } from 'react';
import styles from './app.module.css';

export function App() {
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);

  const selectRoom = (room: Room) => () => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== room));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  return (
    <div>
      <div className={styles.menu}>
        <button onClick={selectRoom(Room.OFFICE)}>Bureau</button>
        <button onClick={selectRoom(Room.REST_ROOM)}>WC</button>
        <button onClick={selectRoom(Room.GARAGE)}>Garage</button>
        <button onClick={selectRoom(Room.HALL)}>Hall</button>
        <button onClick={selectRoom(Room.BATHROOM)}>SDB</button>
        <button onClick={selectRoom(Room.LIVING_ROOM)}>Séjour</button>
        <button onClick={selectRoom(Room.LIVING_ROOM_TOURTERAUX)}>Séjour Tourteraux</button>
        <button onClick={selectRoom(Room.BACK_KITCHEN)}>Arrière cuisine</button>
      </div>
      <HouseDashboard lightedRooms={selectedRooms} />
    </div>
  );
}

export default App;

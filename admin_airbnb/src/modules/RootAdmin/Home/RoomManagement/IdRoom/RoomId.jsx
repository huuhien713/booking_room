import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import roomAPI from '../../../../../services/RoomAPI';

const RoomId = () => {
    const { id } = useParams();
    
    const [room, setRoom] = useState(null);
    console.log(room)
    useEffect(() => {
        ( async () => {
            try {
                const room = await roomAPI.getRoomById(id);
                setRoom(room);
            } catch (error) {
                console.log(room);
            }
        })()
    },[])
  return (
    <div>RoomId</div>
  );
};

export default RoomId;
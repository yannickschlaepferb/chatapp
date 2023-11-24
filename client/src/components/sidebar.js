import React, { useState } from 'react';
import CreateRoomForm from './CreateRoomForm';

const Sidebar = () => {
  const [createdRoomId, setCreatedRoomId] = useState(null);

  const handleRoomCreated = (roomId) => {
    setCreatedRoomId(roomId);
    // Add any additional logic based on your application's requirements
  };

  return (
    <div>
      <CreateRoomForm onRoomCreated={handleRoomCreated} />
      {createdRoomId && (
        <p>New room created with ID: {createdRoomId}</p>
      )}
      {/* Other sidebar content... */}
    </div>
  );
};

export default Sidebar;

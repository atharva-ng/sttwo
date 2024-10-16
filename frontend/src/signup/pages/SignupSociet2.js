import React, { useState } from "react";

const SignupSociety2 = () => {
  const numWings = parseInt(sessionStorage.getItem('wingNumber')) || 1;
  const [roomsPerFloor, setRoomsPerFloor] = useState(null);

  const handleRoomsPerFloorChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setRoomsPerFloor(value);
    } else {
      setRoomsPerFloor(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomsPerFloor">
            Rooms per Floor
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roomsPerFloor"
            type="number"
            value={roomsPerFloor}
            onChange={handleRoomsPerFloorChange}
            placeholder="Enter rooms per floor"
            min="1"
          />
        </div>

        {[...Array(numWings)].map((_, wingIndex) => (
          <div key={wingIndex} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Details for Wing {wingIndex + 1}:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`wingName${wingIndex}`}>
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`wingName${wingIndex}`}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`wingFloors${wingIndex}`}>
                  Floors
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`wingFloors${wingIndex}`}
                  type="number"
                  placeholder="Floors"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rooms/Floor: {roomsPerFloor}
                </label>
              </div>
            </div>

            <h4 className="text-md font-semibold mt-4 mb-2">Room Information (1st residential floor):</h4>
            <div className="space-y-6">
              {roomsPerFloor != null && roomsPerFloor > 0 && [...Array(roomsPerFloor)].map((_, roomIndex) => (
                <div key={roomIndex} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <h5 className="text-lg font-medium mb-3">Room {roomIndex + 1}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`roomNumber${wingIndex}-${roomIndex}`}>
                        Room Number
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`roomNumber${wingIndex}-${roomIndex}`}
                        type="text"
                        placeholder={`Room Number ${roomIndex + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`roomSize${wingIndex}-${roomIndex}`}>
                        Room Size
                      </label>
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        id={`roomSize${wingIndex}-${roomIndex}`}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`maintenanceAmount${wingIndex}-${roomIndex}`}>
                        Maintenance Amount
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`maintenanceAmount${wingIndex}-${roomIndex}`}
                        type="number"
                        placeholder="Maintenance Amount"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignupSociety2;
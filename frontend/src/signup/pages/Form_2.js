import React, { useState } from "react";

const Form_2 = ({ step, formData, setStep, setFormData, roomSizes }) => {
  const numWings = parseInt(formData.societyInformation.numberOfWings) || 1; // Ensure it's an integer

  const handleRoomsChange = (wingIndex, roomsPerFloor) => {
    const updatedWings = formData.wingInformation.map((wing, index) => {
      if (index === wingIndex) {
        const roomDetails = Array.from({ length: roomsPerFloor }, (_, roomIndex) => ({
          roomIndex: roomIndex + 1,
          roomNumber: '',
          roomSize: '',
          maintenanceAmount: '',
          maintenanceHeadAmount: {
            landTax: '',
            waterTax: '',
            parkingCharges: ''
          }
        }));

        return {
          ...wing,
          wingRoomsPerFloor: roomsPerFloor,
          wingRoomDetails: roomDetails
        };
      }
      return wing;
    });

    setFormData(prevState => ({
      ...prevState,
      wingInformation: updatedWings
    }));
  };

  // Function to handle changes to wing information
  const handleWingInputChange = (wingIndex, field, value) => {
    const updatedWings = formData.wingInformation.map((wing, index) => {
      if (index === wingIndex) {
        return {
          ...wing,
          [field]: value
        };
      }
      return wing;
    });

    setFormData(prevState => ({
      ...prevState,
      wingInformation: updatedWings
    }));
  };

  // Function to handle changes to room information
  const handleRoomInputChange = (wingIndex, roomIndex, field, value) => {
    const updatedWings = formData.wingInformation.map((wing, wIndex) => {
      if (wIndex === wingIndex) {
        const updatedRooms = wing.wingRoomDetails.map((room, rIndex) => {
          if (rIndex === roomIndex) {
            return {
              ...room,
              [field]: value
            };
          }
          return room;
        });

        return {
          ...wing,
          wingRoomDetails: updatedRooms
        };
      }
      return wing;
    });

    setFormData(prevState => ({
      ...prevState,
      wingInformation: updatedWings
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" px-8 pt-6 pb-8 mb-4">
        {[...Array(numWings)].map((_, wingIndex) => (
          <div key={wingIndex} className="mb-6 shadow-md rounded px-4 py-4" style={{backgroundColor:"#F0EFEF"}}>
            <h3 className="text-lg font-semibold mb-2 text-customBlue">Details for Wing {wingIndex + 1}:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4  ">
              <div>
                <label className="block  text-sm font-bold mb-2 text-customGray " htmlFor={`wingName${wingIndex}`}>
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`wingName${wingIndex}`}
                  type="text"
                  placeholder="Name"
                  value={formData.wingInformation[wingIndex]?.wingName || ''}
                  onChange={(e) => handleWingInputChange(wingIndex, 'wingName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2  text-customGray" htmlFor={`wingFloors${wingIndex}`}>
                  Floors
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`wingFloors${wingIndex}`}
                  value={formData.wingInformation[wingIndex]?.wingFloors || ''}
                  onChange={(e) => handleWingInputChange(wingIndex, 'wingFloors', e.target.value)}
                  type="number"
                  placeholder="Floors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-customGray" htmlFor="roomsPerFloor">
                  Rooms per Floor
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="roomsPerFloor"
                  type="number"
                  onChange={(e) => handleRoomsChange(wingIndex, parseInt(e.target.value))}
                  value={formData.wingInformation[wingIndex]?.wingRoomsPerFloor || ''}
                  placeholder="Enter rooms per floor"
                  min="1"
                />
              </div>
            </div>

            <h4 className="text-md font-semibold mt-4 mb-2 text-customGray">Room Information (1st residential floor):</h4>
            <div className="space-y-6">
              {formData.wingInformation[wingIndex]?.wingRoomDetails?.map((_, roomIndex) => (
                <div key={roomIndex} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <h5 className="text-lg font-medium mb-3 text-customGray">Room {roomIndex + 1}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-customGray" htmlFor={`roomNumber${wingIndex}-${roomIndex}`}>
                        Room Number
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`roomNumber${wingIndex}-${roomIndex}`}
                        value={formData.wingInformation[wingIndex]?.wingRoomDetails[roomIndex]?.roomNumber || ''}
                        onChange={(e) => handleRoomInputChange(wingIndex, roomIndex, 'roomNumber', e.target.value)}
                        type="text"
                        placeholder={`Room Number ${roomIndex + 1}`}
                      />
                    </div>
                    <div>
  <label
    className="block text-sm font-bold mb-2 text-customGray"
    htmlFor={`roomSize${wingIndex}-${roomIndex}`}
  >
    Room Size
  </label>
  <select
    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    id={`roomSize${wingIndex}-${roomIndex}`}
    value={formData.wingInformation[wingIndex]?.wingRoomDetails[roomIndex]?.roomSize || ''}
    onChange={(e) => handleRoomInputChange(wingIndex, roomIndex, 'roomSize', e.target.value)}
  >
    <option value="">Select Size</option>
    {roomSizes.map((room) => (
      <option key={room.id} value={room.size}>
        {room.size}
      </option>
    ))}
  </select>
</div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-customGray" htmlFor={`maintenanceAmount${wingIndex}-${roomIndex}`}>
                        Maintenance Amount
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`maintenanceAmount${wingIndex}-${roomIndex}`}
                        type="number"
                        placeholder="Maintenance Amount"
                        value={formData.wingInformation[wingIndex]?.wingRoomDetails[roomIndex]?.maintenanceAmount || ''}
                        onChange={(e) => handleRoomInputChange(wingIndex, roomIndex, 'maintenanceAmount', e.target.value)}
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

export default Form_2;

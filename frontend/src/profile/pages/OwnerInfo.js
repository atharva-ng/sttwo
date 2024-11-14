import React, { useEffect, useState } from 'react';

const OwnerInfo = ({formData, setFormData}) => {
    const [isTable, setIsTable] = useState(true);

  const toggleState = () => {
    setIsTable(!isTable);
  };
  const [roomData, setRoomData] = useState([]);

  // Fetch the data (assuming you have an API to fetch)
  useEffect(() => {

    setRoomData(formData);
  }, []);

  // Function to group rooms by wingName
  const groupByWing = (data) => {
    return data.reduce((acc, room) => {
      const wing = room.wingName;
      if (!acc[wing]) acc[wing] = [];
      acc[wing].push(room);
      return acc;
    }, {});
  };

  const groupedRooms = groupByWing(roomData);


  return (
    <div className="container mx-auto p-4">
        {/* <input type="checkbox" value="" className="" /> */}
        {/* <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600">
        </div> */}
        <div className='flex items-center justify-end pr-2'>
        
      <button
        onClick={toggleState}
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          isTable ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${
            isTable ? 'translate-x-6' : ''
          }`}
        />
      </button>
      <span className="ml-2 text-sm">
        {isTable ? 'Table View' : 'List View'}
      </span>
      </div>
    
    {
    isTable ?
    Object.keys(groupedRooms).map((wing, index) => (
        <div key={wing} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 px-2 text-gray-700">{wing}</h2>
          <table className="table-auto w-full text-left text-sm rtl:text-right text-gray-500">
            <thead className='text-sm text-gray-700 uppercase bg-gray-100 '>
              <tr>
                <th className="border px-4 py-4">Sr. No.</th>
                <th className="border px-4 py-4">Room Number</th>
                <th className="border px-4 py-4">Tenant Name</th>
                <th className="border px-4 py-4">Room Size</th>
              </tr>
            </thead>
            <tbody>
              {groupedRooms[wing].map((room, idx) => (
                <tr key={room.roomno} className='bg-white border-b  hover:bg-gray-50'>
                  <td className="border px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{idx + 1}</td>
                  <td className="border px-4 py-2">{room.roomno}</td>
                  <td className="border px-4 py-2">
                    {room.firstname} {room.lastname}
                  </td>
                  <td className="border px-4 py-2">{room.roomsize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))

      :

      Object.keys(groupedRooms).map((wing) => (
        <div key={wing} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{wing}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedRooms[wing].map((room) => (
              <div
                key={room.roomno}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-bold mb-2">
                  Room No: {room.roomno}
                </h3>
                <p className="text-gray-700 mb-1"><b>Size:</b> {room.roomsize}</p>
                <p className="text-gray-700">
                  <b>Tenant:</b> {room.firstname} {room.lastname}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))


    }
  
      
    </div>
  );
};

export default OwnerInfo;

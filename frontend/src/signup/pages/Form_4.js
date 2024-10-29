import React from "react";

const Form_4 = ({ step, formData, setStep, setFormData, maintenanceHeads, handleSubmitForm, roomSizes }) => {

  const handleInputChange = (wingIndex, headId, roomSize, value) => {
    const updatedWings = [...formData.wingInformation];

    // Update the specific head amount for all rooms with the same roomSize
    updatedWings[wingIndex].roomDetails.forEach((room) => {
      if (room.roomSize === roomSize) {
        room.maintenanceHeadAmount[headId] = value;
      }
    });

    // Set the updated formData
    setFormData({
      ...formData,
      wingInformation: updatedWings,
    });
  };

  const handleRegister = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
    alert("Form data saved successfully!");
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  // Filter the maintenance heads to include only those that were selected in the previous step
  const selectedMaintenanceHeads = formData.maintenanceHeads; // Assuming the selected heads are stored in formData.maintenanceHeads

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="space-y-6 my-10">
        {formData.wingInformation.map((wing, wingIndex) => {
          // Get unique room sizes for the current wing
          const uniqueRoomSizes = [...new Set(wing.roomDetails.map((room) => room.roomSize))];

          return (
            <div key={wingIndex} className="space-y-4 bg-gray-100 shadow-md rounded px-4 py-4">
              <h3 className="text-lg font-semibold text-customBlue">Maintenance Input for {wing.name}:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-b">
                    <th className="border p-2 text-left">Sr No</th>
                    <th className="border p-2 text-left">Heads</th>
                    {uniqueRoomSizes.map((sizeId, index) => {
                      // Find the room size object for the current sizeId
                      const roomSizeObject = roomSizes.find((roomSize) => roomSize.id === Number(sizeId));
                      return (
                        <th key={index} className="border p-2 text-left">
                          Size: {roomSizeObject?.size || "Unknown"} {/* Display the size or 'Unknown' if not found */}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {selectedMaintenanceHeads.map((selectedHead, headIndex) => {
                    // Find the corresponding maintenance head object from the maintenanceHeads array
                    
                    const head = maintenanceHeads.find((mh) => (mh.id) === (selectedHead));
                    

                    // Safeguard in case head is not found
                    if (!head) {
                      return null; // Skip if head is not found
                    }

                    return (
                      <tr key={head.id}>
                        <td className="border p-2">{headIndex + 1}</td>  {/* Display the index for Sr No */}
                        <td className="border p-2">{head.heads}</td>  {/* Display the maintenance head name */}

                        {uniqueRoomSizes.map((size, index) => (
                          <td key={index} className="border p-2">
                            <input
                              type="number"
                              className="w-full p-1 border rounded"
                              // Display the value from the first room with this size
                              value={
                                wing.roomDetails.find((room) => room.roomSize === size)
                                  ?.maintenanceHeadAmount[head.id] || ''
                              }
                              onChange={(e) =>
                                handleInputChange(wingIndex, head.id, size, e.target.value)
                              }
                              required
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <div className="button-row flex justify-between">
        <button
          type="button"
          className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="submit"
          className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Form_4;

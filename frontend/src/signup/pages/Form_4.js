import React from "react";

const Form_4 = ({ step, formData, setStep, setFormData, maintenanceHeads, handleSubmitForm }) => {

  

  const handleInputChange = (wingIndex, head, roomSize, value) => {
    const updatedWings = [...formData.wingInformation];

    // Update the specific head amount for all rooms with the same roomSize
    updatedWings[wingIndex].wingRoomDetails.forEach((room) => {
      if (room.roomSize === roomSize) {
        room.maintenanceHeadAmount[head] = value;
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

  return (
    <form onSubmit={handleSubmitForm}>
    <div className="space-y-6 my-10">
      {formData.wingInformation.map((wing, wingIndex) => {
        // Get unique room sizes for the current wing
        const uniqueRoomSizes = [...new Set(wing.wingRoomDetails.map((room) => room.roomSize))];

        return (
          <div key={wingIndex} className="space-y-4 bg-gray-100 shadow-md rounded px-4 py-4">
            <h3 className="text-lg font-semibold text-customBlue">Maintenance Input for {wing.name}:</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-b">
                  <th className="border p-2 text-left">Sr No</th>
                  <th className="border p-2 text-left">Heads</th>
                  {uniqueRoomSizes.map((size, index) => (
                    <th key={index} className="border p-2 text-left">Size: {size}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.maintenanceHeads.map((head, headIndex) => (
                  <tr key={head}>
                    <td className="border p-2">{headIndex + 1}</td>
                    <td className="border p-2">{head}</td>
                    {uniqueRoomSizes.map((size, index) => (
                      <td key={index} className="border p-2">
                        <input
                          type="number"
                          className="w-full p-1 border rounded"
                          // Display the value from the first room with this size
                          value={
                            wing.wingRoomDetails.find((room) => room.roomSize === size)
                              ?.maintenanceHeadAmount[head] || ''
                          }
                          onChange={(e) =>
                            handleInputChange(wingIndex, head, size, e.target.value)
                          }
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>

    <div className={`button-row flex justify-between`}>
    <button className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handlePrevious}>Previous</button>
    <button type="submit" className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
    
    </div>
    </form>
  );
};

export default Form_4;
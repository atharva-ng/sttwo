import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';

const Form_3 = ({ step, formData, setStep, setFormData, maintenanceHeads }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (path) => (e) => {
    const keys = path.split('.');
    const updatedFormData = { ...formData };
    let nestedObject = updatedFormData;

    // Navigate to the nested field
    for (let i = 0; i < keys.length - 1; i++) {
      nestedObject = nestedObject[keys[i]];
    }

    // Update the final property
    nestedObject[keys[keys.length - 1]] = e.target.value;

    setFormData(updatedFormData);
  };

  // Logic to remove a maintenance head
  const handleRemoveHead = (headToRemove) => {
    const updatedFormData = { ...formData };

    // Remove the head from the formData's maintenanceHeads array
    updatedFormData.maintenanceHeads = updatedFormData.maintenanceHeads.filter(
      (head) => head !== headToRemove
    );

    // // Remove the head from each room's maintenanceHeadAmount
    // Object.keys(updatedFormData.wingInformation).forEach((wingKey) => {
    //   const wing = updatedFormData.wingInformation[wingKey];
    //   Object.keys(wing.wingRoomDetails).forEach((roomKey) => {
    //     const room = wing.wingRoomDetails[roomKey];
    //     delete room.maintenanceHeadAmount[headToRemove]; // Remove the head from the room
    //   });
    // });

    setFormData(updatedFormData); // Update the form data
  };

  const handleNext3 = (e) => {
    e.preventDefault(); // Prevent form submission
  
    if (formData.maintenanceHeads.length === 0) {
      alert("Please select at least one Maintenance Head before proceeding.");
    } else {
      const updatedFormData = { ...formData };

      // Iterate through all wings and rooms to add the new head.
      Object.keys(updatedFormData.wingInformation).forEach((wingKey) => {
        const wing = updatedFormData.wingInformation[wingKey];
        Object.keys(wing.wingRoomDetails).forEach((roomKey) => {
          const room = wing.wingRoomDetails[roomKey];

          // Add maintenance heads if not already present
          formData.maintenanceHeads.forEach((head) => {
            if (!room.maintenanceHeadAmount[head]) {
              room.maintenanceHeadAmount[head] = '';
            }
          });
        });
      });

      // Update the formData with the new structure.
      setFormData(updatedFormData);

      // Proceed to the next step
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleMaintenanceHeadChange = (selectedHead) => {
    // If the selected head is not already included, add it to the formData.
    if (selectedHead && !formData.maintenanceHeads.includes(selectedHead)) {
      const updatedFormData = { ...formData };
      updatedFormData.maintenanceHeads.push(selectedHead);
      setFormData(updatedFormData);
    }
    setIsDropdownOpen(false);
  };

  return (
    <form onSubmit={handleNext3}>
      <div className="space-y-4 py-2 my-5 mb-20">
        <div className="relative">
          <label htmlFor="maintenanceHead" className="block mb-2 text-sm font-medium text-gray-700">
            Select Maintenance Head
          </label>
          <div
            className="w-full p-2 border rounded-md bg-white shadow-sm cursor-pointer flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700">
              {formData.maintenanceHeads && formData.maintenanceHeads.length > 0
                ? formData.maintenanceHeads[formData.maintenanceHeads.length - 1]
                : 'Select'}
            </span>
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {maintenanceHeads.length === 0 ? (
                <div className="p-2 text-gray-500">No Maintenance Head Available</div>
              ) : (
                maintenanceHeads.map((head) => (
                  <div
                    key={head}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleMaintenanceHeadChange(head)}
                  >
                    {head}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {formData.maintenanceHeads && formData.maintenanceHeads.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Selected Maintenance Heads:</h3>
            <ul className="list-disc pl-5">
              {formData.maintenanceHeads.map((head) => (
                <li key={head} className="flex justify-between items-center">
                  <span>{head}</span>
                  <button
                    type="button"
                    className="crossButton ml-2 text-red-500 hover:text-red-700 p-1 rounded-full border border-red-500 hover:border-red-700"
                    onClick={() => handleRemoveHead(head)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          Next
        </button>
      </div>
    </form>
  );
};

export default Form_3;

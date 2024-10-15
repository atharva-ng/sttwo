import React, { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

const Form_3 = ({step, formData, setStep, setFormData}) => {
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

  const maintenanceHeadOptions = ['Land Tax', 'Water Tax', 'Parking Charges'];

  const handleMaintenanceHeadChange = (selectedHead) => {
    if (selectedHead && !formData.maintenanceHeads.includes(selectedHead)) {
      setFormData(prevData => ({
        ...prevData,
        maintenanceHeads: [...prevData.maintenanceHeads, selectedHead]
      }));
    }
    setIsDropdownOpen(false);
  };

    return (
        <div className="space-y-4 py-2 my-5">
      <div className="relative">
        <label htmlFor="maintenanceHead" className="block mb-2 text-sm font-medium text-gray-700">
          Select Maintenance Head
        </label>
        <div
          className="w-full p-2 border rounded-md bg-white shadow-sm cursor-pointer flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* <span className="text-gray-700">
            {formData.maintenanceHeads.length > 0 ? formData.maintenanceHeads[formData.maintenanceHeads.length - 1] : 'Select'}
          </span> */}
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {maintenanceHeadOptions.map((head) => (
              <div
                key={head}
                className={`p-2 hover:bg-blue-100 cursor-pointer ${
                  head === 'Water Tax' ? 'bg-blue-50' : ''
                }`}
                // onClick={() => handleMaintenanceHeadChange(head)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {head}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {formData.maintenanceHeads.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Selected Maintenance Heads:</h3>
          <ul className="list-disc pl-5">
            {formData.maintenanceHeads.map((head) => (
              <li key={head}>{head}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>

    )

};

export default Form_3;
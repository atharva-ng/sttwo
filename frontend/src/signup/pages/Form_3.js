import React, { useState, useEffect, useContext } from "react";
import { ChevronDown } from 'lucide-react';

// import { AuthContext } from "../../shared/context/auth-context";
import { AuthContext } from "../../shared/context/auth-context.js";

const Form_3 = ({ step, formData, setStep, setFormData, maintenanceHeads }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useContext(AuthContext);

  const API_URL = 'http://3.109.108.99:5007/api/register';

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json',
        // },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notices');
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotices();
    } else {
      console.log("No token");
      fetchNotices();
    }
  }, []);

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

  const handleMaintenanceHeadChange = (selectedHead) => {
    if (selectedHead && !formData.maintenanceHeads.includes(selectedHead)) {
      setFormData((prevData) => ({
        ...prevData,
        maintenanceHeads: [...prevData.maintenanceHeads, selectedHead],
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
          <span className="text-gray-700">
            {formData.maintenanceHeads && formData.maintenanceHeads.length > 0
              ? formData.maintenanceHeads[formData.maintenanceHeads.length - 1]
              : 'Select'}
          </span>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {maintenanceHeads.map((head) => (
              <div
                key={head}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleMaintenanceHeadChange(head)}
              >
                {head}
              </div>
            ))}
          </div>
        )}
      </div>
      {formData.maintenanceHeads && formData.maintenanceHeads.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Selected Maintenance Heads:</h3>
          <ul className="list-disc pl-5">
            {formData.maintenanceHeads.map((head) => (
              <li key={head}>{head}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Form_3;

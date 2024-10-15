import React, { useState, useEffect } from "react";


const Form_4 = ({step, formData, setStep, setFormData}) => {
    
  const apartmentTypes = ['1 BHK (250 sqft)', '1 BHK (300 sqft)', '2 BHK (350 sqft)'];

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

  const handleMaintenanceAmountChange = (wingIndex, head, apartmentType, value) => {
    setFormData(prevData => ({
      ...prevData,
      maintenanceAmounts: {
        ...prevData.maintenanceAmounts,
        [prevData.wings[wingIndex].name]: {
          ...prevData.maintenanceAmounts[prevData.wings[wingIndex].name],
          [head]: {
            ...prevData.maintenanceAmounts[prevData.wings[wingIndex].name]?.[head],
            [apartmentType]: value
          }
        }
      }
    }));
  };

    return(
        
        <div className="space-y-6 my-10">
      {/* {formData.wings.map((wing, wingIndex) => (
        <div key={wingIndex} className="space-y-4">
          <h3 className="text-lg font-semibold">Maintenance amount for {wing.name}:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Sr No</th>
                <th className="border p-2 text-left">Heads</th>
                {apartmentTypes.map(type => (
                  <th key={type} className="border p-2 text-left">{type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.maintenanceHeads.map((head, index) => (
                <tr key={head}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{head}</td>
                  {apartmentTypes.map(type => (
                    <td key={type} className="border p-2">
                      <input
                        type="text"
                        className="w-full p-1 border rounded"

                        // value={formData.maintenanceAmounts[wing.name]?.[head]?.[type] || ''}
                        // onChange={(e) => handleMaintenanceAmountChange(wingIndex, head, type, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))} */}
    </div>
        
        
    )
};

export default Form_4;
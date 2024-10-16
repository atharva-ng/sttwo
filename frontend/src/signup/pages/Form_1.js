import React, { useState, useEffect } from "react";

const Form_1 = ({step, formData, setStep, setFormData}) => {

      // Generic function to handle changes in form data
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

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSocietyNameChange = (e) => {
        setFormData({
          ...formData,
          societyInformation: {
            ...formData.societyInformation,
            name: e.target.value,
          },
        });
      };
    
      const handleNext = () => {
        if (step === 1) {
          // If moving to Wing Information, initialize wings array based on numberOfWings
          const wings = Array.from({ length: parseInt(formData.numberOfWings) || 0 }, (_, i) => ({
            wingName: `Wing ${i + 1}`,
            numberOfFlats: '',
            numberOfLifts: ''
          }));
          setFormData(prevData => ({ ...prevData, wings }));
        }
        setStep(prevStep => prevStep + 1);
      };

      const handleWingsChange = (e) => {
        const numberOfWings = parseInt(e.target.value, 10);
      
        // Create an array of wing objects based on the number of wings
        const wings = Array.from({ length: numberOfWings }, (_, index) => ({
          wingNumber: index + 1,
          wingName: '',
          wingFloors: '',
          wingRoomsPerFloor: '',
          wingRoomDetails: []
        }));
      
        setFormData(prevState => ({
          ...prevState,
          societyInformation: {
            ...prevState.societyInformation,
            numberOfWings: numberOfWings
          },
          wingInformation: wings
        }));
      };
      


    return (
        <>
         <div className="space-y-4 px-8 pt-6 pb-8 mb-4">
        
        <div className="flex space-x-4">
      <div className="flex-1">
        <label htmlFor="societyName" className="block mb-1 text-customGray">Name</label>
        <input
          type="text"
          id="societyName"
          name="name"
          value={formData.societyInformation.name}
          onChange={handleChange('societyInformation.name')}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex-1">
        <label htmlFor="dateOfEstablishment" className="block mb-1 text-customGray">Date of Establishment</label>
        <input
          type="date"
          id="dateOfEstablishment"
          name="dateOfEstablishment"
          value={formData.societyInformation.dateOfEstablishment}
          onChange={handleChange('societyInformation.dateOfEstablishment')}
          className="w-full p-2 border rounded"
        />
      </div>
      </div>
      
      <div>
        <label htmlFor="address" className="block mb-1 text-customGray">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.societyInformation.address}
        onChange={handleChange('societyInformation.address')}
          className="w-full p-2 border rounded"
          rows="2"
        ></textarea>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="city" className="block mb-1 text-customGray">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.societyInformation.city}
        onChange={handleChange('societyInformation.city')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="state" className="block mb-1 text-customGray">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.societyInformation.state}
        onChange={handleChange('societyInformation.state')}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="pincode" className="block mb-1 text-customGray">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.societyInformation.pincode}
        onChange={handleChange('societyInformation.pincode')}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="flex space-x-4">
      <div className="flex-1">
        <label htmlFor="numberOfWings" className="block mb-1 text-customGray">Number of Wings</label>
        <input
          type="number"
          id="numberOfWings"
          name="numberOfWings"
          value={formData.societyInformation.numberOfWings}
        // onChange={handleChange('societyInformation.numberOfWings')}
        onChange = {handleWingsChange}
          className="w-full p-2 border rounded"
          min = "1"
        />
      </div>
      
      <div  className="flex-1">
        <label htmlFor="registrationNumber" className="block mb-1 text-customGray">Registration Number</label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={formData.societyInformation.registrationNumber}
        onChange={handleChange('societyInformation.registrationNumber')}
          className="w-full p-2 border rounded"
        />
      </div>

      </div>

      <div className="flex space-x-4">
      <div className="flex-1">
        <label htmlFor="emailAddress" className="block mb-1 text-customGray">Email</label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={formData.societyInformation.emailAddress}
          onChange={handleChange('societyInformation.emailAddress')}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div  className="flex-1">
        <label htmlFor="password" className="block mb-1 text-customGray">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.societyInformation.password}
        onChange={handleChange('societyInformation.password')}
          className="w-full p-2 border rounded"
        />
      </div>

      </div>
    </div>
  

        </>
    )
}

export default Form_1;
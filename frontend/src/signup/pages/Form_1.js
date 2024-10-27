import React, { useState, useEffect } from "react";

const Form_1 = ({step, formData, setStep, setFormData, onIsFilledChange}) => {

  const [isFilled, setIsFilled] = useState(false);

  // Validate form and set isFilled
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value !== "");
    setIsFilled(allFieldsFilled);
    onIsFilledChange(allFieldsFilled);  // Pass this state up to parent (signupsociety.js)
  }, [formData, onIsFilledChange]);

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
          societyDetails: {
            ...formData.societyDetails,
            name: e.target.value,
          },
        });
      };

    

      const handleWingsChange = (e) => {
        const numberOfWings = parseInt(e.target.value, 10);
      
        // Create an array of wing objects based on the number of wings
        const wings = Array.from({ length: numberOfWings }, (_, index) => ({
          wingNumber: index + 1,
          name: '',
          floors: '',
          roomsPerFloor: '',
          wingRoomDetails: []
        }));
      
        setFormData(prevState => ({
          ...prevState,
          societyDetails: {
            ...prevState.societyDetails,
            numberOfWings: String(numberOfWings)
          },
          wingInformation: wings
        }));
      };
      
      const handleNext1 = () => {

        setStep(prevStep => prevStep + 1);
      }


    return (
        <>
        <form onSubmit={handleNext1}>
         <div className="space-y-4 px-8 pt-6 pb-8 mb-4">
        
        <div className="flex space-x-4">
      <div className="flex-1">
        <label htmlFor="societyName" className="block mb-1 text-customGray">Name</label>
        <input
          type="text"
          id="societyName"
          name="name"
          value={formData.societyDetails.name}
          onChange={handleChange('societyDetails.name')}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex-1">
        <label htmlFor="societyName" className="block mb-1 text-customGray">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.societyDetails.phoneNumber}
          onChange={handleChange('societyDetails.phoneNumber')}
          className="w-full p-2 border rounded"
          pattern="[0-9]{10}"
          required
        />
      </div>
      
      
      </div>
      
      <div>
        <label htmlFor="address" className="block mb-1 text-customGray">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.societyDetails.address}
        onChange={handleChange('societyDetails.address')}
          className="w-full p-2 border rounded"
          rows="2"
          required
        ></textarea>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="city" className="block mb-1 text-customGray">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.societyDetails.city}
        onChange={handleChange('societyDetails.city')}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="state" className="block mb-1 text-customGray">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.societyDetails.state}
        onChange={handleChange('societyDetails.state')}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="pincode" className="block mb-1 text-customGray">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.societyDetails.pincode}
        onChange={handleChange('societyDetails.pincode')}
            className="w-full p-2 border rounded"
            required
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
          value={formData.societyDetails.numberOfWings}
        // onChange={handleChange('societyDetails.numberOfWings')}
        onChange = {handleWingsChange}
          className="w-full p-2 border rounded"
          min = "1"
          required
        />
      </div>
      
      <div  className="flex-1">
        <label htmlFor="registrationNumber" className="block mb-1 text-customGray">Registration Number</label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={formData.societyDetails.registrationNumber}
        onChange={handleChange('societyDetails.registrationNumber')}
          className="w-full p-2 border rounded"
          required
        /> 
      </div>

      <div className="flex-1">
        <label htmlFor="dateOfEstablishment" className="block mb-1 text-customGray">Date of Establishment</label>
        <input
          type="date"
          id="dateOfEstablishment"
          name="dateOfEstablishment"
          value={formData.societyDetails.dateOfEstablishment}
          onChange={handleChange('societyDetails.dateOfEstablishment')}
          className="w-full p-2 border rounded"
          required
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
          value={formData.societyDetails.emailAddress}
          onChange={handleChange('societyDetails.emailAddress')}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div  className="flex-1">
        <label htmlFor="password" className="block mb-1 text-customGray">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.societyDetails.password}
        onChange={handleChange('societyDetails.password')}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      </div>
      
    </div>
    <div className={`button-row flex justify-end`}>
    <button type="submit" className="next-button px-12 py-2  bg-blue-600 text-white rounded hover:bg-blue-700" >Next</button>
    </div>
    </form>

  

        </>
    )
}

export default Form_1;




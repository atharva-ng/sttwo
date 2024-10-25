import React, { useState, useEffect } from "react";
import Form_1 from "./Form_1.js";
import Form_2 from "./Form_2.js";
import Form_3 from "./Form_3.js";
import Form_4 from "./Form_4.js";
// import SignupSociety2 from "./SignupSociet2.js";

import "./LoadingPopUp.css";

const SignupSociety = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [roomSizes, setRoomSizes] = useState([]); // Initialize as an empty array
  const [maintenanceHeads, setMaintenanceHeads] = useState([]); // Initialize as an empty array

  //minor changes

  const [isWingDetailsFilled, setIsWingDetailsFilled] = useState(false);  // Track if WingDetailsForm is filled
  const [isOtherFormFilled, setIsOtherFormFilled] = useState(false);  // For other forms


  const [formData, setFormData] = useState({

    societyDetails: {
      name: '',
      phoneNumber:'',
      dateOfEstablishment: '',
      emailAddress: '',
      password: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      numberOfWings: '',
      registrationNumber: '',
    },
    wingInformation: {
      wingNumber: {
        wingName: '',
        wingFloors: '',
        wingRoomsPerFloor: '',
        wingRoomDetails: {
          roomIndex: {
            roomNumber: '',
            roomSize: '',
            maintenanceAmount: '',
            maintenanceHeadAmount: {},
          },
        },
      },
    },
    maintenanceHeads: [], // Add this to avoid the 'undefined' error.
  });

    const API_URL = 'http://3.109.108.99:5007/api/register';

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}`,{
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',  
          },
      });
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        
        setRoomSizes(data.roomSizes); // Ensure roomSizes is updated
        setMaintenanceHeads(data.maintainanceHeads); // Ensure roomSizes is updated
        
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmitForm = async (e) => {
      e.preventDefault();
      setIsLoading(true);
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            const data = await response.json();
            console.log(data);
            throw new Error('Failed to post formData');
          }
  
          window.location.reload();
        } catch (err) {
          // setError('Failed to post notice. Please try again.');

          console.log('Error posting notice:', err);
        } finally {
          localStorage.setItem('formData', JSON.stringify(formData));
          console.log("Form Submitted:", JSON.stringify(formData));
          setIsLoading(false);
          alert("Data Posted");
        }      
    };

    useEffect(() => {
      fetchData();
    }, []);

    // Callback to update `isFilled` status for WingDetailsForm
  const handleWingDetailsFilledChange = (isFilled) => {
    setIsWingDetailsFilled(isFilled);
  };

  return (
    <div className="signup-container">
          <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Society Registration Form</h1>
      
      <div className="flex justify-between mb-6">
        {['Basic Information', 'Wing Information', 'Maintenance Heads', 'Maintenance amount'].map((label, index) => (
          <div key={index} className={`flex items-center ${index + 1 === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${index + 1 === step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {index + 1}
            </div>
            {label}
          </div>
        ))}


      </div>

      {
        isLoading && 
        <>
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
        style = {{background:"rgba(0, 0, 0, 0.3)"}}
        >
  <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
    <div className="loader-dots block relative w-20 h-5 mt-2">
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-600"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-600"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-600"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-600"></div>
    </div>
    <div className="text-gray-500 text-xs font-medium mt-2 text-center">
      Connecting to client...
    </div>
  </div>
  </div>

        </>
      }
      

      <div className="form-page">
        {step === 1 && <Form_1 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData} onIsFilledChange={handleWingDetailsFilledChange}/>}
        {step === 2 && <Form_2 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData} roomSizes = {roomSizes}/>}
        {step === 3 && <Form_3 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData} maintenanceHeads = {maintenanceHeads}/>}
        {step === 4 && <Form_4 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData} handleSubmitForm = {handleSubmitForm}/>}

        </div>
        {/* <div className={`button-row flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {
            step === 1 &&
            <>
            <button className="next-button px-12 py-2 my-4  bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>Next</button>
            
            </>
          }
          {step > 1 && step < 4 &&
          <>
          <button className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handlePrevious}>Previous</button>
          <button className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>Next</button>
          
          </>
          }
          {
            step === 4 &&
            <>
            <button className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handlePrevious}>Previous</button>
          
            <button className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleRegister}>Register</button>
            </>
          }
          
        </div> */}
      </div>

    </div>
  );
};
export default SignupSociety;
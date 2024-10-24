import React, { useState, useEffect } from "react";
import Form_1 from "./Form_1.js";
import Form_2 from "./Form_2.js";
import Form_3 from "./Form_3.js";
import Form_4 from "./Form_4.js";
// import SignupSociety2 from "./SignupSociet2.js";

const SignupSociety = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [roomSizes, setRoomSizes] = useState([]); // Initialize as an empty array
  const [maintenanceHeads, setMaintenanceHeads] = useState([]); // Initialize as an empty array

  //minor changesssss

  const [isWingDetailsFilled, setIsWingDetailsFilled] = useState(false);  // Track if WingDetailsForm is filled
  const [isOtherFormFilled, setIsOtherFormFilled] = useState(false);  // For other forms


  const [formData, setFormData] = useState({

    societyDetails: {
      name: '',
      dateOfEstablishment: '',
      emailAddress: '',
      password: '',
      phoneNumber: '',
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
          // headers: {
          //     'Authorization': `Bearer ${token}`, 
          //     'Content-Type': 'application/json',  
          // },
      });
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        
        setRoomSizes(data.roomSizes); // Ensure roomSizes is updated
        setMaintenanceHeads(data.maintainanceHeads); // Ensure roomSizes is updated
        
      } catch (err) {
        console.error('Error fetching notices:', err);

        //For when data fetching isnt working / server is down
    // sample data

    const data = {
      "roomSizes": [
          {
              "id": 1,
              "size": "1RK"
          },
          {
              "id": 2,
              "size": "1BHK"
          },
          {
              "id": 3,
              "size": "2BHK"
          },
          {
              "id": 4,
              "size": "3BHK"
          },
          {
              "id": 5,
              "size": "4BHK"
          },
          {
              "id": 6,
              "size": "5BHK"
          },
          {
              "id": 7,
              "size": "6BHK"
          },
          {
              "id": 8,
              "size": "7BHK"
          }
      ],
      "maintainanceHeads": [
          "Electric Charges",
          "Water Charges",
          "Service & Maintenance Charges",
          "Sinking Fund",
          "Repairing Fund",
          "Non Agriculture Tax",
          "Festival & Welfare Charges",
          "Four Wheelers Parking Charges",
          "Education & Training Fund"
      ]
  }

  setRoomSizes(data.roomSizes); // Ensure roomSizes is updated
        setMaintenanceHeads(data.maintainanceHeads); // Ensure roomSizes is updated

      } finally {
        setIsLoading(false);
      }
    };

    const handleSubmitForm = async (e) => {
      e.preventDefault();
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              // 'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error('Failed to post formData');
          }
  
          window.location.reload();
        } catch (err) {
          // setError('Failed to post notice. Please try again.');
          console.error('Error posting notice:', err);
        } finally {
          localStorage.setItem('formData', JSON.stringify(formData));
          console.log("Form Submitted:", formData);
          alert("Data Posted");
        }      
    };

    useEffect(() => {
      fetchData();
    }, []);



    //For when data fetching isnt working / server is down
    // sample data

  //   const data = {
  //     "roomSizes": [
  //         {
  //             "id": 1,
  //             "size": "1RK"
  //         },
  //         {
  //             "id": 2,
  //             "size": "1BHK"
  //         },
  //         {
  //             "id": 3,
  //             "size": "2BHK"
  //         },
  //         {
  //             "id": 4,
  //             "size": "3BHK"
  //         },
  //         {
  //             "id": 5,
  //             "size": "4BHK"
  //         },
  //         {
  //             "id": 6,
  //             "size": "5BHK"
  //         },
  //         {
  //             "id": 7,
  //             "size": "6BHK"
  //         },
  //         {
  //             "id": 8,
  //             "size": "7BHK"
  //         }
  //     ],
  //     "maintainanceHeads": [
  //         "Electric Charges",
  //         "Water Charges",
  //         "Service & Maintenance Charges",
  //         "Sinking Fund",
  //         "Repairing Fund",
  //         "Non Agriculture Tax",
  //         "Festival & Welfare Charges",
  //         "Four Wheelers Parking Charges",
  //         "Education & Training Fund"
  //     ]
  // }
  // useEffect(() => {
  //   setRoomSizes(data.roomSizes); // Ensure roomSizes is updated
  //     setMaintenanceHeads(data.maintainanceHeads); // Ensure roomSizes is updated
  // },[]);
      




    // Callback to update `isFilled` status for WingDetailsForm
  const handleWingDetailsFilledChange = (isFilled) => {
    setIsWingDetailsFilled(isFilled);
  };

  // const handleNext = () => {
  // //   console.log("filled,main:", isWingDetailsFilled, step);
  // //   if (step===1 && !isWingDetailsFilled){
  // //     alert("Fill all fields");
    
  // // }
  // setStep(prevStep => prevStep + 1);
  // };

  // const handlePrevious = () => {
  //   setStep(prevStep => prevStep - 1);
  // };

  // const handleRegister = () => {
  //         localStorage.setItem('formData', JSON.stringify(formData));
  //     alert("Form data saved successfully!");
  // };

  console.log(formData);
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
      {/* <Form /> */}
    </div>
  );
};
export default SignupSociety;
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import socreg_1 from "../../gallery/SocReg-1.svg";


const Form = () => {

  const history = useHistory();
  // State variables to store the form data
  const [formData, setFormData] = useState({
    name: "",
    dateOfEstablishment: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    numberOfWings: 0,
    registrationNumber: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:5007/api/auth/signup/society", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const responseData = await response.json();

      // if (!response.ok) {
      //   throw new Error(`Unexpected Error: ${responseData}`);
      // }

      // Set a flag in sessionStorage to indicate that the form has been successfully submitted
      sessionStorage.setItem('formSubmitted', 'true');
      sessionStorage.setItem('wingNumber', formData.numberOfWings)

      // Redirect to the next page
      history.push("/signup/signup-society-2");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center",
        paddingBottom:"10px"
       }}>
  Society Registration Form: <br />
  <img
    src={socreg_1}
    alt="step-1"
    style={{ marginTop: "30px", width: "100%", height: "auto" }}
  />
</h1>

      <form className="form" onSubmit={handleNext}>
        <div className="form-group">
          <>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          </>
          <label>Date of Establishment</label>
          <input type="date" name="dateOfEstablishment" value={formData.dateOfEstablishment} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <label>Pincode</label>
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <label>State</label>
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          
        </div>
        <div className="form-group">
          
          
          <label>Registration Number</label>
          <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} />
          
        </div>

        {/* New fields for Email Address and Password */}
        <div className="form-group">
        <label>Number Of Wings</label>
        <input type="number" name="numberOfWings" placeholder="Number Of Wings" value={formData.numberOfWings} onChange={handleChange} />
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          
        </div>
        <div className="form-group">
        <label>Email Address</label>
        <input type="email" name="emailAddress" placeholder="Email Address" value={formData.emailAddress} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>

        <button className="next-button" type="submit">Next</button>
      </form>
    </div>);
}

export default Form;
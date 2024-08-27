import { React, useState } from "react";
const Form =()=>{

  // State variables to store the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    phoneNumber: ""
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

    fetch("http://localhost:5007/api/auth/signup/owner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async response=>{
      const responseData=await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(`Unexpected Error: ${responseData}`);
      }
      window.location.reload();
    }).catch(error => {
      console.log(error);
      console.error("There was a problem with the fetch operation:", error);
    })
  };

  return(
          <div className="form-container">
            <h1>Owner Registration Form:</h1>
            <form className="form" onSubmit={handleNext}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="FIRST NAME" value={formData.firstName} onChange={handleChange} />
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="LAST NAME" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" placeholder="PHONE NUMBER" value={formData.phoneNumber} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="emailAddress" placeholder="EMAIL ADDRESS" value={formData.emailAddress} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="PASSWORD" value={formData.password} onChange={handleChange} required />
              </div>
    
              <button className="next-button" type="submit">Register</button>
            </form>
          </div>);
}

export default Form;
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import "./SignupSociety2.css";

import socreg_2 from "../../gallery/SocReg-2.svg";

const SignupSociety2 = () => {
  const history = useHistory();

  useEffect(() => {
    // Check if the form was submitted by checking sessionStorage
    const formSubmitted = sessionStorage.getItem('formSubmitted'); // Ensure we check sessionStorage

    if (!formSubmitted) {
      // If the form was not submitted, redirect to the first form page
      history.push("/signup/signup-society");
    }
  }, [history]);

  // Retrieve the number of wings from sessionStorage or default to 1 if not available
  const numWings = parseInt(sessionStorage.getItem('wingNumber')) || 1;
  
  // Default rooms per floor to 1, and enforce it never goes below 1
  const [roomsPerFloor, setRoomsPerFloor] = useState(null);

  // Handle the change in rooms per floor and ensure the value is at least 0
  const handleRoomsPerFloorChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setRoomsPerFloor(value);
    } else {
      setRoomsPerFloor(null); // Set minimum value to 0
    }
  };

  // Function to handle the previous button click
  const handlePrevious = () => {
    history.push("/signup/signup-society"); // Navigate back to the SignupSociety page
  };

  const handleNext = () => {
    history.push("/signup/signup-society-3");
  }

  return (
    <div className="wing-container">
      <header className="header">
        <div className="brand">COLONY</div>
        <div className="profile">Profile</div>
      </header>
      <div className="form-container">
      <h1 style={{ textAlign: "center",
        paddingBottom:"10px"}}>
        Society Registration Form: <br />
        <img
          src={socreg_2}
          alt="step-2"
          style={{ marginTop: "30px", width: "100%", height: "auto" }}
        />
      </h1>

        <div className="form-group">
          <label>Rooms per Floor</label>
          <input
            type="number"
            value={roomsPerFloor}
            onChange={handleRoomsPerFloorChange}
            placeholder="Enter rooms per floor"
            min="1" // Minimum value of 1 enforced at the input level
          />
        </div>

        {/* Map through the number of wings */}
        {[...Array(numWings)].map((_, wingIndex) => (
          <div key={wingIndex} className="wing-section">
            <h3>Details for Wing {wingIndex + 1}:</h3>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Name" />
              <label>Floors</label>
              <input type="number" placeholder="Floors" />
              <label>Rooms/Floor: {roomsPerFloor}</label>
              {/* <input
                type="number"
                value={roomsPerFloor} // This value is based on user input
                readOnly // Read-only to prevent direct edits
              /> */}
            </div>

            <h4>Room Information (1st residential floor):</h4>
            <div className="room-info">

              {/* Map through the number of rooms per floor */}
              {roomsPerFloor!=null && roomsPerFloor > 0 && [...Array(roomsPerFloor)].map((_, roomIndex) => (
                <div key={roomIndex} className="room-group">
                    <label>Room Number</label>
                    <input type="text" placeholder={`Room Number ${roomIndex + 1}`} />
                    
                    <label>Room Size</label>
                    <select>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    </select>

                    <label>Maintenance Amount</label>
                    <input type="number" placeholder="Maintenance Amount" />
                </div>
            ))}

            </div>
          </div>
        ))}

        <div className="button-group">
          <button className="previous-button" onClick={handlePrevious}>Previous</button>
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SignupSociety2;


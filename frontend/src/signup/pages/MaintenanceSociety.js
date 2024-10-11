import React from "react";
import {useHistory} from "react-router-dom";

function SocietyRegistrationForm() {

  const history = useHistory();

  const handlePrevious = ()=>{
    history.push("/signup/signup-society-2")
  }
  return (
    <div className="container">
      <header className="header">
        <h1>COLONY</h1>
        <div className="profile">Profile</div>
      </header>
      <div className="form-container">
        <h2>Society Registration Form (4/4):</h2>
        <p>Maintenance amount for wing A:</p>
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Heads</th>
              <th>1BHK (250 sqft)</th>
              <th>1BHK (300 sqft)</th>
              <th>2BHK (350 sqft)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Land tax</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Water tax</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Parking charges</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button className="previous-button" onClick={handlePrevious}>Previous</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </div>
  );
}

export default SocietyRegistrationForm;

import React from "react";
import "./SignupSociety.css";

import Form from "../components/Form";

const SignupSociety = () => {

  return (
    <div className="signup-container">
      <header className="header">
        <div className="brand">COLONY</div>
        <div className="profile">Profile</div>
      </header>

      <Form />
    </div>
  );
};

export default SignupSociety;
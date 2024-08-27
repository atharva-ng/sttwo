import React from "react";
import "./SignupOwner.css";

import Form from "../components/Form";

const SignupOwner = () => {

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

export default SignupOwner;
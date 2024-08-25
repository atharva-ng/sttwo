import React from "react";
import "./SignupSociety.css";

import Form from "../components/Form";
import Footer from "../../../shared/components/navbar/Footer";

const SignupSociety = () => {

  return (
    <div className="signup-container">
      <header className="header">
        <div className="brand">COLONY</div>
        <div className="profile">Profile</div>
      </header>

      <Form />

      <Footer />
    </div>
  );
};

export default SignupSociety;
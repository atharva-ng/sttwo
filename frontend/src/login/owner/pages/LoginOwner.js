import React from "react";

import Form from "../../pages/Form";

const LoginOwner = () => {

  return (
    <div className="login-container">
      <header className="header">
        <div className="brand">COLONY</div>
        <div className="profile">Profile</div>
      </header>

      <Form url="http://localhost:5007/api/auth/login/owner"/>
    </div>
  );
};

export default LoginOwner;
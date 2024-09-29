import React from "react";
import { useNavigate } from 'react-router-dom';

import Form from "../../pages/Form";

const LoginSociety = () => {

  const redirectHandler = (action) => {
    // const Navigate = useNavigate();
    // if (action === 1) {
    //   Navigate()
    // } else if (action === 2) {

    // } else {

    // }
  };

  return (
    <div className="form-container">
      <h1>Society Login Form:</h1>
      <Form url="http://localhost:5007/api/auth/login/society" redirectHandler={redirectHandler} />
    </div>
  );
};

export default LoginSociety;
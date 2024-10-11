import React, { useContext } from "react";

import Form from "../../pages/Form";
import { AuthContext } from "../../../shared/context/auth-context";

const LoginSociety = () => {
  const { userType, login, logout } = useContext(AuthContext);
  return (
    <div className="form-container">
      <h1>Society Login Form:</h1>
      <Form url="http://3.109.108.99:5007/api/auth/login/society" login={login} logout={logout} userType={userType} />
    </div>
  );
};

export default LoginSociety;
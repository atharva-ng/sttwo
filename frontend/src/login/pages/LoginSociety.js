import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import Form from "../Form";

const LoginSociety = () => {
  const { userType, login, logout } = useContext(AuthContext);
  return (
    <div className="form-container-signup flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-gray-700 mb-3 ">Society Login</h1>
      <Form url="http://3.109.108.99:5007/api/auth/login/society" login={login} logout={logout} userType={userType} />
      
    </div>
  );
};

export default LoginSociety;
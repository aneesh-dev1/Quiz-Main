import React from "react";
import LoginForm from "./LoginForm";
import "./styles/login.css";
const Login = () => {
 
  return (
    
    <div className="login">
      <div className="leftLogin">
        <img
          src="https://camo.githubusercontent.com/40165a147c3dcea0fa1db780bb533fc5f98546ccfb9d5d05ddb2f429277f5348/68747470733a2f2f616e616c7974696373696e6469616d61672e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f31322f646576656c6f7065722d6472696262626c652e676966"
          className="leftLoginImage"
          alt="leftProgrammer"
        />
      </div>
      <div className="rightLogin">
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;

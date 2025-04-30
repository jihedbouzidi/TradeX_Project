/* eslint-disable react/prop-types */
import { Login } from "./Login";
import { Register } from "./Register";
import { ToggleBox } from "./ToggleBox";
export const LogReg = ({isActive,handleRegisterClick,handleLoginClick}) => {

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
                  <Login />
                  <Register />
                  <ToggleBox
                    onRegisterClick={handleRegisterClick}
                    onLoginClick={handleLoginClick}
                  />
                </div>
  )
}

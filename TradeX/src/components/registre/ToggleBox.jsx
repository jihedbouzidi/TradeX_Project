/* eslint-disable react/prop-types */
export const ToggleBox = ({ onRegisterClick, onLoginClick }) => {
  
  return (
    <div className="toggle-box">
      <div className="toggle-panel toggle-left">
        <h1 style={{color:"white"}}>Bonjour, Bienvenue!</h1>
        <p style={{color:"white"}}>Vous n&apos;avez pas de compte ?</p>
        <button className="btn register-btn" onClick={onRegisterClick}>
          S&#39;inscrire
        </button>
      </div>
      <div className="toggle-panel toggle-right">
        <h1 style={{color:"white"}}>Bienvenue!</h1>
        <p style={{color:"white"}}>Vous avez déjà un compte ?</p>
        <button className="btn login-btn" onClick={onLoginClick}>
          Se Connecter
        </button>
      </div>
    </div>
  );
};

export default ToggleBox;
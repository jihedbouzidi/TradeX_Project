import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

 export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const success = await login(email, password);
    if (success) {
      navigate('/compte');
    }
  };

  return (
    <div className="from-box login">
      <form onSubmit={handleSubmit}>
        <h1>Se Connecter</h1>
        <div className="input-box">
          <input 
            type="text" 
            name="email" 
            placeholder="Nom d'utilisateur ou email" 
            required 
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input 
            type="password" 
            name="password" 
            placeholder="Mot de passe" 
            required 
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="forgot-link">
          <a href="#">Mot de passe oublié</a>
        </div>
        <button type="submit" className="btn">
          Connexion
        </button>
        <p>ou se connecter à l{"'"}aide des plateformes sociales</p>
        <div className="social-icons">
          <a href="#">
            <i className="bx bxl-google"></i>
          </a>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
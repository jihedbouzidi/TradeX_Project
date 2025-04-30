import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
export const Register = () => {
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nomPre = formData.get("nomPre");
    const email = formData.get("email");
    const password = formData.get("password");

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return;
    }

    await register(nomPre, email, password);
  };

  return (
    <div className="from-box register">
      <form onSubmit={handleSubmit}>
        <h1>Créer un compte</h1>
        <div className="input-box">
          <input
            type="text"
            name="nomPre"
            placeholder="Nom d'utilisateur"
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input type="email" name="email" placeholder="Email" required />
          <i className="bx bxs-envelope"></i>
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
        <div className="password-strength" id="passwordStrength">
          Force du mot de passe: Faible
        </div>

        <button type="submit" className="btn">
          S&#39;inscrire
        </button>
        <p>ou s&#39;inscrire sur les plates-formes sociales</p>
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

export default Register;
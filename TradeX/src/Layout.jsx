
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

export const Layout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register","/compte"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldShowNavbar && <NavBar/>}
      <Outlet /> {/* Affiche le contenu de la page actuelle */}
    </>
  );
};

export default Layout;
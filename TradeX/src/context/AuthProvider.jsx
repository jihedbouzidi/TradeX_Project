/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Connexion réussie!", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return true;
      } else {
        toast.error(result.message || "Identifiants incorrects", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return false;
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      console.error(error);
      return false;
    }
  };

  const register = async (nomPre, email, password) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nomPre, email, password }),
        }
      );

      const result = await response.json();

      if (result.message === "Inscription réussie !") {
        toast.success(result.message, {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return true;
      } else {
        toast.error(result.message || "Erreur lors de l'inscription", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return false;
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Déconnexion réussie!", {
      position: "top-center",
      style: {
        background: "#000",
        color: "#fff",
      },
    });
    return true;
  };

  const updateProfile = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/modifierPro.php",
        {
          method: "POST",
          body: formData, // FormData est envoyé directement sans en-tête Content-Type
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.status === "success" || result.message === 'Profil mis à jour avec succès') {
        const updatedUser = { ...user, ...result.data }; // Adapté au format du backend
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success(result.message || "Profil mis à jour!", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return true;
      } else {
        throw new Error(result.message || "Erreur de mise à jour");
      }
    } catch (error) {
      toast.error(error.message || "Erreur technique", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      console.error("Erreur détaillée:", error);
      return false;
    }
  };

  
  

  const AddPulication = async (
    idUser,
    type_app,
    desc,
    facebook,
    whatsapp,
    images = []
  ) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/AddPublication.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            utilisateur_id: idUser,
            type: type_app,
            description: desc,
            facebookLink: facebook,
            whatsappLink: whatsapp,
            images: images
          }),
        }
      );
  
      const result = await response.json();
  
      if (result.status === "success") {
        toast.success("Publication ajoutée avec succès!", {
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return result;
      } else {
        throw new Error(
          result.message || "Erreur lors de l'ajout de la publication"
        );
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de l'ajout de la publication", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      throw error;
    }
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        AddPulication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

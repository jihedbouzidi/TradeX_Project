/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { api } from "../services/api";

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
        "http://localhost/Backend_TradeX/Controllers/login.php",
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
        "http://localhost/Backend_TradeX/Controllers/register.php",
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
    return true;
  };

  const updateProfile = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/Controllers/modifierPro.php",
        {
          method: "POST",
          body: formData, // FormData est envoyé directement sans en-tête Content-Type
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (
        result.status === "success" ||
        result.message === "Profil mis à jour avec succès"
      ) {
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

  const AddPublication = async (
    idUser,
    type_app,
    desc,
    objectif,
    facebook,
    whatsapp,
    images = []
  ) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/Controllers/AddPublication.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            utilisateur_id: idUser,
            type: type_app,
            description: desc,
            objectif: objectif,
            facebookLink: facebook,
            whatsappLink: whatsapp,
            images: images,
          }),
        }
      );

      // Vérifiez d'abord que la réponse existe
      if (!response) {
        throw new Error("Aucune réponse du serveur");
      }

      // Vérifiez le Content-Type avant de parser le JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Réponse inattendue: ${text}`);
      }

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
      console.error("Erreur détaillée:", error);
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
  const addToPanier = async (publication_id) => {
    if (!user?.id) {
      toast.error("Veuillez vous connecter pour ajouter au favourite",{
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return false;
    }

    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/Controllers/AddPanier.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            utilisateur_id: user.id,
            publication_id: publication_id,
          }),
        }
      );

      // Lire la réponse une seule fois
      const responseData = await response.text();
      let result;

      try {
        result = JSON.parse(responseData);
      } catch (e) {
        throw new Error("Réponse serveur invalide", e);
      }

      if (!response.ok) {
        throw new Error(result.message || `Erreur serveur: ${response.status}`);
      }

      if (result.status !== "success") {
        throw new Error(
          result.message || "Erreur lors de l'ajout au favourite",
          {
            position: "top-center",
            style: {
              background: "#000",
              color: "#fff",
            },
          }
        );
      }

      toast.success(result.message || "Article ajouté au favourite", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return true;
    } catch (error) {
      console.error("Erreur addToPanier:", error);
      toast.error(error.message || "Erreur lors de l'ajout au favourite", {
        position: "top-center",
        style: {
          background: "#000",
          color: "#fff",
        },
      });
      return false;
    }
  };
  const deletePublication = async (publication_id) => {
    if (!user?.id) {
      toast.error("Veuillez vous connecter");
      return false;
    }

    try {
      const response = await api.post("/Controllers/supprimerPub.php", {
        publication_id,
        utilisateur_id: user.id,
      });

      if (response.status === "success") {
        toast.success("Publication supprimée avec succès",{
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la suppression");
      return false;
    }
  };

  const updatePublication = async (publication_id, updatedData) => {
    if (!user?.id) {
      toast.error("Veuillez vous connecter");
      return false;
    }

    try {
      const response = await api.post("/Controllers/modifierPub.php", {
        publication_id,
        utilisateur_id: user.id,
        ...updatedData,
      });

      if (response.status === "success") {
        toast.success("Publication mise à jour avec succès",{
          position: "top-center",
          style: {
            background: "#000",
            color: "#fff",
          },
        });
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la mise à jour");
      return false;
    }
  };

  const getUserPublications = async (userId) => {
    try {
      const response = await fetch(`http://localhost/Backend_TradeX/Controllers/getPub.php?utilisateur_id=${userId}`);
      const data = await response.json();
      
      if (data.status !== "success") {
        throw new Error(data.message || "Erreur inconnue du serveur");
      }

      return data.data;
    } catch (error) {
      throw new Error(`Échec de la récupération des publications: ${error.message}`);
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
        AddPublication,
        addToPanier,
        deletePublication,
        updatePublication,
        getUserPublications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

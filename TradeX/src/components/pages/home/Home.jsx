import { useState } from "react";
import Filtrage from "./filtrage/Filtrage";
import AddPublication from "./publications/AddPublication";
import Content from "./Content";
import styles from "./Home.module.css";

export const Home = () => {
  // État pour stocker les publications
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        id: 1,
        nom: "Jihed Bouzidi",
        photoProURL:
          "https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/480561983_2506235313050040_9208433570590381400_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=CsQh5x5Qdy4Q7kNvgHjMPxH&_nc_oc=AdjT2-C2ME_1LUhhej8IgftPrRWqJSh0AamJ4co7ijVrxTtRvremD2qkyE_hpJ7Q-90&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=ApbmXLhnaayxDpS3zVVkJpN&oh=00_AYEYbAF4BhfHMiZzjka5oWRpbVqPvgMv3lSRQeOBCyxUWg&oe=67D3B8CD",
        LinkProfile: "http://localhost:5173/profile",
      },
      description: "Sandii iPhone 13 nheb ala pc de caracteristique",
      image:
        "https://www.memorypc.fr/media/9e/79/f0/1741784752/553561-06-1741784750-6-1741784751.webp",
    },
    // Ajoutez d'autres publications ici si nécessaire
  ]);

  // Fonction pour ajouter une nouvelle publication
  const handlePublish = (newPublication) => {
    const newPost = {
      id: posts.length + 1, // Générer un nouvel ID unique
      user: {
        id: 1, // Remplacez par l'ID de l'utilisateur actuel
        nom: "Jihed Bouzidi", // Remplacez par le nom de l'utilisateur actuel
        photoProURL:
          "https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/480561983_2506235313050040_9208433570590381400_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=CsQh5x5Qdy4Q7kNvgHjMPxH&_nc_oc=AdjT2-C2ME_1LUhhej8IgftPrRWqJSh0AamJ4co7ijVrxTtRvremD2qkyE_hpJ7Q-90&_nc_zt=23&_nc_ht=scontent.ftun8-1.fna&_nc_gid=ApbmXLhnaayxDpS3zVVkJpN&oh=00_AYEYbAF4BhfHMiZzjka5oWRpbVqPvgMv3lSRQeOBCyxUWg&oe=67D3B8CD",
        LinkProfile: "http://localhost:5173/profile",
      },
      description: newPublication.description,
      image: newPublication.image,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div className={styles.accountPage}>
      <Filtrage />
      <div className={styles.mainContent}>
        {/* Passer la fonction handlePublish à AddPublication */}
        <AddPublication onPublish={handlePublish} />
        <div>
          {posts.map((post) => (
            <Content
              key={post.id} // Unique key for each post
              user={post.user}
              description={post.description}
              image={post.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

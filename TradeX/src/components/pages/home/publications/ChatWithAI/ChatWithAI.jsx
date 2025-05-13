import styles from "./ChatWithAI.module.css";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
const INITIAL_AI_MESSAGE = {
  sender: "ai",
  text: "Bonjour ! 👋 Je suis l'assistant technique TradeX. Posez-moi vos questions sur le matériel informatique.",
};

export const ChatWithAI = () => {
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState("/inconn.png");
  const [messages, setMessages] = useState([INITIAL_AI_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (user && user.chemin_photo) {
      // Vérifier si le chemin de la photo existe et n'est pas vide
      const photoPath = user.chemin_photo.trim();
      if (photoPath) {
        // Ajouter le chemin de base si nécessaire
        const fullPath = photoPath.startsWith("/")
          ? photoPath
          : `/${photoPath}`;
        setPhotoURL(fullPath);
      }
    }
  }, [user]);
  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Appel de l'API PHP
  const callOpenRouterAPI = async (query) => {
    try {
      const response = await fetch(
        "http://localhost/Backend_TradeX/Controllers/ai-chat.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: query,
            conversation: messages.filter(
              (msg, idx) => !(idx === 0 && msg.sender === "ai")
            ),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `Erreur HTTP ${response.status}`);
      }
      return data.response;
    } catch (error) {
      throw new Error(
        error.message || "Erreur lors de la connexion au serveur."
      );
    }
  };

  // Gérer l'envoi
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await callOpenRouterAPI(input.trim());
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponse || "Je n'ai pas pu générer de réponse.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `⚠️ ${error.message} Veuillez réessayer.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.fullPageChatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.aiAvatar}>
          <div className={styles.aiAvatarInner}>
            <img
              src="/logo.png"
              alt="TradeX Logo"
              className={styles.logoImage}
            />
          </div>
        </div>
        <div className={styles.headerText}>
          <h2>TradeX Assistant Technique</h2>
          <p>Assistant expert en matériel informatique</p>
        </div>
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={`msg-${index}`}
            className={`${styles.message} ${
              message.sender === "user" ? styles.messageUser : styles.messageAI
            }`}
          >
            {message.sender === "ai" && (
              <div className={styles.aiIconContainer}>
                <div className={styles.aiIcon}>
                  <img
                    src="/artificial-intelligence.png"
                    alt="AI Assistant"
                    className={styles.chatbotImage}
                  />
                </div>
              </div>
            )}
            <div
              className={`${styles.messageBubble} ${
                message.sender === "user"
                  ? styles.messageBubbleUser
                  : styles.messageBubbleAI
              }`}
            >
              {message.text.split("\n").map((line, i) => (
                <p key={`line-${i}`}>{line}</p>
              ))}
            </div>
            {message.sender === "user" && (
              <div className={styles.userIconContainer}>
                <div className={styles.userIcon}>
                  <img
                    src={photoURL}
                    alt="User"
                    className={styles.userImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-user.png";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.messageAI}`}>
            <div className={styles.aiIconContainer}>
              <div className={styles.aiIcon}>
                <img
                  src="/artificial-intelligence.png"
                  alt="AI Assistant"
                  className={styles.chatbotImage}
                />
              </div>
            </div>

            <div className={styles.typingIndicator}>
              <span>TradeX AI rédige une réponse</span>
              <div className={styles.typingDots}>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputArea}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tapez votre message ici..."
            className={styles.inputField}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={styles.sendButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            ></svg>
          </button>
        </div>
        <p className={styles.disclaimer}>
          TradeX AI peut occasionnellement faire des erreurs. Veuillez vérifier
          les informations importantes.
        </p>
      </div>
    </div>
  );
};

export default ChatWithAI;

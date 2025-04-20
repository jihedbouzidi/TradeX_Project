import styles from "./ChatWithAI.module.css";
import { useState, useRef, useEffect } from 'react';

export const ChatWithAI = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Bonjour ! 👋 Je suis l'assistant TradeX. Posez-moi vos questions sur le matériel tech et je vous aiderai à trouver les meilleures options."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callDeepSeekAPI = async (query) => {
    const apiKey = 'YOUR_DEEPSEEK_API_KEY'; // Remplacez par votre clé API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant expert pour TradeX, une plateforme d\'échange de matériel technologique entre étudiants. Sois concis, utile et propose toujours des options adaptées aux étudiants.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await callDeepSeekAPI(input);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: response 
      }]);
    } catch (error) {
      console.error('Erreur API:', error);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "⚠️ Désolé, je rencontre un problème technique. Veuillez réessayer plus tard."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.aiAvatar}>TX</div>
        <div>
          <h2>TradeX Assistant AI</h2>
          <p>Assistant technologique intelligent</p>
        </div>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.sender === 'user' ? styles.messageUser : styles.messageAI}`}>
            {message.sender === 'ai' && <div className={styles.aiIcon}>🤖</div>}
            <div className={`${styles.messageBubble} ${message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleAI}`}>
              {message.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {message.sender === 'user' && <div className={styles.userIcon}>👤</div>}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.messageAI}`}>
            <div className={styles.aiIcon}>🤖</div>
            <div className={styles.messageBubbleAI}>
              <div className={styles.typingIndicator}>
                <span>TradeX AI rédige une réponse</span>
                <div className={styles.typingDots}>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                </div>
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
            placeholder="Message à TradeX AI..."
            className={styles.inputField}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={styles.sendButton}
            aria-label="Envoyer message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
        <p className={styles.disclaimer}>
          TradeX AI peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
};

export default ChatWithAI;
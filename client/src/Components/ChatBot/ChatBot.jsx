import React, { useState, useRef, useEffect } from "react";
import styles from "./chatBot.module.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { LuBotMessageSquare } from "react-icons/lu";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import ReactMarkdown from "react-markdown";

// Retrieve API URL, Key and System Instruction from environment variables
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const systemInstructionText = import.meta.env.VITE_SYSTEM_INSTRUCTION;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mini, setMini] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: "Hello! I'm your Evangadi Forum assistant. How can I help you today?", // Updated welcome message
          sender: "bot",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleOpen = () => setIsOpen((open) => !open);
  const minMax = () => setMini((prev) => !prev);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Prepare conversation history for the API (last 10 messages)
    const historyForApi = messages.slice(-10).map((msg) => ({
      role: msg.sender === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    // The current user message to be added to the history for the API call
    const currentUserApiMessage = {
      role: "user",
      parts: [{ text: userMsg.text }],
    };
    const requestContents = [...historyForApi, currentUserApiMessage];

    try {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: requestContents,
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
        }),
      });
      const data = await res.json();
      let botText = "Sorry, I couldn't get a response.";
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        botText = data.candidates[0].content.parts[0].text;
      }
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botText, sender: "bot" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Error: Could not reach Gemini API.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={`${styles.container} ${mini ? "" : styles.max}`}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <span className={styles.mainTitle}>
                <LuBotMessageSquare
                  size="25"
                  style={{ marginRight: "0.8rem" }}
                />{" "}
                Evangadi Forum Assistant
              </span>
              <span className={styles.subTitle}>powered by Gemini</span>
            </div>

            {mini ? (
              <button className={styles.minMaxBtn} onClick={minMax}>
                <LuMaximize2 size={20} />
              </button>
            ) : (
              <button className={styles.minMaxBtn} onClick={minMax}>
                <LuMinimize2 size={20} />
              </button>
            )}
          </div>
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoading && (
              <div
                className={`${styles.message} ${styles.bot} ${styles.loading}`}
              >
                Thinking<span className={styles.loading}>...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className={styles.inputArea} onSubmit={handleSendMessage}>
            <input
              className={styles.input}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              className={styles.sendBtn}
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
      <button
        className={styles.toggleBtn}
        onClick={toggleOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes /> : <LuBotMessageSquare size={30} />}
      </button>
    </>
  );
};

export default ChatBot;

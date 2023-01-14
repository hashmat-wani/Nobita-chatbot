import React, { createContext, useRef, useState } from "react";

export const chatContext = createContext();

const ChatContext = ({ children }) => {
  const [clearChat, setClearChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [speechInputValue, setSpeechInputValue] = useState("");
  const [initialInputValue, setInitialInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [speechLoading, setSpeechLoading] = useState(false);
  const loadingInterval = useRef(null);
  const typingInterval = useRef(null);

  return (
    <chatContext.Provider
      value={{
        clearChat,
        setClearChat,
        isChatOpen,
        setIsChatOpen,
        inputValue,
        setInputValue,
        initialInputValue,
        setInitialInputValue,
        loading,
        setLoading,
        typing,
        setTyping,
        loadingInterval,
        typingInterval,
        speechInputValue,
        setSpeechInputValue,
        speechLoading,
        setSpeechLoading,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatContext;

import React, { createContext, useState } from "react";

export const chatContext = createContext();

const ChatContext = ({ children }) => {
  const [clearChat, setClearChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [initialInputValue, setInitialInputValue] = useState("");
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
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatContext;

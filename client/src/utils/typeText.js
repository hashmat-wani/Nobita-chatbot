function typeText(
  el,
  chatContainer,
  text,
  typingInterval,
  setLoading,
  setTyping
) {
  let idx = 0;
  typingInterval.current = setInterval(() => {
    if (idx < text.length) {
      el.innerHTML += text[idx++];
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      clearInterval(typingInterval.current);
      setLoading(false);
      setTyping(false);
    }
  }, 20);
}

export default typeText;

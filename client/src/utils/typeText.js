function typeText(el, chatContainer, text, setLoading) {
  let idx = 0;
  let interval = setInterval(() => {
    if (idx < text.length) {
      el.innerHTML += text[idx++];
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      clearInterval(interval);
      setLoading(false);
    }
  }, 20);
}

export default typeText;

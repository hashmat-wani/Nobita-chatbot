function loader(element, loadingInterval) {
  element.textContent = "";

  loadingInterval.current = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") element.textContent = "";
  }, 300);
}

export default loader;

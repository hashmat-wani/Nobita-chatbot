function loader(element, loadInterval) {
  element.textContent = "";

  loadInterval.current = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") element.textContent = "";
  }, 300);
}

export default loader;

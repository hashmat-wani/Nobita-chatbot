function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexaDecStr = randomNumber.toString(16);
  return `id-${timeStamp}-${hexaDecStr}`;
}

export default generateUniqueId;

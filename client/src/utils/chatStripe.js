import botIcon from "../assets/bot.svg";
import userIcon from "../assets/user.svg";

function chatStripe(isAi, value, uniqueId) {
  return `<Box color="red" class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? botIcon : userIcon}" alt="${
    isAi ? "bot-icon" : "user-icon"
  }" />
        </div>
        <div style={{color:"red"}} class="message" id="${uniqueId}">${value}</div>
      </div>
    </Box>`;
}
export default chatStripe;

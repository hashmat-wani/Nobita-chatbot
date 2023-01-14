import botIcon from "../assets/bot.svg";
import userIcon from "../assets/user.svg";

function chatStripe(isAi, value, uniqueId) {
  return `<Box class="wrapper ${isAi && "ai"}">
  ${isAi ? "<div class=copy>Copy</div>" : ""}
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? botIcon : userIcon}" alt="${
    isAi ? "bot-icon" : "user-icon"
  }" />
        </div>
        <div class="message" id="${uniqueId}">${value}</div>
      </div>
    </Box>`;
}
export default chatStripe;

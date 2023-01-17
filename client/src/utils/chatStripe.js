import botIcon from "../assets/nobitaBot.ico";
import userIcon from "../assets/user.svg";
import copyIcon from "../assets/copy.svg";

function chatStripe(isAi, value, uniqueId) {
  return `<Box class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? botIcon : userIcon}" alt="${
    isAi ? "bot-icon" : "user-icon"
  }" />
        </div>
        <div class="message" id="${uniqueId}">${value}</div>
        ${
          isAi
            ? `<div class="copy"><img title="copy" src="${copyIcon}" /></div>`
            : ""
        }
      </div>
    </Box>`;
}
export default chatStripe;

const typeMsg = document.querySelector("#val");
const sendMsg = document.querySelector("#sendBtn").addEventListener("click", async () => {
  let allMsgCont = document.querySelector("#section");
  let msg = typeMsg.value.trim();

  if (!msg) return; // Prevent sending empty messages

  // Append user message to chat
  let msgRoom = `<div class="user-demo-answer">
      <div class="user-conv-container">
        <div class="user-pic">
          <i class="fa fa-user-circle"></i>
        </div>
        <div class="userMsg">
          ${msg}
        </div>
      </div>
      <small id="time">${new Date().toLocaleTimeString()}</small>
    </div>`;
  
  allMsgCont.innerHTML += msgRoom;
  typeMsg.value = ""; // Clear input field

  // Show loading indicator
  let loadingIndicator = `<div class="bot-first-question" id="loading">
      <span class="bot-conv-container">
        <div class="bot-pic">
          <i class="fa fa-robot"></i>
        </div>
        <span class="botMsg message">Typing...</span>
      </span>
    </div>`;
  allMsgCont.innerHTML += loadingIndicator;
  allMsgCont.scrollTop = allMsgCont.scrollHeight;

  // Fetch response from API
  let botResponse = await getBotResponse(msg);

  // Remove loading indicator
  document.getElementById("loading").remove();

  // Append bot response to chat
  allMsgCont.innerHTML += `<div class="bot-first-question">
      <span class="bot-conv-container">
        <div class="bot-pic">
          <i class="fa fa-robot"></i>
        </div>
        <span class="botMsg message">
          ${botResponse}
        </span>
      </span>
      <small id="time">${new Date().toLocaleTimeString()}</small>
    </div>`;
});

// Function to fetch response from the new API
async function getBotResponse(userMessage) {
  const API_URL = `https://api.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(userMessage)}`;

  try {
    let response = await fetch(API_URL);
    let data = await response.json();
    return data.result || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

// Allow sending message by pressing Enter
document.getElementById("val").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
var socket = io.connect("http://localhost:5000");

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var sendButton = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

sendButton.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
  message.focus();
});

message.addEventListener("keypress", function() {
  socket.emit("typing", handle.value);
});

socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML += `
    <p>
      <strong>${data.handle}:</strong> ${data.message}
    </p>
  `;
});

socket.on("typing", function(data) {
  console.log(data);
  feedback.innerHTML = `
    <p><em>${data} is typing a message ...</em></p>
  `;
});

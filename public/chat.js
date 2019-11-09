var socket = io.connect("http://localhost:5000");

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var sendButton = document.getElementById("send");
var output = document.getElementById("output");

sendButton.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

socket.on("chat", function(data) {
  output.innerHTML += `
    <p>
      <strong>${data.handle}:</strong> ${data.message}
    </p>
  `;
});

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("linkedin-link");
  var texts = ["Muhammad Salman Hussain", "View Profile"];
  var index = 0;
  var typingIndex = 0;
  var typingSpeed = 70; // Speed of typing effect
  var delay = 1500; // Delay between text changes
  function typeText(text) {
    if (!link) return;
    link.textContent = "";
    typingIndex = 0;
    var interval = setInterval(function () {
      if (link) {
        link.textContent += text[typingIndex];
        typingIndex++;
        if (typingIndex >= text.length) {
          clearInterval(interval);
          setTimeout(function () {
            deleteText();
          }, delay);
        }
      }
    }, typingSpeed);
  }
  function deleteText() {
    var interval = setInterval(function () {
      if (link && link.textContent) {
        link.textContent = link.textContent.slice(0, -1);
        if (link.textContent === "") {
          clearInterval(interval);
          changeText();
        }
      }
    }, typingSpeed);
  }
  function changeText() {
    index = (index + 1) % texts.length;
    typeText(texts[index]);
  }
  if (link) {
    typeText(texts[index]);
  }
});

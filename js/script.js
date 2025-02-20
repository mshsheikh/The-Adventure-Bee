const character = document.getElementById("character");
const raccoon = document.getElementById("raccoon");
const eagle = document.getElementById("eagle");
const gameOver = document.getElementById("game-over");
const yourScoreElement = document.getElementById("your-score");
const highScoreElement = document.getElementById("high-score");
const lifeBar = document.getElementById("life-bar");

// Retrieve the player's name from localStorage
const playerName = localStorage.getItem("playerName");

// Display the player's name in the score container
document.getElementById("player-name").textContent = `Player: ${playerName}`;

let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;
let characterLeft = 0;
let yourScore = 0;
let highScore = 0;
let isCollision = false;
let isEagleCollision = false;
let life = 100; // Initial life value
let raccoonSpeedIncrement = 6; // Initial raccoon speed (in seconds)

// Bee's initial position:
const screenWidth = document.documentElement.clientWidth;
const characterWidth = character.offsetWidth;
characterLeft = screenWidth * (3 / 10) - characterWidth / 2; // Bee's position
character.style.left = `${characterLeft}px`;

// Function to start the game and make the eagle appear after 10 seconds
function startGame() {
  setTimeout(() => {
    // Code to make the eagle appear after 10 seconds
    eagle.style.right = "0"; // Position the eagle on the screen
    eagle.style.animationPlayState = "running"; // Start the eagle animation
  }, 10000); // 10 seconds delay (10000 milliseconds)

  // Start moving the character
  moveCharacter();
}

// Event listeners for character movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && !isJumping) {
    isJumping = true;
    character.style.bottom = "260px"; // Bee's jump height (200px)
    setTimeout(() => {
      character.style.bottom = "0";
      isJumping = false;
    }, 500); // Bee's jump duration (500ms)
  } else if (event.key === "ArrowLeft") {
    isMovingLeft = true;
  } else if (event.key === "ArrowRight") {
    isMovingRight = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    isMovingLeft = false;
  } else if (event.key === "ArrowRight") {
    isMovingRight = false;
  }
});

function updateScore() {
  yourScore++;
  yourScoreElement.textContent = `Score: ${yourScore}`;
  if (yourScore % 1000 === 0) {
    applyRainbowEffect(); // Apply the rainbow effect when score reaches a new multiple of 1000
    increaseRaccoonSpeed(); // Increase raccoon speed by 0.5 seconds
  }
}

// Function to apply rainbow wave effect to the score
function applyRainbowEffect() {
  yourScoreElement.classList.add("rainbow-wave");
  setTimeout(() => {
    yourScoreElement.classList.remove("rainbow-wave");
  }, 2000);
}

// Function to increase raccoon speed
function increaseRaccoonSpeed() {
  raccoonSpeedIncrement -= 0.5;
  raccoon.style.animationDuration = `${raccoonSpeedIncrement}s`;
}

// Function to move the character and handle collisions
function moveCharacter() {
  if (isMovingLeft) {
    characterLeft -= 6; // Movement speed
  } else if (isMovingRight) {
    characterLeft += 6; // Movement speed
  }

  if (characterLeft < 0) {
    characterLeft = 0;
  } else if (characterLeft > screenWidth - characterWidth) {
    characterLeft = screenWidth - characterWidth;
  }

  character.style.left = `${characterLeft}px`;

  // Collision detection with raccoon
  const characterRect = character.getBoundingClientRect();
  const raccoonRect = raccoon.getBoundingClientRect();

  if (
    characterRect.right >= raccoonRect.left &&
    characterRect.left <= raccoonRect.right &&
    characterRect.bottom >= raccoonRect.top &&
    characterRect.top <= raccoonRect.bottom
  ) {
    handleCollision();
  } else {
    if (isCollision) {
      resumeGame();
    } else {
      updateScore();
    }
  }

  // Collision detection with eagle
  const eagleRect = eagle.getBoundingClientRect();

  if (
    characterRect.right >= eagleRect.left &&
    characterRect.left <= eagleRect.right &&
    characterRect.bottom >= eagleRect.top &&
    characterRect.top <= eagleRect.bottom
  ) {
    handleEagleCollision();
  } else {
    if (isEagleCollision) {
      resumeEagleGame();
    }
  }

  requestAnimationFrame(moveCharacter);
}

// Function to handle collision with raccoon
function handleCollision() {
  if (!isCollision) {
    raccoon.style.animationPlayState = "paused"; // Stop raccoon animation
    character.src = "img/sadBee.png"; // Change the character to sadBee image
    isCollision = true; // Update collision state
    decreaseLife(); // Decrease life by 33%
    console.log(
      "Collision occurred with raccoon! Showing Game Over message and changing bee to sadBee."
    );
  }
}

// Function to handle collision with eagle
function handleEagleCollision() {
  if (!isEagleCollision) {
    eagle.style.animationPlayState = "paused"; // Stop eagle animation
    character.src = "img/sadBee.png"; // Change the character to sadBee image
    isEagleCollision = true; // Update eagle collision state
    decreaseLife(); // Decrease life by 33%
    console.log(
      "Collision occurred with eagle! Showing Game Over message and changing bee to sadBee."
    );
  }
}

// Function to decrease life
function decreaseLife() {
  if (life > 0) {
    life -= 34;
    if (life <= 0) {
      life = 0;
      lifeBar.style.width = `${life}%`;
      showAlert(); // Show game over alert
    } else {
      lifeBar.style.width = `${life}%`;
    }
  }
}

// Function to show alert with SweetAlert and separate lines for score and restart/cancel message
function showAlert() {
  // Developer image for the popup
  const beeImage = "img/msh.png"; // Replace with your actual image path

  Swal.fire({
    title: "Game Over!",
    html: `
      ${playerName}, your score is <strong>${yourScore}</strong><br>
      <div class="social-container">
          Want to connect with me?<br>
          <strong>Follow me here:</strong><br>
          <div class="social-buttons">
              <a href="https://www.linkedin.com/in/mshsheikh" target="_blank">
                  <img src="logo/linkedin.png" alt="LinkedIn" class="social-icon" />
              </a>
              <a href="https://www.youtube.com/@SalmanSheikhOfficial" target="_blank">
                  <img src="logo/youtube.png" alt="YouTube" class="yt-icon" />
              </a>
              <a href="https://discord.com/channels/790484092772548613/928269010070548500" target="_blank">
                  <img src="logo/discord.png" alt="Discord" class="discord-icon" />
              </a>
              <a href="https://github.com/mshsheikh" target="_blank">
                  <img src="logo/github.png" alt="GitHub" class="social-icon" />
              </a>
          </div>
          <br>Do you want to restart?
      </div>
      `,
    color: "white",
    imageUrl: beeImage,
    imageWidth: 150, // Adjust the image size
    imageHeight: 150, // Adjust the image size
    imageClass: 'custom-image', // Add a custom class to style the image
    showCancelButton: true,
    confirmButtonText: "Restart",
    customClass: {
      popup: "custom-alert-popup",
      title: "custom-alert-title",
      content: "custom-alert-content",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
      title: "custom-game-over-title",
    },
    background: "rgba(0, 0, 0, 0)",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload(); // Refresh the page on Restart
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "index.html"; // Redirect to play.html on Cancel
    }
  });
}

// Custom styles for the SweetAlert
const styles = document.createElement("style");
styles.innerHTML = `
.custom-alert-popup {
    font-family: 'Comic Neue', sans-serif !important;
    background: rgba(0, 0, 0, 0) !important;
    font-size: 24px !important; /* Increase popup font size */
}
.custom-alert-title {
    font-family: 'Comic Neue', sans-serif !important;
    font-size: 36px !important; /* Increase title font size */
}
.custom-alert-content {
    font-family: 'Comic Neue', sans-serif !important;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-size: 24px !important; /* Increase content font size */
}
.custom-game-over-title {
    font-size: 40px !important;
}
.custom-confirm-button {
    border: 2px solid white !important;
    color: white !important;
    background-color: darkgreen !important;
    margin-top: -20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
    font-family: 'Comic Neue', sans-serif !important;
    font-size: 22px !important; /* Increase button font size */
}
.custom-cancel-button {
    border: 2px solid white !important;
    color: white !important;
    background-color: red !important;
    margin-top: -20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
    font-family: 'Comic Neue', sans-serif !important;
    font-size: 22px !important; /* Increase button font size */
}
`;
document.head.appendChild(styles);

// Restart the game
function restartGame() {
  // Reset game state
  yourScore = 0;
  yourScoreElement.textContent = `Your Score: ${yourScore}`;
  isCollision = false;
  isEagleCollision = false;
  character.src = "anim/bee.gif"; // Change the character back to bee image
  raccoon.style.animationPlayState = "running"; // Resume raccoon animation
  eagle.style.animationPlayState = "running"; // Resume eagle animation
  gameOver.classList.add("hidden"); // Hide the "Game Over" message
}

// Resume the game after collision with raccoon
function resumeGame() {
  raccoon.style.animationPlayState = "running";
  gameOver.classList.add("hidden"); // Hide the "Game Over" message
  character.src = `anim/bee.gif?${new Date().getTime()}`; // Change the character back to bee image with a unique query string
  isCollision = false; // Update collision state
  console.log("No collision with raccoon."); // Resume raccoon animation
}

// Resume the game after collision with eagle
function resumeEagleGame() {
  eagle.style.animationPlayState = "running";
  gameOver.classList.add("hidden"); // Hide the "Game Over" message
  character.src = `anim/bee.gif?${new Date().getTime()}`; // Change the character back to bee image with a 'unique query' string
  isEagleCollision = false; // Update eagle collision state
  console.log("No collision with eagle."); // Resume eagle animation
}

// Get a random animation for the eagle
function getRandomAnimation() {
  const animations = [
    "moveEagle1",
    "moveEagle2",
    "moveEagle3",
    "moveEagle4",
    "moveEagle5",
    "moveEagle6",
    "moveEagle7",
    "moveEagle8",
    "moveEagle9",
    "moveEagle10",
    "moveEagle11",
    "moveEagle12",
    "moveEagle13",
    "moveEagle14",
    "moveEagle15",
    "moveEagle16",
    "moveEagle17",
    "moveEagle18",
    "moveEagle19",
    "moveEagle20",
    "moveEagle21",
    "moveEagle22",
    "moveEagle23",
    "moveEagle24",
    "moveEagle25",
    // More animation names if created
  ];
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex];
}

// Function to apply a random animation to the eagle
function applyRandomEagleAnimation() {
  const randomAnimation = getRandomAnimation();
  eagle.style.animation = `${randomAnimation} 7s linear infinite`;
}

// Apply random animation initially
applyRandomEagleAnimation();

// Reapply random animation after each iteration (when eagle reappears)
eagle.addEventListener("animationiteration", applyRandomEagleAnimation);

// Start the game by moving the character
moveCharacter();

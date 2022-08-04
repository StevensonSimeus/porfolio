var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var pattern = [];
var level = 0;
var gameStarted = false;

//Keypress events
$(document).on("keypress", function (e) {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

//Button events
$(".btn").on("click", function () {
  var userChosedColor = $(this).attr("id");
  userClickedPattern.push(userChosedColor);
  console.log(userClickedPattern);
  playSound(userChosedColor);
  animateButton(userChosedColor);
  checkAnswer(level);
});

function nextSequence() {
  level++;

  var randNum = Math.floor(Math.random() * 4);
  var ranCol = buttonColours[randNum];
  pattern.push(ranCol);

  $("#level-title").text("Level " + level);
  $("#" + ranCol)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(ranCol);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).toggleClass("pressed");
  });
}

function checkAnswer(currentLevel) {
  if (
    userClickedPattern[userClickedPattern.length - 1] ==
    pattern[userClickedPattern.length - 1]
  ) {
    if (currentLevel == userClickedPattern.length) {
      console.log("success");

      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 200);
    $("#level-title").text("Game over , press any key to restart");
    restartGame();
  }
}

function restartGame() {
  level = 0;
  pattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

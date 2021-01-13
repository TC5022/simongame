var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//To start the game if a key is pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level)
    newSequence();
    started = true;
  }
})

//To detect which button has been clicked by user
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
})

//To create a random sequence of buttons pressed
function newSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}


//Function used to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function used to animate
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed")

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
}

//Checking if user pattern matches game gamePattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        newSequence()
      }, 1000)

    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play();

    $("body").addClass("game-over")

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game Over, press any key to restart.")
    startOver();
  }
}

//To start Over
function startOver(){
  level=0;
  gamePattern=[];
  started= false;
}

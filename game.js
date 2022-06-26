var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false; // Change this to true

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);

    nextSequence();
  }
});


// Detecting when a button is clicked, triggering Handler Function
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Store the id of the button that got clicked
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer()
  // to check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong"

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong
    document.querySelector("body").classList.add("game-over");

    // And then remove it after 200 milliseconds
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

    // Call startOver() if the user gets the sequence wrong
    startOver();
  }
}



function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // Animate button by flash
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}


// When a user clicks on a button, the corresponding sound should be played, function to play the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//  Create a new function called animatePress(), it should take a single input parameter called currentColour
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); // Use jQuery to add the pressed class to the button that gets clicked inside animatePress()

  // Use Javascript to remove the pressed class after a 100 milliseconds
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];

}
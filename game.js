//Creating user clicked pattern
var userClickedPattern = [];

// Creating game pattern array
var gamePattern = [];

// Defining Colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Declaring a var for the level
var level = 0;

//  Function for main game mechanics
function nextSequence() {
// Changing level title
level++;
$("h1").text("Level " + level);

// Getting Random Number
var randomNumber = Math.floor(Math.random() * 4);

// Getting Random Color
var randomChosenColor = buttonColors[randomNumber];

// Adding a new color to the game gamePattern
gamePattern.push(randomChosenColor);

//selecting the button of the color in html and make it flash
$("#" + randomChosenColor).fadeOut(100).fadeIn(100);

//playing sound when it flashes

var sound = new Audio("./sounds/" + randomChosenColor + ".mp3")
sound.play();

}

// Adding pressed color to the user clicked pattern array
$(".btn").click(function(){

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

//Playing sound when color is pressed
  var sound = new Audio("./sounds/" + userChosenColor + ".mp3")
  sound.play();

// chaging style when pressed
  animatePress(userChosenColor);

//Calling function to compare game patterns
  checkAnswer();

});

// changing style when pressed

function animatePress(currentColour) {

    $("." + currentColour).addClass("pressed")

    setTimeout(function() {
        $("." + currentColour).removeClass("pressed")
    }, 100)
}

//Starting the Game

var gameStarted = false;

$(document).keydown(function(){
    if (gameStarted === false) {

      nextSequence();
      gameStarted = "true";
    }
});

//Checking the patterns

function checkAnswer() {
    var count = 0;
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] === gamePattern[i]) {
            count++;
            console.log(count);
        }
        else {
            var wrong = new Audio("sounds/wrong.mp3");
            $("h1").text("Game Over");
            $("body").addClass("game-over")
            setTimeout(function () {
                $("body").removeClass("game-over")
            }, 500);

            startOver(); // calling function to restart the game
        }
    }
    if (count === gamePattern.length) {
        userClickedPattern = []; // It is crucial to set userClickedPattern empty when user sucessfully repeat a game pattern;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    else {
        console.log("not a complete pattern");
    }
}

// Starting again if the answer was wrong

function startOver() {

  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;

}

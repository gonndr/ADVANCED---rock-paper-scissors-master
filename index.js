var plays = ["rock", "paper", "scissors"];
var myPlay;
var housePlay;

if (sessionStorage.getItem("score")===null) {
var score = 0;
sessionStorage.setItem("score", score);
} else {
var score = sessionStorage.getItem("score");
$(".score-board h1").text(score);
}

$(".game-box .token").click(function() {
  // Starts the duel
  console.log(this.id);
  myPlay = this.id;
  $(".game-box").css("display", "none");
  $(".game-duel").css("display", "grid");

  $("#picked").addClass("token-" + this.id);
  $("#picked").children("div").addClass(this.id);

  setTimeout(function() {
    housePlay = housePlays();
    $("#house").removeClass("token-empty");
    $("#house").addClass("token");

    $("#house").addClass("token-" + housePlay);
    $("#house").children("div").addClass("token-bg");
    $("#house").children("div").addClass(housePlay);
  }, 1500);

  //results
  setTimeout(function() {
    let result = playResult(myPlay, housePlay);

    switch (result) {
      case 0:
        score--;
        sessionStorage.setItem("score", score);
        $(".score-board h1").text(score);
        $(".game-result h1").text("YOU LOSE");
        $("#house").before('<div class="token-win"></div>')
        break;
      case 1:
        score++;
        sessionStorage.setItem("score", score);
        $(".score-board h1").text(score);
        $(".game-result h1").text("YOU WIN");
        $("#picked").before('<div class="token-win"></div>')
        break;
      case 2:

        $(".game-result h1").text("DRAW");
        break;
      default:

    }

    $(".game").addClass("game-expanded");
    $(".game-duel").addClass("duel-expanded");
    $(".game-result").css("display", "flex");
  }, 3000);

});

$(".rules-button").click(function() {

  $(".body-idle-rules").css("display", "flex");
});

$(".rules-x").click(function() {

  $(".body-idle-rules").css("display", "none");
});

$(".play-again-button").click(function() {

  resetPlay(myPlay, housePlay);
});

// House turn

function housePlays() {
  return plays[Math.floor(Math.random() * 3)];
}

// Check play result

function playResult(pick, house) {
  if (pick === "rock") {
    if (house === "paper") {
      return 0;
    } else if (house === "scissors") {
      return 1;
    } else {
      return 2;
    }
  }

  if (pick === "paper") {
    if (house === "scissors") {
      return 0;
    } else if (house === "rock") {
      return 1;
    } else {
      return 2;
    }
  }

  if (pick === "scissors") {
    if (house === "rock") {
      return 0;
    } else if (house === "paper") {
      return 1;
    } else {
      return 2;
    }
  }

}

// Clear screen

function resetPlay(playId, housePlay) {
  $(".game-box").css("display", "block");
  $(".game-duel").css("display", "none");

  $("#picked").removeClass("token-" + playId);
  $("#picked").children("div").removeClass(playId);

  $("#house").addClass("token-empty");
  $("#house").removeClass("token");

  $("#house").removeClass("token-" + housePlay);
  $("#house").children("div").removeClass("token-bg");
  $("#house").children("div").removeClass(housePlay);

  $(".game").removeClass("game-expanded");
  $(".game-duel").removeClass("duel-expanded");
  $(".game-result").css("display", "none");
  $(".token-win").remove();
}

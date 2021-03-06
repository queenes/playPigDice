var player1 = "";
var player2 = "";


var throwdice = function() {
  return Math.floor(6 * Math.random()) + 1;
}

function Player(turn) {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.turn = turn;
  this.playerName;
}

// checking for a winner and if the dice roll is 1
Player.prototype.diceOne = function() {
  if (this.roll === 1) {
    this.tempscore = 0;
    alert("OOPS! " + this.playerName + ",  your dice rolled to 1! Your turn is over!")
  } else {
    this.tempscore += this.roll;
  }
}

// hold
Player.prototype.hold = function() {
  this.totalscore += this.tempscore;
  this.tempscore = 0;
  alert(this.playerName + ", Your turn is over!Next");
}

// check for 100
Player.prototype.checkWinner = function() {
  if (this.totalscore >= 100) {
    alert(this.playerName + " You are the winner!");
  }
}

Player.prototype.newGame = function() {
  this.roll = 0;
  this.tempscore = 0;
  this.totalscore = 0;
  this.playerName = "";
}

var resetFields = function() {
  $(".player1").val("");
  $(".player2").val("");
}

// User Interface
$(document).ready(function() {
  $("button#start").click(function(event) {
    player1 = new Player(true);
    player2 = new Player(false);
    $(".display").show();
    $(".names").hide();

  });
  $("form#player").submit(function(event) {
    event.preventDefault();
    var player1Name = $("input.player1").val();
    console.log(player1Name);
    $("#player1").text(player1Name);

    var player2Name = $(".player2").val();
    $("#player2").text(player2Name);

    player1.playerName = player1Name;
    player2.playerName = player2Name;
  });

  $("button#new-game").click(function(event) {
    $(".display").hide();
    clearValues();
    player1.newGame();
    player2.newGame();
    $("#round-total-1").empty();
    $("#total-score-1").empty();
    $("#die-roll-1").empty();
    $("#round-total-2").empty();
    $("#total-score-2").empty();
    $("#die-roll-2").empty();

    $(".names").show();
  });

  $("button#player1-roll").click(function(event) {
    player1.roll = throwdice();
    $("#die-roll-1").text(player1.roll);
    player1.diceOne();
    $("#round-total-1").text(player1.tempscore);
  });

  $("button#player2-roll").click(function(event) {
    player2.roll = throwdice();
    $("#die-roll-2").text(player2.roll);
    player2.diceOne();
    $("#round-total-2").text(player2.tempscore);
  });

  $("button#player1-hold").click(function(event) {
    player1.hold();
    $("#total-score-1").text(player1.totalscore);
    $("#round-total-1").empty();
    $("#die-roll-1").empty();
    player1.winnerCheck();
  });

  $("button#player2-hold").click(function(event) {
    player2.hold();
    $("#total-score-2").text(player2.totalscore);
    $("#round-total-2").empty();
    $("#die-roll-2").empty();
    player2.winnerCheck();
  });


});

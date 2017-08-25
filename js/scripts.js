function Game() {
  this.roll=0;
  this.subtotal= 0;
  this.bank = 0;
  this.strikes = 0
}
var UIgame = new Game ()

Game.prototype.diceRoll = function () {
  rollValue = Math.ceil((Math.random()*15));
  this.roll = rollValue;
  this.addToSubTotal();
}

Game.prototype.addToSubTotal = function () {
    if (this.roll % 4 === 0) {
    this.subtotal = 0;
    this.strikes += 1
  }
  else {
    this.subtotal += this.roll;
    this.strikes = 0;
  }
  if (this.strikes === 3) {
    UIgame.bank = 0;
    UIgame.strikes = 0;
    debugger;
  }
}

Game.prototype.bankedTotal = function () {

  this.bank += this.subtotal;
  this.subtotal = 0;

  if (this.bank >= 100) {
    alert('You won!')
  }
}

$(document).ready(function(){
  $('#roll').click(function(){
    UIgame.diceRoll();
    $('.rollNumber').text(UIgame.roll);
    $('.subtotal').text(UIgame.subtotal);
    $('.strike').text(UIgame.strikes);
    $('.bank').text(UIgame.bank);
  })
  $('#keep').click(function(){
    UIgame.bankedTotal();
    $('.bank').text(UIgame.bank);
  });
});

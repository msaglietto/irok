var Scoreboard = function(game) {
  Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, startText;

  var style = {
    font: '65px Arial',
    fill: '#fff',
    align: 'center'
  };

  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  bmd.ctx.fillRect(0, 0, this.game.width, this.game.height);

  background = this.game.add.sprite(0, 0, bmd);
  background.alpha = 0.5;

  this.add(background);

  var isNewHighScore = false;
  var highscore = localStorage.getItem('highscore');
  if (!highscore || highscore < score) {
    isNewHighScore = true;
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }

  this.y = this.game.height;

  gameoverText = this.game.add.text(0, 100, 'If life give you toilets... dodge them.', style);
  gameoverText.x = this.game.width / 2 - (gameoverText.width / 2);
  this.add(gameoverText);

  style.font = '32px Arial';
  scoreText = this.game.add.text(0, 200, 'Your Score: ' + score, style);
  scoreText.x = this.game.width / 2 - (scoreText.width / 2);
  this.add(scoreText);

  style.font = '32px Arial';
  highScoreText = this.game.add.text(0, 250, 'Your High Score: ' + highscore, style);
  highScoreText.x = this.game.width / 2 - (highScoreText.width / 2);
  this.add(highScoreText);

  style.font = '24px Arial';
  startText = this.game.add.text(0, 300, 'Tap to play again!', style);
  startText.x = this.game.width / 2 - (startText.width / 2);
  this.add(startText);

  if (isNewHighScore) {
    style.font = '12px Arial';
    newHighScoreText = this.game.add.text(0, 100, 'New High Score!', style);
    newHighScoreText.tint = 0x4ebef7; // '#4ebef7'
    newHighScoreText.x = gameoverText.x + gameoverText.width + 40;
    newHighScoreText.angle = 45;
    this.add(newHighScoreText);
  }

  this.game.add.tween(this).to({
    y: 0
  }, 1000, Phaser.Easing.Bounce.Out, true);

  this.game.input.onDown.addOnce(this.restart, this);

};

Scoreboard.prototype.restart = function() {
  this.game.state.start('Game', true, false);
};

module.exports = Scoreboard;
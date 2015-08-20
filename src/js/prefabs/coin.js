var Coin = function(game, x, y, key, frame) {
  key = 'coin';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.1);
  this.anchor.setTo(0.1);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;

  this.events.onRevived.add(this.onRevived, this);
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.onRevived = function() {
  this.body.velocity.x = -400;
};

module.exports = Coin;
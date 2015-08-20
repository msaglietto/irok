var Toilet = function(game, x, y, key, frame) {
  key = 'toilet';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(0.5);
  this.anchor.setTo(0.5);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;

  this.checkWorldBounds = true;
  this.onOutOfBoundsKill = true;
  
  this.events.onRevived.add(this.onRevived, this);
};

Toilet.prototype = Object.create(Phaser.Sprite.prototype);
Toilet.prototype.constructor = Toilet;

Toilet.prototype.onRevived = function() {
  this.body.velocity.x = -400;
  this.body.velocity.y = this.game.rnd.integerInRange(-800, -400);
};

module.exports = Toilet;
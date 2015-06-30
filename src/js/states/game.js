var Player = require('../entities/player');

var Game = function() {};

module.exports = Game;

Game.prototype = {

  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 425, 'background');
    this.background.autoScroll(-50, 0);

    this.sidewalk = this.game.add.tileSprite(0, 425, this.game.width, this.game.height - 457, 'sidewalk');
    this.sidewalk.autoScroll(-100, 0);

    this.foreground = this.game.add.tileSprite(0, this.game.height - 32, this.game.width, 0, 'foreground');
    this.foreground.autoScroll(-200, 0);

    this.player = this.add.sprite(200, this.game.height / 2, 'irok');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(3);

    this.player.animations.add('walk', [5, 6, 7, 8]);
    this.player.animations.add('back', [0, 1, 2, 3]);
    this.player.animations.play('walk', 8, true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 400;

    this.game.physics.arcade.enableBody(this.background);
    this.background.body.allowGravity = false;
    this.background.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    this.player.body.allowGravity = false;
    this.player.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //Not working .. Fixed on dev https://github.com/photonstorm/phaser/issues/1704
    this.game.physics.arcade.collide(this.player, this.background);
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('back', 8, true);
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('walk', 8, true);
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150;
      this.player.animations.play('walk', 8, true);
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150;
      this.player.animations.play('walk', 8, true);
    } else {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.play('walk', 8, true);
    }
  },

  shutdown: function() {},
};

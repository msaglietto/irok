var Toilet = require('../prefabs/toilet');
var Coin = require('../prefabs/coin');
var Scoreboard = require('../prefabs/scoreboard');

var Game = function() {
  this.initVars();
};

module.exports = Game;

Game.prototype = {

  initVars: function() {
    this.score = 0;
    this.hits = 0;

    this.toiletRate = 1000;
    this.toiletTimer = 0;

    this.coinRate = 2000;
    this.coinTimer = 50;
  },

  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 425, 'background');
    this.background.autoScroll(-25, 0);

    this.sidewalk = this.game.add.tileSprite(0, 425, this.game.width, this.game.height - 457, 'sidewalk');
    this.sidewalk.autoScroll(-50, 0);

    this.foreground = this.game.add.tileSprite(0, this.game.height - 32, this.game.width, 0, 'foreground');
    this.foreground.autoScroll(-100, 0);

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

    this.toilets = this.game.add.group();
    this.coins = this.game.add.group();

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.createTitles();
  },

  update: function() {
    var MOVE_VELOCITY = 180;
    this.game.physics.arcade.collide(this.player, this.background);
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -MOVE_VELOCITY;
      this.player.animations.play('back', 8, true);
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = MOVE_VELOCITY;
      this.player.animations.play('walk', 8, true);
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -MOVE_VELOCITY;
      this.player.animations.play('walk', 8, true);
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = MOVE_VELOCITY;
      this.player.animations.play('walk', 8, true);
    } else {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.play('walk', 8, true);
    }

    if (this.toiletTimer < this.game.time.now) {
      this.createToilet();
      this.toiletTimer = this.game.time.now + this.toiletRate;
    }
    if (this.coinTimer < this.game.time.now) {
      this.createCoin();
      this.coinTimer = this.game.time.now + this.coinRate;
    }

    this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.toilets, this.toiletHit, null, this);
  },

  shutdown: function() {
    this.coins.destroy();
    this.toilets.destroy();

    this.initVars();
  },
  createTitles: function() {
    var style = {
      font: '20px Arial',
      fill: '#000',
      align: 'center'
    };
    this.scoreText = this.add.text(10, 10, 'Billetera: 0', style);
  },
  createToilet: function() {
    var x = this.game.width,
      y = this.game.rnd.integerInRange(50, this.game.world.height - 192),
      toilet = this.toilets.getFirstExists(false);

    if (!toilet) {
      toilet = new Toilet(this.game, 0, 0);
      this.toilets.add(toilet);
    }

    toilet.reset(x, y);
    toilet.revive();
  },
  toiletHit: function(player, toilet) {
    var scoreboard;

    this.hits += 1;
    toilet.kill();

    if (this.hits === 3) {
      player.kill();

      this.background.stopScroll();
      this.sidewalk.stopScroll();
      this.foreground.stopScroll();

      this.toiletRate = Number.MAX_VALUE;
      this.coinRate = Number.MAX_VALUE;

      scoreboard = new Scoreboard(this.game);
      scoreboard.show(this.score);
    }
  },
  createCoin: function() {
    var x = this.game.width,
      y = this.game.rnd.integerInRange(470, this.game.height - 10),
      coin = this.toilets.getFirstExists(false);

    if (!coin) {
      coin = new Coin(this.game, 0, 0);
      this.coins.add(coin);
    }

    coin.reset(x, y);
    coin.revive();
  },
  coinHit: function(player, coin) {
    this.score += 0.1;
    coin.kill();
    this.scoreText.text = 'Billetera: ' + this.score;
  }
};
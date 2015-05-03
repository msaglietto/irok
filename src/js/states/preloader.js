'use stric';

var Preloader = function(){
  this.ready = false;
};

Preloader.prototype = {

  preload: function() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.3);

    this.preload = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 350, 'preloader');
    this.preload.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preload);

    this.load.image('background', 'assets/cityBackground.png');
    this.load.image('sidewalk', 'assets/sidewalk.png');
    this.load.image('foreground', 'assets/foreground.png');

    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    //this.load.audio('gameMusic', ['assets/audio/music.mp3', 'assets/audio/music.ogg']);
    //this.load.audio('jump', 'assets/audio/jump.wav');

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },

  create: function() {
    this.preload.cropEnabled = false;
  },

  update: function() {
    //if(this.cache.isSoundDecoded('gameMusic') && this.ready) {
    if (this.ready) {
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preloader;

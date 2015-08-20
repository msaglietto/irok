'use stric';

var Boot = _.noop;

Boot.prototype = {

  preload: function() {
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloader', 'assets/images/preloader.gif');
  },

  create: function() {
    this.game.stage.bckgraoundColor = '#fff';
    this.game.input.maxPointers = 1;

    if (this.game.device.desktop) {
      this.game.stage.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth = 480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 2048;
      this.game.scale.maxHeight = 1536;
      this.game.scale.forceLandscape = true;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

    this.game.state.start('Preloader');
  }
};

module.exports = Boot;

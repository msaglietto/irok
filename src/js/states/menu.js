'use stric';

var Menu = function() {
  this.text = null;
};


Menu.prototype = {

  create: function() {
    var style = {
      font: '65px Arial',
      fill: '#000',
      align: 'center'
    };

    this.background = this.game.add.tileSprite(0, 0, this.game.width, 425, 'background');
    this.background.autoScroll(-50, 0);

    this.sidewalk = this.game.add.tileSprite(0, 425, this.game.width, this.game.height - 457, 'sidewalk');
    this.sidewalk.autoScroll(-100, 0);

    this.foreground = this.game.add.tileSprite(0, this.game.height - 32, this.game.width, 0, 'foreground');
    this.foreground.autoScroll(-200, 0);

    this.text = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Press to Start', style);
    this.text.anchor.setTo(0.5);

    this.input.onDown.add(this.onDown, this);
  },

  update: function() {},

  onDown: function() {
    this.game.state.start('Game');
  }
};

module.exports = Menu;

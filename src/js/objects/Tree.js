import GameSprite from './GameSprite'

export default class Tree extends GameSprite {
  constructor (game, group) {
    super(game, 0, 0, 'junglesheet', 'tree-funky', group)

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.body.setSize(this.width/2, this.height, this.width/4, 0);
    this.anchor.x = 0.5;

    this.hits = 3;
  }

  setPos(lowerX, lowerY) {
    this.reset(lowerX - this.width, lowerY - this.height);
  }

  hit () {
    this.hits --;
    if (this.hits < 0)
      this.kill();
  }

}

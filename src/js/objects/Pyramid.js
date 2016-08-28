import GameSprite from './GameSprite'

export default class Pyramid extends GameSprite {
  constructor (game, x, y, group) {
    super(game, x, y, 'junglesheet', 'cave', group)

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0;
    this.body.collideWorldBounds = true;
    this.body.setSize(this.width, this.height);
    this.body.immovable = true
    this.body.allowGravity = false
    this.anchor.y = 1
    this.y = this.game.height - 32
  }


}

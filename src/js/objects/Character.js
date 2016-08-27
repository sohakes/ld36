import GameSprite from './GameSprite'

export default class Character extends GameSprite {
  constructor (game, x, y, key, frame, group) {
    super(game, x, y, key, frame, group)

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.collideWorldBounds = true;
    this.body.gravity.y = 1000;
    this.body.maxVelocity.y = 500;
    this.body.setSize(20, 32, 5, 16);

  }


}

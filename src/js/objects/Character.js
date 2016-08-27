import GameSprite from './GameSprite'

export default class Character extends GameSprite {
  constructor (game, x, y, key, frame, group) {
    super(game, x, y, key, frame, group)

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

  }


}

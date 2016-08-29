import GameSprite from './GameSprite'

export default class Pyramid extends GameSprite {
  constructor (game, x, y, group, maingame) {
    super(game, x, y, 'junglesheet', 'cave', group)

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0;
    this.body.collideWorldBounds = true;
    this.body.setSize(this.width, this.height, 0, 15);
    this.body.immovable = true
    this.body.allowGravity = false
    this.anchor.y = 1
    this.y = this.game.height - 32

    this.maingame = maingame;
  }

  hit () {
    this.maingame.lives --;
    this.maingame.lifeBar.removeLife();
  }

}

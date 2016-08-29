import GameSprite from './GameSprite'

export default class Meteor extends GameSprite {
  constructor (game, arrX, arrY, group) {
    super(game, 0, 0, 'junglesheet', 'boulder', group)
    this.game = game;

    var x = arrX - 300;
    var y = - this.height;

    this.reset(x, y);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.x = 400;
    this.body.velocity.y = 1000;
    this.body.bounce.y = 0.2;

    // these were all magic numbers, can probably be improved.
  }

  enemyHit (enemy) {
    enemy.damage(999);
  }

  makeKillable () {
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

}

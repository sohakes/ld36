import GameSprite from './GameSprite'
import Arrow from './Arrow'

export default class Bow extends GameSprite {
  constructor (game, arrowGroup, player, powersManager) {
    super(game, 0, 0, 'pre-bow')

    this.player = player

    this.powersManager = powersManager

    this.game = game

    this.arrowGroup = arrowGroup

    this.bowTime = 0;

    this.anchor.setTo(0, 0.5);

    this.ARROW_SPEED = 600;
    this.MAX_TIME = 1000;

  }

  shootArrow() {
    let arrow = this.arrow;
    this.arrow = null;
    let speed = this.ARROW_SPEED;
    let rate = (this.bowTime > this.MAX_TIME) ? 1 : this.bowTime / this.MAX_TIME;
    this.bowTime = 0;

    if (rate < 0.5) {
      return;
    }
    arrow.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.checkWorldBounds = true;
    arrow.outOfBoundsKill = true;

    speed *= rate;

    console.log(speed)

    arrow.body.velocity.x = Math.cos(arrow.rotation) * speed;
    arrow.body.velocity.y = Math.sin(arrow.rotation) * speed;

    this.arrowGroup.add(arrow);
  }

  updateIndependent() {
    if (this.game.input.activePointer.duration != -1) {
      this.bowTime = this.game.input.activePointer.duration;

      if (! this.alive) {
        this.revive();
        this.anchor.setTo(0, 0.5);
      }

      this.reset(
        (this.player.left + this.player.right) / 2,
        this.player.y + this.player.height*3/4
      );

      if (this.bowTime < this.MAX_TIME / 2) {
        this.rotation = Math.PI/2;
      } else {
        if (! this.arrow) {
          this.anchor.setTo(-0.5, 0.5);
          this.arrow = new Arrow(this.game);
          this.arrow.anchor.setTo(-0.23, 0.5);
        }
        this.rotation = this.game.physics.arcade.angleToPointer(this.player);
        this.arrow.reset(this.x, this.y);
        this.arrow.rotation = this.rotation;
        if (this.arrow.power === -1 && this.powersManager.currentPower !== -1) {
          this.arrow.enchant(this.powersManager.popPower())
        }
      }

    } else if (this.bowTime) {
      this.shootArrow();
      this.kill();
    }
  }

}

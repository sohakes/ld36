import GameSprite from './GameSprite'
import Tree from './Tree'
import Meteor from './Meteor'

export default class Arrow extends GameSprite {
  constructor (game, group, obstacleGroup, meteorGroup) {
    super(game, 0, 0, 'pre-arrow', null, group)
    this.power = -1
    this.baseDmg = 100;
    this.game = game;
    this.obstacleGroup = obstacleGroup;
    this.meteorGroup = meteorGroup;
  }

  getDamage () {
    return this.baseDmg
  }

  enchant (power) {
    this.power = power
    if (power == 0) {
      this.tint = 0x9093FF
      this.baseDmg = 200
    } else if (power == 1) {
      this.tint = 0xACFFA2
    } else if (power == 2) {
      this.tint = 0xFF7575
    } else if (power == 3) {
      this.tint = 0x4D1717
    }
  }

  createTree(x, y, centered) {
    var tree = new Tree(this.game, this.obstacleGroup);
    console.log(tree);
    tree.setPos(x, y, centered);
  }

  createMeteor(x, y) {
    new Meteor(this.game, x, y, this.meteorGroup);
  }

  enemyHit (enemy) {
    if (this.power == 1) {
      console.log(enemy);
      this.createTree(
          enemy.body.x + enemy.body.width,
          enemy.body.y + enemy.body.height,
          false
      );
      enemy.pushBack();
    } else if (this.power == 3) {
      this.createMeteor(this.x, this.y);
    }

    enemy.damage(this.getDamage());

    if (this.power != 0) {
     this.kill();
    }
  }

  groundHit (ground) {
    if (this.power == 1) {
      this.createTree(this.body.right, this.body.bottom, true);
    } else if (this.power == 3) {
      this.createMeteor(this.body.right, this.body.bottom);
    }
    this.kill();
  }

  updateRotation () {
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
  }
}

import GameSprite from './GameSprite'
import Tree from './Tree'

export default class Arrow extends GameSprite {
  constructor (game, group) {
    super(game, 0, 0, 'pre-arrow', null, group)
    this.power = -1
    this.baseDmg = 100;
    this.game = game;
  }

  getDamage () {
    return this.baseDmg
  }

  enchant (power) {
    this.power = power
    if (power == 0) {
      this.tint = 0x766CFF
    } else if (power == 1) {
      this.tint = 0xACFFA2
    } else if (power == 2) {
      this.tint = 0xFF7575
    } else if (power == 3) {
      this.tint = 0x4D1717
    }
  }

  createTree(x, y, treeGroup) {
    var tree = new Tree(this.game, treeGroup);
    console.log(tree);
    tree.setPos(x, y);
  }

  enemyHit (enemy, treeGroup) {
    if (this.power == 1) {
      console.log(enemy);
      this.createTree(
          enemy.body.x + enemy.body.width,
          enemy.body.y + enemy.body.height,
          treeGroup);
      enemy.pushBack();
    } else {
      enemy.damage(this.getDamage());
    }

    if (this.power != 0) {
     this.kill();
    }
  }

}

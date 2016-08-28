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
    if (this.power == -1) {
      return this.baseDmg;
    }
    if (this.power == 0) {
      return this.baseDmg * 0.1;
    }
  }

  enchant (power) {
    this.power = power
  }

  createTree(x, y, treeGroup) {
    var tree = new Tree(this.game, treeGroup);
    console.log(tree);
    tree.setPos(x, y);
  }

  enemyHit (enemy, treeGroup) {
    if (this.power == 1) {
      this.createTree(enemy.x + enemy.width, enemy.y + enemy.height, treeGroup);
      enemy.pushBack();
    } else {
      enemy.damage(this.getDamage());
    }

    if (this.power != 0) {
     this.kill();
    }
  }

}

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

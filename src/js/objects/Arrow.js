import GameSprite from './GameSprite'

export default class Arrow extends GameSprite {
  constructor (game, group) {
    super(game, 0, 0, 'pre-arrow', null, group)
    this.power = -1
    this.baseDmg = 100;
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

  enemyHit (enemy) {
    if (this.power != 0) {
     this.kill();
    }

    enemy.damage(this.getDamage());
  }


}

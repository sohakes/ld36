import GameSprite from './GameSprite'

export default class Arrow extends GameSprite {
  constructor (game, group) {
    super(game, 0, 0, 'pre-arrow', null, group)
    this.power = -1
  }
  
  enchant (power) {
    this.power = power
  }

  enemyHit (enemy, score) {
    if (this.power != 0) {
     this.kill();
    }

    enemy.kill();
    score += 1;
  }


}

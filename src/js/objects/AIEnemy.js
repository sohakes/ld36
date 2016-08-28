import Character from './Character'

export default class AIEnemy extends Character {
  constructor (game, x, y, group) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'dude', null, group)

    this.animations.add('left', [0, 1, 2, 3], 10, true)
    this.animations.add('turn', [4], 20, true)
    this.animations.add('right', [5, 6, 7, 8], 10, true)

    this.gameEnded = false
    this.body.drag.x = 100

    this.game = game;

    this.hp = 100;

  }

  endGame () {
    this.body.acceleration.x = 0
    this.gameEnded = true
  }

  pushBack() {
    this.body.velocity.x = 100
  }


  update () {
    if (!this.gameEnded) {
      this.body.acceleration.x = -109
    }

    if (this.body.velocity.x < -150) {
      this.body.velocity.x  = -150
    }

    if (this.facing != 'left')
    {

        this.facing = 'left'
    }
    if (Math.abs(this.body.acceleration.x) > 1) {
      this.animations.play('left')

    } else {
      this.animations.stop()
      this.frame = 0;
    }
  }

  damage (dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.game.score += 1;
      this.kill();
    }
  }

}

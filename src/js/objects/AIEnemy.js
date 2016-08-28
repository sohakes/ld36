import Character from './Character'

export default class AIEnemy extends Character {
  constructor (game, x, y, group, incScore) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'zombie', null, group)

    this.body.setSize(20, 32, 5, 16);

    this.anchor.setTo(0.5, 0.5)
    this.body.setSize(50, 51);

    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)

    this.gameEnded = false
    this.body.drag.x = 100
    this.scale.x = -1

    this.hp = 100;
    this.incrementScore = incScore
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
      this.animations.play('walk')

    } else {
      this.animations.stop()
      this.frame = 0;
    }
  }

  damage (dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.incrementScore();
      this.kill();
    }
  }

}

import AIEnemy from './AIEnemy'

export default class Dino extends AIEnemy {
  constructor (game, x, y, group, incScore) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'dino', null, group)

    this.body.setSize(20, 32, 5, 16);

    this.anchor.setTo(0.5, 0.5)
    this.body.setSize(110, 80, 20);

    this.animations.add('walk', [6, 7, 8, 9, 10, 11, 12, 13], 10, true)

    this.gameEnded = false
    this.body.drag.x = 100
    this.scale.x = 1

    this.hp = 200;
    this.incrementScore = incScore
    this.increment = 2
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
      this.body.acceleration.x = -139
    }

    if (this.body.velocity.x < -180) {
      this.body.velocity.x  = -180
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

  

}

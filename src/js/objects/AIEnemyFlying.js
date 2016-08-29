import AIEnemy from './AIEnemy'

export default class AIEnemyFlying extends AIEnemy {
  constructor (game, x, y, group, incScore) {
    super(game, x, 100, 'bat', null, group)

    this.anchor.setTo(0.5, 0.5)
    this.body.setSize(45, 30, 5, 25);

    this.animations.add('walk', [0, 1, 2, 3, 4], 10, true)

    this.gameEnded = false
    this.scale.x = -1

    this.hp = 80;
    this.incrementScore = incScore
    this.increment = 1
    this.body.allowGravity = false

    this.accelX = -120
    this.accelY = 60
    this.maxVelX = -160
    this.maxVelY = 90
  }

  endGame () {
    this.body.acceleration.x = 0
    this.body.acceleration.y = 0
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    console.log(this.body)
    this.gameEnded = true
  }

  pushBack() {
    console.log('pushing bat back')
    this.body.velocity.x = 120
    this.body.velocity.y = -60
    console.log(this.body)
  }

  update () {
    if (!this.gameEnded) {
      this.body.acceleration.x = this.accelX
      this.body.acceleration.y = this.accelY
    }

    if (this.body.velocity.x < this.maxVelX) {
      this.body.velocity.x  = this.maxVelX
    }

    if (this.body.velocity.y > this.maxVelY) {
      this.body.velocity.y = this.maxVelY
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

  champion () {
    this.scale.x *= 1.5
    this.scale.y *= 1.5
    this.hp *= 3
    this.accelX /= 2
    this.accelY /= 2
    this.maxVelX /= 2
    this.maxVelY /= 2
    this.increment *= 2
  }

}

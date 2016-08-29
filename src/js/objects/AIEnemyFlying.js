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

    this.accelX = -120
    this.accelY = 30
    this.maxVelX = -160
    this.maxVelY = 45
  }

  endGame () {
    this.body.acceleration.x = 0
    this.body.acceleration.y = 0
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    this.gameEnded = true
  }

  pushBack() {
    this.body.velocity.x = 100
    this.body.velocity.y = -60
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
}

import Character from './Character'

export default class AIEnemy extends Character {
  constructor (game, x, y, key, frame, group, incScore) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, key, frame, group)

    this.gameEnded = false
    this.body.drag.x = 100
    this.scale.x = -1

    this.hp = 100;
    this.incrementScore = incScore
    this.increment = 1
    this.onFire = 0
    this.fireTimer = this.game.time.create(false)
  }

  fireDot () {
    if (this.onFire > 3) {
      this.tint = 0xffffff
      return
    }
    console.log("FIRE!" + this.onFire)
    this.onFire++
    this.damage(50)
    this.fireTimer.add(1000, () => this.fireDot(), this)
    this.fireTimer.start()

  }

  setFire() {

    if (this.onFire > 0) {
      return
    }
    this.tint = 0xfb9db6
    this.fireDot()
  }


  update () {
    if (!this.gameEnded) {
      this.body.acceleration.x = this.accel
    }

    if (this.body.velocity.x < this.maxVel) {
      this.body.velocity.x  = this.maxVel
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
      this.incrementScore(this.increment);
      this.kill();
    }
  }

  champion () {
    this.scale.x *= 1.5
    this.scale.y *= 1.5
    this.hp *= 3
    this.accel /= 2
    this.maxVel /= 2
    this.increment *= 2
  }

}

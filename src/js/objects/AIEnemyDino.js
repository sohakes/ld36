import AIEnemy from './AIEnemy'

export default class Dino extends AIEnemy {
  constructor (game, x, y, group, incScore) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'foe', null, group)

    this.anchor.setTo(0.45, 0.5)
    this.body.setSize(45, 55, 10);

    this.animations.add('walk', [5, 6, 7, 8, 9, 10], 10, true)

    this.gameEnded = false
    this.body.drag.x = 100
    this.scale.x = -1

    this.hp = 200;
    this.incrementScore = incScore
    this.increment = 2
    this.accel = -139
    this.maxVel = -180
  }

  endGame () {
    this.body.acceleration.x = 0
    this.gameEnded = true
  }

  pushBack() {
    this.body.velocity.x = 100
  }

}

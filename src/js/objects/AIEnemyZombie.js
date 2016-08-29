import AIEnemy from './AIEnemy'

export default class AIEnemyZombie extends AIEnemy {
  constructor (game, x, y, group, incScore) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'grasshopper', null, group)

    this.anchor.setTo(0.5, 0.5)
    this.body.setSize(50, 51);

    //this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true)
    this.animations.add('walk', [0, 1, 2], 10, true)

    this.gameEnded = false
    this.body.drag.x = 100
    this.scale.x = -1

    this.hp = 100;
    this.incrementScore = incScore
    this.increment = 1
    this.accel = -109
    this.maxVel = -150
  }

  endGame () {
    this.body.acceleration.x = 0
    this.gameEnded = true
  }

  pushBack() {
    this.body.velocity.x = 100
  }

}

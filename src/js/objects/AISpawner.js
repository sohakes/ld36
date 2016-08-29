import AIEnemyDino from './AIEnemyDino'
import AIEnemyZombie from './AIEnemyZombie'

export default class AISpawner {
  constructor (game, enemyGroup, incScore) {
    this.game = game
    this.enemyGroup = enemyGroup
    this.incScore = incScore;
    this.nextUpdate = 2

    this.timer = this.game.time.create(false)
    this.timer.add(2000, () => this.spawnEnemy(), this)
    this.timer.start()
  }


  getProbFromTime(time) {
    //Hardest difficulty in 2 minutes
    let timeRunning = this.game.time.totalElapsedSeconds()
    if (timeRunning > time) {
      return 0.8
    }

    return 0.2 + this.game.time.totalElapsedSeconds() * 0.6 / time
  }

  getIntervalFromTime() {
    //Hardest difficulty in 5 minutes
    let timeRunning = this.game.time.totalElapsedSeconds()
    if (timeRunning > 120) {
      return 200 + Math.random() * 500 //0.2 to 0.7 second
    }

    //From 0.5 to 2 seconds at mininum, and 1000 to 2.5 seconds at maximum
    return 500 + (120 - timeRunning) * 500 / 120
      + Math.random() * 500 * (120 - timeRunning) / 120
  }

  unlucky() {
    return Math.random() < this.getProbFromTime(300) - 0.2
  }

  spawnEnemyPosition(x, y) {
    console.log(this.getProbFromTime(120))
    let enemy = null
    if (Math.random() < this.getProbFromTime(120)) {
      enemy = new AIEnemyDino(this.game, x, y, this.enemyGroup, this.incScore)
    } else {
      enemy = new AIEnemyZombie(this.game, x, y, this.enemyGroup, this.incScore)
    }
    if (this.unlucky()) {
      enemy.scale.x *= 1.5
      enemy.scale.y *= 1.5
      enemy.hp += 100
    }
  }

  spawnEnemy() {
    if (this.game.gameEnded) {
      return
    }
    this.spawnEnemyPosition(this.game.width, this.game.height - 100)
    let time = this.getIntervalFromTime()
    console.log("time"+ time)
    this.timer.add(time, () => this.spawnEnemy(), this)
    this.timer.start()

  }

}

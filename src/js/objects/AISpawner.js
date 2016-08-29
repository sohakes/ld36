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
      return 0.6
    }

    return 0.2 + this.game.time.totalElapsedSeconds() * 0.6 / time
  }

  getIntervalFromTime() {
    //Hardest difficulty in 5 minutes
    let timeRunning = this.game.time.totalElapsedSeconds()
    if (timeRunning > 180) {
      return 1000 + Math.random() * 500 //0.2 to 0.7 second
    }


    return 1000 + (180 - timeRunning) * 750 / 180
      + Math.random() * 750 * (180 - timeRunning) / 180
  }

  unlucky() {
    return Math.random() < this.getProbFromTime(300) - 0.2
  }

  spawnEnemyPosition(x, y) {
    let enemy = null
    if (Math.random() < this.getProbFromTime(180)) {
      enemy = new AIEnemyDino(this.game, x, y, this.enemyGroup, this.incScore)
    } else {
      enemy = new AIEnemyZombie(this.game, x, y, this.enemyGroup, this.incScore)
    }
    if (this.unlucky()) {
      enemy.scale.x *= 1.5
      enemy.scale.y *= 1.5
      enemy.hp += 100
      enemy.increment++
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

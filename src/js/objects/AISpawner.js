import AIEnemy from './AIEnemy'

export default class AISpawner {
  constructor (game, enemyGroup, incScore) {
    this.game = game
    this.enemyGroup = enemyGroup
    this.incScore = incScore;
  }

  spawnEnemyPosition(x, y) {
    new AIEnemy(this.game, x, y, this.enemyGroup, this.incScore)
  }

  spawnEnemy() {
    this.spawnEnemyPosition(this.game.width, this.game.height - 100, 'dude')
  }

}

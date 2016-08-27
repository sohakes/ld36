import AIEnemy from './AIEnemy'

export default class AISpawner {
  constructor (game, enemyGroup) {
    this.game = game
    this.enemyGroup = enemyGroup
  }

  spawnEnemyPosition(x, y) {
    new AIEnemy(this.game, x, y, this.enemyGroup)
  }

  spawnEnemy() {
    this.spawnEnemyPosition(this.game.width, 40, 'dude')
  }

}

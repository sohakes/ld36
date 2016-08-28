const GAME = require('../../json/game.json')
import Player from '../objects/Player'
import AISpawner from '../objects/AISpawner'
import Pyramid from '../objects/Pyramid'
import AIEnemy from '../objects/AIEnemy'
import Calendar from '../objects/Calendar'

export default class MainGame {
  preload () {
    this.game.stage.backgroundColor = '#000000'
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.game.time.desiredFps = 30;

    this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');

    this.game.physics.arcade.gravity.y = 250;


    this.enemyGroup = this.game.add.group()
    this.AISpawner = new AISpawner(this.game, this.enemyGroup)

    //create timer
    let timer = this.game.time.create(false)

    timer.loop(2000, this.spawnNewEnemy, this)

    timer.start();

    this.playerGroup = this.game.add.group()
    this.player = new Player(this.game, this.playerGroup)

    this.pyramidGroup = this.game.add.group()
    this.pyramid = new Pyramid(this.game, 0, this.game.height - 200, this.pyramidGroup)

    this.lifes = 10

    this.score = 0

    this.scoreText = this.game.add.text(
      this.game.world.width - 600,
      10,
      "score: " + this.score,
      {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.lifesText = this.game.add.text(
      this.game.world.width - 300,
      10,
      "lifes: " + this.lifes,
      {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.gameEnded = false

    this.calendar = new Calendar(this.game, this.game.width, 0)

  }

  spawnNewEnemy() {
    if (this.gameEnded) {
      return
    }
    this.AISpawner.spawnEnemy();
  }


  init (data) {
    this.gameWon = false
    this.data = data

  }


  update () {
    this.game.physics.arcade.collide(this.playerGroup, this.pyramidGroup);
    this.game.physics.arcade.collide(this.pyramidGroup, this.enemyGroup, this.pyramidCollision, null, this);
    if (this.lifes <= 0) {
      this.endGame()
    }
    this.scoreText.setText("score: " + this.score)
  }

  pyramidCollision (pyramid, enemy) {
    enemy.pushBack()
    this.lifes--
    this.lifesText.setText("lifes: " + this.lifes)

  }

  endGame () {
    if (this.gameEnded) {
      return
    }
    this.gameEnded = true
    this.pyramid.destroy()
    this.player.endGame()
    console.log('calling endgame for enemy')
    this.enemyGroup.callAll('endGame')
  }

  render () {

      this.game.debug.text(this.game.time.suggestedFps, 32, 32);

      // game.debug.text(game.time.physicsElapsed, 32, 32);
      // game.debug.body(player);
      // game.debug.bodyInfo(player, 16, 24);

  }

  pause () {

  }

  resume () {

  }
}

const GAME = require('../../json/game.json')
import Player from '../objects/Player'
import AISpawner from '../objects/AISpawner'
import Pyramid from '../objects/Pyramid'

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

    this.player = new Player(this.game)

    this.pyramid = new Pyramid(this.game, 0, this.game.height - 200)

    this.lifes = 10

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

  }

  spawnNewEnemy() {
    this.AISpawner.spawnEnemy();
  }


  init (data) {
    this.gameWon = false
    this.data = data

  }


  update() {
    this.game.physics.arcade.collide(this.player, this.pyramid);
    this.game.physics.arcade.collide(this.pyramid, this.enemyGroup, this.pyramidCollision, null, this);
  }

  pyramidCollision(pyramid, enemy) {
    enemy.pushBack()
    this.lifes--
    this.lifesText.setText("lifes: " + this.lifes)
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

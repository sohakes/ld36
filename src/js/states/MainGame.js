const GAME = require('../../json/game.json')
import Player from '../objects/Player'
import AISpawner from '../objects/AISpawner'
import Pyramid from '../objects/Pyramid'
import AIEnemy from '../objects/AIEnemy'
import Calendar from '../objects/Calendar'
import LifeBar from '../objects/LifeBar'
import PowersManager from '../objects/PowersManager'
import GroundGenerator from '../objects/GroundGenerator'
import Bow from '../objects/Bow'
import Ui from '../ui/Ui'

export default class MainGame {
  preload () {
    this.game.stage.backgroundColor = '#000000'
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.game.time.desiredFps = 30;

    this.bg = this.game.add.tileSprite(0, 0, 1200, 780, 'background');

    this.game.physics.arcade.gravity.y = 250;


    this.enemyGroup = this.game.add.group()
    this.AISpawner = new AISpawner(this.game, this.enemyGroup, (increment) => { this.score += increment })

    //create timer

    this.playerGroup = this.game.add.group()
    this.player = new Player(this.game, this.playerGroup)

    this.obstacleGroup = this.game.add.group()
    this.pyramid = new Pyramid(this.game, 0, this.game.height - 200, this.obstacleGroup, this)

    this.lives = 10

    this.score = 0

    this.arrowGroup = this.game.add.group();

    this.treeGroup = this.game.add.group();
    this.meteorGroup = this.game.add.group();

    this.scoreText = this.game.add.text(
      this.game.world.width - 650,
      28,
      "score: " + this.score,
      {
        font: '30px Macondo',
        fill: '#9d8b4f',
        align: 'center'
      }
    )

    this.gameEnded = false

    this.calendar = new Calendar(this.game, this.game.width - 20, 20)

    this.lifeBar = new LifeBar(this.game, 20, 20, 10)

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.ui = new Ui(this.game)

    this.powersManager = new PowersManager(this.game, this.calendar)



    this.groundGroup = this.game.add.group()

    new GroundGenerator(this.game, this.groundGroup).generateGround()

    this.fireGroup = this.game.add.group()

    this.bow = new Bow(this.game, this.arrowGroup, this.obstacleGroup,
      this.meteorGroup, this.fireGroup, this.player, this.powersManager)
  }




  init (data) {
    this.gameWon = false
    this.data = data

  }

  update () {
    if (this.lives <= 0) {
      this.endGame()
    }


    this.powersManager.update()
    this.game.physics.arcade.collide(this.playerGroup, this.pyramid);
    this.game.physics.arcade.collide(this.obstacleGroup, this.enemyGroup,
      this.obstacleCollision, null, this);
    this.game.physics.arcade.overlap(this.arrowGroup, this.enemyGroup,
      this.arrowCollision, null, this);
    this.game.physics.arcade.overlap(this.fireGroup, this.enemyGroup,
      (fire, enemy) => enemy.setFire(), null, this);
    this.game.physics.arcade.overlap(this.meteorGroup, this.enemyGroup,
      this.meteorCollision, null, this);

    //Didn't find another way, hackish
    this.game.physics.arcade.collide(this.groundGroup, this.playerGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.obstacleGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.enemyGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.arrowGroup,
      (ground, arrow) => { arrow.groundHit(ground) }, null, this);
    this.game.physics.arcade.collide(this.groundGroup, this.meteorGroup,
        (ground, meteor) => { meteor.makeKillable() }, null, this);


    this.scoreText.setText("score: " + this.score)

    this.bow.updateIndependent()


    this.arrowGroup.forEachAlive((arrow) => { arrow.updateRotation() }, this);

  }

  arrowCollision (arrow, enemy) {
    arrow.enemyHit(enemy)
  }

  meteorCollision (meteor, enemy) {
    meteor.enemyHit(enemy);
  }

  obstacleCollision (obstacle, enemy) {
    obstacle.hit();
    enemy.pushBack()
  }

  getTreeGroup () {
    return this.treeGroup;
  }

  endGame () {
    if (this.gameEnded) {
      if (this.enterKey.isDown) {
        this.state.start('preload', true, false, this.data)
      }
      return
    }

    this.ui.lost()
    this.gameEnded = true
    this.game.gameEnded = true
    this.calendar.endGame()
    this.pyramid.destroy()
    this.player.endGame()
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

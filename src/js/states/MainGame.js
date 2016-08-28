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
    this.AISpawner = new AISpawner(this.game, this.enemyGroup)

    //create timer
    let timer = this.game.time.create(false)

    timer.loop(2000, this.spawnNewEnemy, this)

    timer.start();

    this.playerGroup = this.game.add.group()
    this.player = new Player(this.game, this.playerGroup)

    this.pyramidGroup = this.game.add.group()
    this.pyramid = new Pyramid(this.game, 0, this.game.height - 200, this.pyramidGroup)

    this.lives = 10

    this.score = 0

    this.arrowGroup = this.game.add.group();

    this.treeGroup = this.game.add.group();

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

    this.gameEnded = false

    this.calendar = new Calendar(this.game, this.game.width - 20, 20)

    this.lifeBar = new LifeBar(this.game, 20, 20, 10)

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.ui = new Ui(this.game)

    this.powersManager = new PowersManager(this.game, this.calendar)

    this.bow = new Bow(this.game, this.arrowGroup, this.player, this.powersManager)

    this.groundGroup = this.game.add.group()

    new GroundGenerator(this.game, this.groundGroup).generateGround()
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
    if (this.lives <= 0) {
      this.endGame()
    }

    this.powersManager.update()
    this.game.physics.arcade.collide(this.playerGroup, this.pyramidGroup);
    this.game.physics.arcade.collide(this.pyramidGroup, this.enemyGroup,
      this.pyramidCollision, null, this);
    this.game.physics.arcade.overlap(this.arrowGroup, this.enemyGroup,
      this.arrowCollision, null, this);
    this.game.physics.arcade.collide(this.treeGroup, this.enemyGroup,
      this.treeCollision, null, this);

    //Didn't find another way, hackish
    this.game.physics.arcade.collide(this.groundGroup, this.playerGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.pyramidGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.enemyGroup);
    this.game.physics.arcade.collide(this.groundGroup, this.arrowGroup,
      (ground, arrow) => arrow.kill());

    this.scoreText.setText("score: " + this.score)

    this.bow.updateIndependent()


    this.arrowGroup.forEachAlive((arrow) => {
      arrow.rotation = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
    }, this);

  }

  treeCollision (tree, enemy) {
    console.log('ARVRE')
    enemy.pushBack();
    tree.hit();
  }

  arrowCollision (arrow, enemy) {
    arrow.enemyHit(enemy, this.treeGroup)
  }

  pyramidCollision (pyramid, enemy) {
    enemy.pushBack()
    this.lives--
    this.lifeBar.removeLife()
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

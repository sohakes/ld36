const GAME = require('../../json/game.json')
import Player from '../objects/Player'
import AISpawner from '../objects/AISpawner'
import Pyramid from '../objects/Pyramid'
import AIEnemy from '../objects/AIEnemy'
import Calendar from '../objects/Calendar'
import LifeBar from '../objects/LifeBar'
import PowersManager from '../objects/PowersManager'
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

    this.ARROW_SPEED = 600;
    this.MAX_TIME = 1000;
    this.bowTime = 0;

    this.bow = this.game.add.sprite(0, 0, 'pre-bow');
    this.bow.anchor.setTo(0, 0.5);

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
  }

  spawnNewEnemy() {
    if (this.gameEnded) {
      return
    }
    this.AISpawner.spawnEnemy();
  }


  shootArrow() {
    var arrow = this.arrow;
    this.arrow = null;
    var speed = this.ARROW_SPEED;
    var rate = (this.bowTime > this.MAX_TIME) ? 1 : this.bowTime / this.MAX_TIME;
    this.bowTime = 0;

    if (rate < 0.5) {
      return;
    }
    arrow.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.checkWorldBounds = true;
    arrow.outOfBoundsKill = true;

    speed *= rate;

    console.log(speed)

    arrow.body.velocity.x = Math.cos(arrow.rotation) * speed;
    arrow.body.velocity.y = Math.sin(arrow.rotation) * speed;

    this.arrowGroup.add(arrow);
  }


  init (data) {
    this.gameWon = false
    this.data = data

  }


  update () {
    this.powersManager.update()
    this.game.physics.arcade.collide(this.playerGroup, this.pyramidGroup);
    this.game.physics.arcade.collide(this.pyramidGroup, this.enemyGroup, this.pyramidCollision, null, this);
    if (this.lives <= 0) {
      this.endGame()
    }

    this.game.physics.arcade.overlap(this.arrowGroup, this.enemyGroup,
        (arrow, enemy) => {
          if (arrow.power != 0) {
            arrow.kill();
          }

          enemy.kill();
          this.score += 1;
        }, null, this);

    this.scoreText.setText("score: " + this.score)

    if (this.game.input.activePointer.duration != -1) {
      this.bowTime = this.game.input.activePointer.duration;

      if (! this.bow.alive) {
        this.bow.revive();
        this.bow.anchor.setTo(0, 0.5);
      }

      this.bow.reset(
        (this.player.left + this.player.right) / 2,
        this.player.y + this.player.height*3/4
      );

      if (this.bowTime < this.MAX_TIME / 2) {
        this.bow.rotation = Math.PI/2;
      } else {
        if (! this.arrow) {
          this.bow.anchor.setTo(-0.5, 0.5);
          this.arrow = this.game.add.sprite(0, 0, 'pre-arrow');
          this.arrow.power = this.powersManager.popPower()
          this.arrow.anchor.setTo(-0.23, 0.5);
        }
        this.bow.rotation = this.game.physics.arcade.angleToPointer(this.player);
        this.arrow.reset(this.bow.x, this.bow.y);
        this.arrow.rotation = this.bow.rotation;
      }

    } else if (this.bowTime) {
      this.shootArrow();
      this.bow.kill();
    }

    this.arrowGroup.forEachAlive((arrow) => {
      arrow.rotation = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
    }, this);

  }

  pyramidCollision (pyramid, enemy) {
    enemy.pushBack()
    this.lives--
    this.lifeBar.removeLife()
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

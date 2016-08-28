const GAME = require('../../json/game.json')
import Player from '../objects/Player'
import AISpawner from '../objects/AISpawner'
import Pyramid from '../objects/Pyramid'
import AIEnemy from '../objects/AIEnemy'
import Calendar from '../objects/Calendar'
import LifeBar from '../objects/LifeBar'

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

    this.lifes = 10

    this.score = 0

    this.arrowGroup = this.game.add.group();

    this.ARROW_SPEED = 400;
    this.MAX_TIME = 1000;
    this.bowTime = 0;

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

  }

  spawnNewEnemy() {
    if (this.gameEnded) {
      return
    }
    this.AISpawner.spawnEnemy();
  }


  shootArrow() {
    console.log('shooting arrow');
    var arrow = this.game.add.sprite(0, 0, 'arrow');
    arrow.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.checkWorldBounds = true;
    arrow.outOfBoundsKill = true;

    arrow.reset(
        (this.player.left + this.player.right) / 2,
        this.player.y + this.player.height*3/4
    );

    var speed = this.ARROW_SPEED;

    if (this.bowTime < this.MAX_TIME) {
      speed *= (this.bowTime / this.MAX_TIME);
    }

    console.log(speed)

    arrow.rotation = this.game.physics.arcade.angleToPointer(this.player);

    arrow.body.velocity.x = Math.cos(arrow.rotation) * speed;
    arrow.body.velocity.y = Math.sin(arrow.rotation) * speed;

    this.arrowGroup.add(arrow);

    this.bowTime = 0;
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

    this.game.physics.arcade.collide(this.arrowGroup, this.enemyGroup,
        (arrow, enemy) => {
          console.log('KILL');
          arrow.kill();
          enemy.kill();
        }, null, this);

    if (this.game.input.activePointer.duration != -1) {
      this.bowTime = this.game.input.activePointer.duration;
    } else if (this.bowTime) {
      this.shootArrow();
    }

    this.arrowGroup.forEachAlive((arrow) => {
      arrow.rotation = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x);
    }, this);

  }

  pyramidCollision (pyramid, enemy) {
    enemy.pushBack()
    this.lifes--
    this.lifeBar.removeLife()
  }

  endGame () {
    if (this.gameEnded) {
      return
    }
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

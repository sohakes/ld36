import Character from './Character'

export default class Player extends Character {
  constructor (game, group) {
    super(game, 400, game.height - 100, 'player', null, group)

    //this.animations.add('left', [0, 1, 2, 3], 10, true);
    //this.animations.add('turn', [4], 20, true);
    //this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('idle', [0, 1, 2, 3, 4], 10, true);
    this.animations.add('walk', [5, 6, 7, 8, 9, 10], 10, true);

    this.movement = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.jumpTimer = 0

    this.gameEnded = false
    this.anchor.setTo(0.45, 0.5)

    //1 = right, -1 = left
    this.side = 1

    this.body.setSize(80, 55, 10);

    this.movement = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      }
  }

  endGame () {
    this.gameEnded = true
  }

  update() {
      this.scale.x = this.side

      // game.physics.arcade.collide(player, layer);

      this.body.velocity.x = 0;

      if (this.gameEnded) {
        return
      }

      if (this.movement.left.isDown)
      {
        this.side = -1

          this.body.velocity.x = -150;

          if (this.facing != 'left')
          {
              this.animations.play('walk');
              this.facing = 'left';
          }
      }
      else if (this.movement.right.isDown)
      {
          this.side = 1
          this.body.velocity.x = 150;

          if (this.facing != 'right')
          {
              this.animations.play('walk');
              this.facing = 'right';
          }
      }
      else
      {
          if (this.facing != 'idle')
          {
              this.animations.play('idle');

              if (this.facing == 'left')
              {
                  this.frame = 0;
              }
              else
              {
                  this.frame = 5;
              }

              this.facing = 'idle';
          }
      }

      if (this.movement.up.isDown && this.body.touching.down && this.game.time.now > this.jumpTimer)
      {
        this.body.velocity.y = -500;
        this.jumpTimer = this.game.time.now + 750;
      }

  }

}

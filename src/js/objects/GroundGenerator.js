export default class GroundGenerator {
  constructor (game, group) {
    this.game = game
    this.groundGroup = group
  }

  generateGround() {
    for (let i = 0; i < this.game.width / 32; i++) {
      let ground = this.game.add.sprite(32 * i,  this.game.height - 32,
        'junglesheet', 'sand-top', this.groundGroup)
      this.game.physics.enable(ground, Phaser.Physics.ARCADE);
      ground.body.collideWorldBounds = true;
      ground.body.immovable = true;
      ground.body.allowGravity = false;
      ground.body.setSize(32, 32);
    }
  }
}

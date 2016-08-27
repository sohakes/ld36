import Character from './Character'

export default class AIEnemy extends Character {
  constructor (game, x, y, group) {
    //Since we're adding the animations here, the key should prob be here too
    super(game, x, y, 'dude', null, group)

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

  }

  update () {
    this.body.velocity.x = -150;

    if (this.facing != 'left')
    {
        this.animations.play('left');
        this.facing = 'left';
    }
  }

}

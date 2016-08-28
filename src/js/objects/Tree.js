import GameSprite from './GameSprite'

export default class Tree extends GameSprite {
  constructor (game, group) {
    super(game, 0, 0, 'junglesheet', 'tree-funky', group)
    this.health = 3;
  }

  setPos(lowerX, lowerY) {
    this.reset(lowerX - this.width, lowerY - this.height);
  }

  hit () {
    this.health --;
    if (this.health <= 0)
      this.destroy();
  }

}

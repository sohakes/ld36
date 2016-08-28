import GameSprite from './GameSprite'

export default class Calendar extends Phaser.Group {
  constructor (game, x, y) {
    super(game)
    this.x = x
    this.y = y
    this.calendar = this.create(0, 0, 'calendar')
    this.calendar.x -= this.calendar.width
    this.arrow = this.create(-this.calendar.width/2 , this.calendar.height/2, 'calendar-arrow')
    this.arrow.anchor.x = 0.5
    this.arrow.anchor.y = 1
    this.arrow.pivot.x = 0.5
    this.arrow.pivot.y = 1

  }

  update () {
    this.arrow.angle += 1
  }


}

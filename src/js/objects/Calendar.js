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
    this.currentSeason = 0;
    this.gameEnded = false
  }

  endGame () {
    this.gameEnded = true
  }

  update () {
    if (this.gameEnded) {
      return
    }

    this.arrow.angle += 0.2
    this.updateSeason()
  }

  updateSeason () {
    let angle = this.arrow.angle
    if (angle < 0) {
      angle = 360 + angle
    }
    this.currentSeason = Math.floor((angle % 360) / 90)
  }

}

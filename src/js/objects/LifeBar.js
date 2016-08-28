import GameSprite from './GameSprite'

//This class should control the number of lifes too I think
//For simplicity, it will not for now
export default class LifeBar extends Phaser.Group {
  constructor (game, x, y, quantity) {
    super(game)
    this.x = x
    this.y = y
    this.startBar = this.create(0, -2, 'life-start')

    this.lifeBars = []
    let middleBarWidth = 0
    for (let i = 0; i < quantity; i++) {
      let newEmptyBar = this.create(0, 0, 'life-middle')
      newEmptyBar.x = this.startBar.width + i * newEmptyBar.width
      middleBarWidth = newEmptyBar.width
      let newBar = this.create(newEmptyBar.x, newEmptyBar.height / 2, 'life-fill')
      newBar.anchor.setTo(0.65, 0.5)
      this.lifeBars.push(newBar)
    }
    //It should be + 1, but I had to put +3 due to the .scale.x = -1 mess
    this.endBar = this.create((quantity + 3) * middleBarWidth, -2, 'life-start')
    this.endBar.scale.x = -1

    this.lifeBars.forEach((bar) => bar.bringToTop())

  }

  removeLife() {
    this.lifeBars.pop().destroy()
  }


}

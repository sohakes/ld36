const big_text = {
  font: 'Arial',
  fontSize: '50px',
  fontWeight: 100,
  fill: '#ffffff'
}

const big_countdown_text = {
  font: 'Arial',
  fontSize: '50px',
  fontWeight: 100,
  fill: '#ff0000'
}

const smaller_text = {
  font: 'Macondo',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#975d36'
}

export default class UI {
  constructor (game) {
    this.game = game

    //this.game.add.button(this.game.world.width - 50, 10, 'pause_button',
    //  this.pause, this)
  }




  lost () {
    const lostTextSub = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Your granary was destroyed :( Press the screen or ENTER to restart.',
      smaller_text
    )

    lostTextSub.anchor.setTo(0.5, 0.5)
  }


}

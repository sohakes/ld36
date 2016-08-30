const normal_text = {
  font: 'Macondo',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#9d8b4f'
}

const red_text = {
  font: 'Macondo',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#975d36'
}

const GAME = require('../../json/game.json')

export default class Intro {
  create () {
    this.bg = this.game.add.tileSprite(0, 0, 1200, 780, 'background');

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.introText = this.add.text(
      GAME.width / 2,
      GAME.height / 2,
      `You are a Sumerian farmer, whose days are spent on the toil of the fields,
and whose nights are taken by contemplation
        of the heavens and the work of the Gods.

Scourges of beasts and greedy plunder the land, taking the fruits of others' labor.
Defend your harvest, with arrows from your bow and sacrifices to the Gods.


      `,
      normal_text
    )

    this.introText.anchor.x = 0.5
    this.introText.anchor.y = 0.5

    this.counter = 0

    const pressEnter = this.add.text(
      this.game.width,
      this.game.height,
      "Press ENTER or press on screen to continue",
      red_text
    )

    pressEnter.anchor.setTo(1)

    this.enterFlag = false;

  }

  update () {
    if ((this.enterKey.isDown && this.enterFlag === false) ||
        this.game.input.activePointer.leftButton.isDown && this.clickFlag === false) {
      this.enterFlag = true
      this.clickFlag = true
      this.counter++
      if (this.counter === 1) {
        this.introText.setText(`
Click and hold to draw arrows, aim with the cursor.
Use favors from the Gods by pressing E or touching the calendar.

You have at your service, according to Their timely will,
        the powers of thunder, fertility, fire and heavenly punishment.`)
      }

      if (this.counter === 2) {
        this.state.start('mainGame', true, false, {
          level: 1
        })
      }
    }

      if (this.enterKey.isUp) {
        this.enterFlag = false
      }

      if (this.game.input.activePointer.leftButton.isUp) {
        this.clickFlag = false
      }

  }
}

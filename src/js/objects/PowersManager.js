export default class PowersManager {
  constructor (game, calendar) {
    //0 = thunder, 1 = tree, 2 = fire, 3 = meteor
    this.game = game
    this.calendar = calendar
    this.powerButton = this.game.input.keyboard.addKey(Phaser.Keyboard.E)
    this.cooldown = false
    this.timer = this.game.time.create(false)
    this.currentPower = -1;
    this.seasonToFrame = [1, 3, 2, 0]
    this.currentPowerImg = this.game.add.sprite(this.game.width - 300, 20, 'calendarsheet')
    this.keye = this.game.add.sprite(this.game.width - 250, 40, 'key_e')
  }

  update() {
    this.currentPowerImg.frame = this.seasonToFrame[this.calendar.currentSeason]

    if (this.cooldown) {
      this.currentPowerImg.tint = 0x8A8A8A
      this.keye.tint = 0x8A8A8A
    } else {
      this.currentPowerImg.tint = 0xFFFFFF
      this.keye.tint = 0xFFFFFF
    }

    if (this.powerButton.isDown && !this.cooldown) {
      this.cooldown = true
      console.log("activated")
      this.currentPower = this.calendar.currentSeason;
      this.timer.add(3000, () => this.cooldown = false, this)
      this.timer.start()
    }
  }

  popPower () {
    let currentPower = this.currentPower;
    this.powerUsed()
    return currentPower
  }

  powerUsed() {
    this.currentPower = -1
  }
}

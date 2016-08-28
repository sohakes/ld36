export default class PowersManager {
  constructor (game, calendar) {
    //0 = thunder, 1 = tree, 2 = fire, 3 = meteor
    this.game = game
    this.calendar = calendar
    this.powerButton = this.game.input.keyboard.addKey(Phaser.Keyboard.E)
    this.cooldown = false
    this.timer = this.game.time.create(false)
    this.currentPower = -1;
  }

  update() {
    if (this.powerButton.isDown && !this.cooldown) {
      this.cooldown = true
      console.log("activated")
      this.currentPower = this.calendar.currentSeason;
      this.timer.add(2000, () => this.cooldown = false, this)
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

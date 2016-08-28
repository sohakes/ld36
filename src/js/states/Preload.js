const SPRITEIMGS = require('../../json/img/images.json')

export default class Preload {
  preload () {
    let styling = {
      font: 'Courier',
      fontSize: '30px',
      fill: '#ffffff'
    }

    this.loading = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 10,
      'Loading',
      styling
    )

    this.loading.anchor.setTo(0.5)

    this.loadSprites()
    this.loadAudios()
    this.loadButtons()
    this.loadHardcoded()
  }

  init (data) {
    this.data = data
  }

  create () {
    this.state.start('mainGame', true, false, this.data)
  }

  loadHardcoded () {
    this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    this.load.spritesheet('player', 'assets/img/lion.png', 120, 83);
    this.load.spritesheet('zombie', 'assets/img/dragon-man.png', 58, 67);
  }

  loadSprites () {
    const sprites = ['junglesheet']
    const spriteImgs = SPRITEIMGS

    sprites.forEach(sprite => this.load.atlasJSONHash(
      `${sprite}`,
      `assets/img/${sprite}.png`,
      `assets/json/img/${sprite}.json`
    ))

    spriteImgs.forEach(sprite => this.load.image(
      `${sprite.spriteName}`,
      `assets/img/${sprite.fileName}`
    ))
  }

  loadButtons () {
    //it's ugly, but we need to refactor this entire class later anyway
    const buttons = []

    buttons.forEach(button => this.load.atlasJSONHash(
      `${button[0]}`,
      `assets/img/buttons/${button[1]}.png`,
      `assets/json/img/buttons/${button[1]}.json`
    ))

  }

  loadAudios () {
    let audios = []

    audios.forEach(audio => {
      this.load.audio(audio.resourceName,
        [`assets/audio/${audio.resourceType}/${audio.fileName}`])
    })
  }
}

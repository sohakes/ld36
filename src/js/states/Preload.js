const SPRITEIMGS = require('../../json/img/images.json')

export default class Preload {
  preload () {
    
    WebFontConfig = {
      active: () => { game.fontsReady = true },
      google: {
        families: ['Macondo']
      }
    };

    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


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
    this.state.start('intro', true, false, this.data)
  }

  loadHardcoded () {
    this.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    this.load.spritesheet('player', 'assets/img/lion.png', 120, 83);
    this.load.spritesheet('foe', 'assets/img/lion-2.png', 120, 83);
    this.load.spritesheet('zombie', 'assets/img/dragon-man.png', 58, 67);
    this.load.spritesheet('calendarsheet', 'assets/img/Calendar.png', 80, 80);
    this.load.spritesheet('dino', 'assets/img/tyrannosaurus-1.png', 151, 105);
    this.load.spritesheet('grasshopper', 'assets/img/insect-1.png', 78, 69);
    this.load.spritesheet('bat', 'assets/img/bat-1.png', 51, 57);
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
